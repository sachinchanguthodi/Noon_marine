import { Router } from 'express';
import {
  getVessels,
  getVesselById,
  createVessel,
  updateVessel,
  deleteVessel,
} from '../controllers/vesselsController';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * /api/vessels:
 *   get:
 *     summary: Get all vessels
 *     tags: [Vessels]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: vesselType
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of vessels
 */
router.get('/', getVessels);

/**
 * @swagger
 * /api/vessels/{id}:
 *   get:
 *     summary: Get vessel by ID
 *     tags: [Vessels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vessel details
 */
router.get('/:id', getVesselById);

/**
 * @swagger
 * /api/vessels:
 *   post:
 *     summary: Create new vessel
 *     tags: [Vessels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Vessel created
 */
router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  createVessel
);

/**
 * @swagger
 * /api/vessels/{id}:
 *   put:
 *     summary: Update vessel
 *     tags: [Vessels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vessel updated
 */
router.put(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  updateVessel
);

/**
 * @swagger
 * /api/vessels/{id}:
 *   delete:
 *     summary: Delete vessel
 *     tags: [Vessels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vessel deleted
 */
router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  deleteVessel
);

export default router;
