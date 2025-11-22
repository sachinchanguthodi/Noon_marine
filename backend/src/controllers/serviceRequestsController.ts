import { Request, Response } from 'express';
import prisma from '../config/database';
import { sendSuccess, sendError } from '../utils/response';

/**
 * @desc    Create a new service request
 * @route   POST /api/service-requests
 * @access  Private
 */
export const createServiceRequest = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const { serviceId, description, priority, vesselName, imoNumber } = req.body;

    // Get customer ID from user
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });

    if (!customer) {
      return sendError(res, 'Customer profile not found', 404);
    }

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        customerId: customer.id,
        serviceId,
        description,
        priority: priority || 'MEDIUM',
        status: 'OPEN',
      },
      include: {
        service: true,
        customer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    sendSuccess(res, serviceRequest, 'Service request created successfully', 201);
  } catch (error: any) {
    console.error('Create service request error:', error);
    sendError(res, 'Failed to create service request', 500);
  }
};

/**
 * @desc    Get all service requests (Admin)
 * @route   GET /api/service-requests/admin/all
 * @access  Private (Admin only)
 */
export const getAllServiceRequests = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    // Check if user is admin
    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'ADMIN' && req.user.role !== 'MANAGER') {
      return sendError(res, 'Not authorized to access this resource', 403);
    }

    const { status, priority, page = '1', limit = '20' } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const [serviceRequests, total] = await Promise.all([
      prisma.serviceRequest.findMany({
        where,
        include: {
          service: true,
          customer: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  phone: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.serviceRequest.count({ where }),
    ]);

    sendSuccess(res, {
      serviceRequests,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error: any) {
    console.error('Get all service requests error:', error);
    sendError(res, 'Failed to fetch service requests', 500);
  }
};

/**
 * @desc    Get user's own service requests
 * @route   GET /api/service-requests
 * @access  Private
 */
export const getMyServiceRequests = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });

    if (!customer) {
      return sendSuccess(res, []);
    }

    const serviceRequests = await prisma.serviceRequest.findMany({
      where: {
        customerId: customer.id,
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    sendSuccess(res, serviceRequests);
  } catch (error: any) {
    console.error('Get my service requests error:', error);
    sendError(res, 'Failed to fetch service requests', 500);
  }
};

/**
 * @desc    Update service request status (Admin)
 * @route   PUT /api/service-requests/:id/status
 * @access  Private (Admin only)
 */
export const updateServiceRequestStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    // Check if user is admin
    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'ADMIN' && req.user.role !== 'MANAGER') {
      return sendError(res, 'Not authorized to access this resource', 403);
    }

    const { id } = req.params;
    const { status, assignedTo } = req.body;

    const serviceRequest = await prisma.serviceRequest.update({
      where: { id },
      data: {
        status,
        ...(assignedTo && { assignedTo }),
        ...(status === 'CLOSED' && { resolvedAt: new Date() }),
      },
      include: {
        service: true,
        customer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    sendSuccess(res, serviceRequest, 'Service request updated successfully');
  } catch (error: any) {
    console.error('Update service request status error:', error);
    sendError(res, 'Failed to update service request', 500);
  }
};

/**
 * @desc    Get service request by ID
 * @route   GET /api/service-requests/:id
 * @access  Private
 */
export const getServiceRequestById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const { id } = req.params;

    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        service: true,
        customer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!serviceRequest) {
      return sendError(res, 'Service request not found', 404);
    }

    // Check if user is admin or owns the request
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });

    const isAdmin = ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(req.user.role);
    const isOwner = customer && customer.id === serviceRequest.customerId;

    if (!isAdmin && !isOwner) {
      return sendError(res, 'Not authorized to view this request', 403);
    }

    sendSuccess(res, serviceRequest);
  } catch (error: any) {
    console.error('Get service request by ID error:', error);
    sendError(res, 'Failed to fetch service request', 500);
  }
};

/**
 * @desc    Delete service request (Admin)
 * @route   DELETE /api/service-requests/:id
 * @access  Private (Admin only)
 */
export const deleteServiceRequest = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    // Check if user is admin
    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'ADMIN') {
      return sendError(res, 'Not authorized to access this resource', 403);
    }

    const { id } = req.params;

    await prisma.serviceRequest.delete({
      where: { id },
    });

    sendSuccess(res, null, 'Service request deleted successfully');
  } catch (error: any) {
    console.error('Delete service request error:', error);
    sendError(res, 'Failed to delete service request', 500);
  }
};
