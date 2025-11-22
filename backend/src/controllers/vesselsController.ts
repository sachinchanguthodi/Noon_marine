import { Request, Response } from 'express';
import { VesselType, VesselStatus } from '@prisma/client';
import prisma from '../config/database';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import env from '../config/env';

/**
 * @desc    Get all vessels
 * @route   GET /api/vessels
 * @access  Public
 */
export const getVessels = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = env.DEFAULT_PAGE_SIZE,
      vesselType,
      status,
      search,
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = Math.min(
      parseInt(limit as string, 10),
      env.MAX_PAGE_SIZE
    );
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const where: any = {};

    if (vesselType) {
      where.vesselType = vesselType as VesselType;
    }

    if (status) {
      where.status = status as VesselStatus;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { imoNumber: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Get total count
    const total = await prisma.vessel.count({ where });

    // Get vessels
    const vessels = await prisma.vessel.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        imoNumber: true,
        mmsiNumber: true,
        vesselType: true,
        flag: true,
        yearBuilt: true,
        length: true,
        beam: true,
        draft: true,
        grossTonnage: true,
        status: true,
        price: true,
        charterRate: true,
        images: true,
        description: true,
        createdAt: true,
      },
    });

    sendPaginated(res, vessels, pageNum, limitNum, total);
  } catch (error: any) {
    console.error('Get vessels error:', error);
    sendError(res, 'Failed to fetch vessels', 500);
  }
};

/**
 * @desc    Get single vessel
 * @route   GET /api/vessels/:id
 * @access  Public
 */
export const getVesselById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vessel = await prisma.vessel.findUnique({
      where: { id },
      include: {
        documents: true,
        certifications: true,
        flagRegistrations: {
          where: { status: 'ACTIVE' },
        },
        insurancePolicies: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!vessel) {
      return sendError(res, 'Vessel not found', 404);
    }

    sendSuccess(res, vessel);
  } catch (error: any) {
    console.error('Get vessel error:', error);
    sendError(res, 'Failed to fetch vessel', 500);
  }
};

/**
 * @desc    Create new vessel
 * @route   POST /api/vessels
 * @access  Private (Admin)
 */
export const createVessel = async (req: Request, res: Response) => {
  try {
    const vesselData = req.body;

    const vessel = await prisma.vessel.create({
      data: vesselData,
    });

    sendSuccess(res, vessel, 'Vessel created successfully', 201);
  } catch (error: any) {
    console.error('Create vessel error:', error);
    sendError(res, 'Failed to create vessel', 500);
  }
};

/**
 * @desc    Update vessel
 * @route   PUT /api/vessels/:id
 * @access  Private (Admin)
 */
export const updateVessel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vesselData = req.body;

    const vessel = await prisma.vessel.update({
      where: { id },
      data: vesselData,
    });

    sendSuccess(res, vessel, 'Vessel updated successfully');
  } catch (error: any) {
    console.error('Update vessel error:', error);
    if (error.code === 'P2025') {
      return sendError(res, 'Vessel not found', 404);
    }
    sendError(res, 'Failed to update vessel', 500);
  }
};

/**
 * @desc    Delete vessel
 * @route   DELETE /api/vessels/:id
 * @access  Private (Admin)
 */
export const deleteVessel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.vessel.delete({
      where: { id },
    });

    sendSuccess(res, null, 'Vessel deleted successfully');
  } catch (error: any) {
    console.error('Delete vessel error:', error);
    if (error.code === 'P2025') {
      return sendError(res, 'Vessel not found', 404);
    }
    sendError(res, 'Failed to delete vessel', 500);
  }
};
