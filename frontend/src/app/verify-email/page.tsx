'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, XCircle, RefreshCw, Mail } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }
    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (t: string) => {
    try {
      const { adminService } = await import('@/lib/api');
      await adminService.verifyEmail(t);
      setStatus('success');
      setMessage('Your email address has been verified successfully!');

      // Update localStorage user if logged in
      const stored = localStorage.getItem('user');
      if (stored) {
        const user = JSON.parse(stored);
        user.emailVerified = true;
        localStorage.setItem('user', JSON.stringify(user));
      }

      setTimeout(() => router.push('/dashboard'), 3000);
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.response?.data?.message || 'The verification link is invalid or has expired.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Noon Marine" width={110} height={42} className="object-contain" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 w-full max-w-md text-center">
          {status === 'verifying' && (
            <>
              <RefreshCw className="h-14 w-14 animate-spin text-blue-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying your email…</h1>
              <p className="text-gray-500">Please wait a moment.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-400 mb-6">Redirecting you to the dashboard…</p>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Go to Dashboard
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-14 w-14 text-red-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard"
                  className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  Go to Dashboard
                </Link>
                <p className="text-sm text-gray-400">
                  You can resend the verification email from your dashboard.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
