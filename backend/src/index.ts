import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import env from './config/env';
import swaggerSpec from './config/swagger';
import { errorHandler, notFound } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/authRoutes';
import vesselsRoutes from './routes/vesselsRoutes';
import serviceRequestsRoutes from './routes/serviceRequestsRoutes';

const app: Application = express();

// Security middleware
app.use(helmet());

// Allow both www and non-www versions of the domain
const allowedOrigins = [
  env.FRONTEND_URL,
  'https://noonmarine.uk',
  'https://www.noonmarine.uk',
  'https://noonmarine.com',
  'https://www.noonmarine.com',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Access kill switch.
//   SITE_LOCKED=true  -> every route except /health returns 503.
//   UNLOCK_KEY=<secret> lets the owner through with an "x-unlock-key" header
//   (or ?unlock=<secret>) for testing. /health stays up so Railway health
//   checks don't trigger a restart loop.
app.use((req, res, next) => {
  if (process.env.SITE_LOCKED !== 'true') return next();
  if (req.path === '/health') return next();

  const key = process.env.UNLOCK_KEY;
  const provided = req.header('x-unlock-key') || (req.query.unlock as string | undefined);
  if (key && provided === key) return next();

  return res.status(503).json({
    success: false,
    message: 'Service Unavailable',
  });
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/vessels', vesselsRoutes);
app.use('/api/service-requests', serviceRequestsRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log('===========================================');
  console.log(`🚀 Server running in ${env.NODE_ENV} mode`);
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
  console.log('===========================================');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

export default app;
