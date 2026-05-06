import { Request, Response } from 'express';
import { UserRole, UserStatus } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { AppError } from '../middleware/errorHandler';
import env from '../config/env';
import { sendVerificationEmail } from '../services/emailService';

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req: Request, res: Response) => {
  try {
    if (!env.DATABASE_URL) {
      return sendError(
        res,
        'Database not configured. Set DATABASE_URL in backend/.env',
        500
      );
    }
    const { email, password, firstName, lastName, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return sendError(res, 'Email already registered', 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: role || UserRole.CUSTOMER,
        status: UserStatus.ACTIVE, // Set new users as ACTIVE by default
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Send verification email (non-blocking)
    const verificationToken = require('jsonwebtoken').sign(
      { id: user.id, email: user.email, purpose: 'email_verification' },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    sendVerificationEmail(user.email, user.firstName, verificationToken).catch(console.error);

    sendSuccess(
      res,
      {
        user,
        token,
      },
      'Registration successful. Please check your email to verify your account.',
      201
    );
  } catch (error: any) {
    console.error('Register error:', error);
    sendError(res, 'Registration failed', 500);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return sendError(res, 'Invalid credentials', 401);
    }

    // Check if user is active
    if (user.status !== UserStatus.ACTIVE) {
      return sendError(res, 'Account is not active. Please contact support.', 403);
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    sendSuccess(res, {
      user: userWithoutPassword,
      token,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    sendError(res, 'Login failed', 500);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
        customer: true,
        dealer: true,
      },
    });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    sendSuccess(res, user);
  } catch (error: any) {
    console.error('Get me error:', error);
    sendError(res, 'Failed to fetch user data', 500);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const { firstName, lastName, phone, avatar } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone && { phone }),
        ...(avatar && { avatar }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        emailVerified: true,
        updatedAt: true,
      },
    });

    sendSuccess(res, updatedUser, 'Profile updated successfully');
  } catch (error: any) {
    console.error('Update profile error:', error);
    sendError(res, 'Failed to update profile', 500);
  }
};

/**
 * @desc    Send email verification
 * @route   POST /api/auth/send-verification
 * @access  Private
 */
export const sendEmailVerification = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'Not authenticated', 401);

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return sendError(res, 'User not found', 404);
    if (user.emailVerified) return sendError(res, 'Email already verified', 400);

    const token = jwt.sign(
      { id: user.id, email: user.email, purpose: 'email_verification' },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const sent = await sendVerificationEmail(user.email, user.firstName, token);

    if (sent) {
      return sendSuccess(res, null, 'Verification email sent');
    }
    // If email not configured, return the token so it still works in dev
    sendSuccess(res, { token }, 'Email service not configured — use this token directly');
  } catch (error) {
    console.error('Send verification error:', error);
    sendError(res, 'Failed to send verification email', 500);
  }
};

/**
 * @desc    Verify email address
 * @route   GET /api/auth/verify-email?token=...
 * @access  Public
 */
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') return sendError(res, 'Token is required', 400);

    let decoded: any;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET);
    } catch {
      return sendError(res, 'Invalid or expired verification link', 400);
    }

    if (decoded.purpose !== 'email_verification') {
      return sendError(res, 'Invalid token type', 400);
    }

    await prisma.user.update({
      where: { id: decoded.id },
      data: { emailVerified: true },
    });

    sendSuccess(res, null, 'Email verified successfully');
  } catch (error) {
    console.error('Verify email error:', error);
    sendError(res, 'Email verification failed', 500);
  }
};

/**
 * @desc    Get all users (admin only)
 * @route   GET /api/admin/users
 * @access  Private (Admin/Manager)
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        lastLogin: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    sendSuccess(res, { users });
  } catch (error) {
    console.error('Get users error:', error);
    sendError(res, 'Failed to fetch users', 500);
  }
};

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, user.password);

    if (!isPasswordValid) {
      return sendError(res, 'Current password is incorrect', 400);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    sendSuccess(res, null, 'Password changed successfully');
  } catch (error: any) {
    console.error('Change password error:', error);
    sendError(res, 'Failed to change password', 500);
  }
};
