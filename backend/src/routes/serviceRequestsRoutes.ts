import express from 'express';
import {
  createServiceRequest,
  getAllServiceRequests,
  getMyServiceRequests,
  updateServiceRequestStatus,
  getServiceRequestById,
  deleteServiceRequest,
} from '../controllers/serviceRequestsController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// User routes
router.post('/', createServiceRequest);
router.get('/', getMyServiceRequests);
router.get('/:id', getServiceRequestById);

// Admin routes
router.get('/admin/all', getAllServiceRequests);
router.put('/:id/status', updateServiceRequestStatus);
router.delete('/:id', deleteServiceRequest);

export default router;
