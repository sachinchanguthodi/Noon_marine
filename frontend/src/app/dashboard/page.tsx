'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  Ship,
  Shield,
  Flag,
  Users,
  Wrench,
  Package,
  Truck,
  GraduationCap,
  FileText,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  LifeBuoy,
  ClipboardCheck,
  Building2,
  Globe,
  ShieldCheck,
  BookOpen,
  Mail,
  CreditCard,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<any>(null);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleResendVerification = async () => {
    setSendingVerification(true);
    try {
      const { adminService } = await import('@/lib/api');
      await adminService.sendVerificationEmail(user?.firstName);
      setVerificationSent(true);
    } catch (err) {
      alert('Failed to send verification email. Please try again.');
    } finally {
      setSendingVerification(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <Link href="/" className="flex items-center">
              <Image src="/logo.webp" alt="Noon Marine" width={110} height={42} className="object-contain" />
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white transition relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3 border-l border-gray-700 pl-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {user?.role ? user.role.replace('_', ' ') : 'User'}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                  {user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : '?'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Email verification banner */}
      {user && user.emailVerified === false && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                <strong>Please verify your email address</strong> — check your inbox for a verification link.
              </p>
            </div>
            {verificationSent ? (
              <span className="text-sm text-green-700 font-medium flex items-center gap-1">
                <CheckCircle className="h-4 w-4" /> Email sent!
              </span>
            ) : (
              <button
                onClick={handleResendVerification}
                disabled={sendingVerification}
                className="flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-900 underline disabled:opacity-50 flex-shrink-0"
              >
                {sendingVerification && <RefreshCw className="h-4 w-4 animate-spin" />}
                Resend verification email
              </button>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'overview'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="font-medium">Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'services'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ClipboardList className="h-5 w-5" />
                  <span className="font-medium">Request Service</span>
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'requests'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">My Requests</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'profile'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'settings'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </button>
                {user && ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role) && (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <Link
                      href="/admin"
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition"
                    >
                      <ShieldCheck className="h-5 w-5" />
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                    <Link
                      href="/admin/users"
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition"
                    >
                      <Users className="h-5 w-5" />
                      <span className="font-medium">Users</span>
                    </Link>
                    <Link
                      href="/admin/payments"
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="font-medium">Payment Methods</span>
                    </Link>
                    <Link
                      href="/admin/blogs"
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span className="font-medium">Blog Management</span>
                    </Link>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/login"
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} />}
            {activeTab === 'services' && <ServicesTab />}
            {activeTab === 'requests' && <RequestsTab />}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [user, setUser] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { serviceRequestsService } = await import('@/lib/api');
      const response: any = await serviceRequestsService.getMyRequests();
      setRequests(response.data?.serviceRequests || []);
    } catch {
      // silently fail — backend may not be reachable
    } finally {
      setLoadingRequests(false);
    }
  };

  const stats = {
    active: requests.filter(r => r.status === 'OPEN' || r.status === 'IN_PROGRESS').length,
    completed: requests.filter(r => r.status === 'CLOSED').length,
    pending: requests.filter(r => r.status === 'OPEN').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'CLOSED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your maritime operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {loadingRequests ? '—' : stats.active}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-600">Active Requests</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {loadingRequests ? '—' : stats.completed}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-600">Completed Services</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {loadingRequests ? '—' : stats.pending}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-600">Pending Approval</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        {loadingRequests ? (
          <p className="text-gray-400 text-sm text-center py-6">Loading...</p>
        ) : requests.length === 0 ? (
          <div className="text-center py-8">
            <ClipboardList className="h-12 w-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No service requests yet.</p>
            <button
              onClick={() => setActiveTab('services')}
              className="mt-3 text-sm text-primary-600 hover:underline"
            >
              Submit your first request
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.slice(0, 5).map((req) => (
              <div key={req.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                    <FileText className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {req.service?.name || 'Service Request'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <span className={`flex-shrink-0 px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                  {req.status.replace('_', ' ')}
                </span>
              </div>
            ))}
            {requests.length > 5 && (
              <button
                onClick={() => setActiveTab('requests')}
                className="w-full text-sm text-primary-600 hover:underline pt-2"
              >
                View all {requests.length} requests
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Need a New Service?</h2>
        <p className="text-primary-100 mb-6">
          Request any maritime service and our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setActiveTab('services')}
          className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition inline-flex items-center"
        >
          Request Service Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function ServicesTab() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Service</h1>
        <p className="text-gray-600">Choose from our comprehensive range of maritime services.</p>
      </div>

      {!selectedService ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allServices.map((service, index) => (
            <button
              key={index}
              onClick={() => setSelectedService(service.title)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition text-left border border-gray-200 hover:border-primary-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-600 transition">
                  <service.icon className="h-6 w-6 text-primary-600 group-hover:text-white transition" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <ServiceRequestForm
          serviceName={selectedService}
          onBack={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

function ServiceRequestForm({ serviceName, onBack }: { serviceName: string; onBack: () => void }) {
  const [formData, setFormData] = useState({
    vesselName: '',
    imoNumber: '',
    priority: 'MEDIUM',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get the service ID by name from the backend
      // For simplicity, we'll use a generic approach
      const { api } = await import('@/lib/api');

      // Try to find the service by name
      let serviceId = null;
      try {
        const servicesResponse: any = await api.get('/services');
        const service = servicesResponse.data?.services?.find((s: any) => s.name === serviceName);
        serviceId = service?.id;
      } catch (err) {
        console.log('Could not fetch services, using fallback');
      }

      // If no serviceId found, create a generic request with service name in description
      const requestData = {
        serviceId: serviceId || '00000000-0000-0000-0000-000000000001',
        description: `Service: ${serviceName}\n\n${formData.description}${formData.vesselName ? `\n\nVessel: ${formData.vesselName}` : ''}${formData.imoNumber ? `\nIMO: ${formData.imoNumber}` : ''}`,
        priority: formData.priority,
      };

      const { serviceRequestsService } = await import('@/lib/api');
      await serviceRequestsService.create(requestData);

      alert('Service request submitted successfully!');
      onBack();
      // Trigger a refresh of the requests list
      window.location.reload();
    } catch (err: any) {
      console.error('Failed to submit request:', err);
      setError(err.response?.data?.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <button onClick={onBack} className="text-primary-600 hover:text-primary-700 font-medium mb-6 inline-flex items-center">
        â† Back to Services
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Request: {serviceName}</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vessel Name (if applicable)</label>
            <input
              type="text"
              value={formData.vesselName}
              onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter vessel name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IMO Number (if applicable)</label>
            <input
              type="text"
              value={formData.imoNumber}
              onChange={(e) => setFormData({ ...formData, imoNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter IMO number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Details *</label>
          <textarea
            rows={6}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Provide detailed information about your service request..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attach Documents (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition cursor-pointer">
            <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}

function RequestsTab() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [showPaymentFor, setShowPaymentFor] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
    fetchPaymentMethods();
  }, []);

  const fetchRequests = async () => {
    try {
      const { serviceRequestsService } = await import('@/lib/api');
      const response: any = await serviceRequestsService.getMyRequests();
      setRequests(response.data?.serviceRequests || []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const { paymentService } = await import('@/lib/paymentService');
      const data = await paymentService.getActive();
      setPaymentMethods(data);
    } catch {}
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch { alert('Copied: ' + text); }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'CLOSED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
      case 'URGENT':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-orange-100 text-orange-800';
      case 'LOW':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(request =>
    request.service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Service Requests</h1>
          <p className="text-gray-600">Track and manage all your service requests in one place.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">Loading requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No service requests found. Submit a new request to get started!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <React.Fragment key={request.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-lg mr-3">
                        <FileText className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.service?.name || 'Service Request'}</div>
                        <div className="text-xs text-gray-500">{request.description?.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {(request.status === 'IN_PROGRESS' || request.status === 'CLOSED') && paymentMethods.length > 0 && (
                      <button
                        onClick={() => setShowPaymentFor(showPaymentFor === request.id ? null : request.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition font-semibold"
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        {showPaymentFor === request.id ? 'Hide Payment' : 'Make Payment'}
                      </button>
                    )}
                  </td>
                </tr>
                {showPaymentFor === request.id && (
                  <tr key={request.id + '-payment'}>
                    <td colSpan={5} className="px-6 pb-5 pt-0">
                      <div className="border border-green-200 bg-green-50 rounded-xl p-5">
                        <p className="text-sm font-semibold text-green-900 mb-4 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Payment Options for: {request.service?.name || 'Service Request'}
                        </p>
                        <div className="space-y-4">
                          {paymentMethods.map((method: any) => (
                            <div key={method.id} className="bg-white rounded-lg border border-gray-200 p-4">
                              <p className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                                {method.type === 'CRYPTO' ? '₿' : '🏦'} {method.name}
                                {method.network && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{method.network}</span>}
                              </p>
                              {method.type === 'CRYPTO' && method.wallet_address && (
                                <div className="flex flex-col sm:flex-row gap-3 items-start">
                                  {method.qr_code_url && (
                                    <img src={method.qr_code_url} alt="QR" className="w-20 h-20 rounded border border-gray-200 object-contain flex-shrink-0" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500 mb-1">Wallet Address:</p>
                                    <div className="flex items-center gap-2">
                                      <code className="text-xs bg-gray-100 px-2 py-1.5 rounded border flex-1 break-all">{method.wallet_address}</code>
                                      <button onClick={() => copyToClipboard(method.wallet_address, method.id)} className="flex-shrink-0 p-1.5 text-gray-500 hover:text-green-700 rounded transition">
                                        {copiedId === method.id ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                      </button>
                                    </div>
                                    <p className="text-xs text-amber-600 mt-1.5 font-medium">Only send {method.name} on the {method.network || 'correct'} network.</p>
                                  </div>
                                </div>
                              )}
                              {method.type === 'BANK' && (
                                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                                  {method.bank_name && <p className="text-gray-500">Bank: <span className="text-gray-800 font-medium">{method.bank_name}</span></p>}
                                  {method.account_name && <p className="text-gray-500">Account: <span className="text-gray-800 font-medium">{method.account_name}</span></p>}
                                  {method.iban && (
                                    <p className="text-gray-500 flex items-center gap-1">
                                      IBAN: <span className="text-gray-800 font-medium font-mono">{method.iban}</span>
                                      <button onClick={() => copyToClipboard(method.iban, method.id + 'i')} className="text-gray-400 hover:text-green-700">
                                        {copiedId === method.id + 'i' ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                                      </button>
                                    </p>
                                  )}
                                  {method.swift_code && <p className="text-gray-500">SWIFT: <span className="text-gray-800 font-medium">{method.swift_code}</span></p>}
                                  {method.bank_currency && <p className="text-gray-500">Currency: <span className="text-gray-800 font-medium">{method.bank_currency}</span></p>}
                                  {method.additional_info && <p className="col-span-2 text-gray-500 mt-1 bg-gray-50 p-2 rounded">{method.additional_info}</p>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-3">After making payment please email <a href="mailto:info@noonmarine.com" className="text-primary-600 hover:underline">info@noonmarine.com</a> with your transaction reference.</p>
                      </div>
                    </td>
                  </tr>
                )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ProfileTab() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                defaultValue={user?.firstName || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                defaultValue={user?.lastName || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue={user?.phone || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email updates about your requests</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">SMS Notifications</p>
              <p className="text-sm text-gray-600">Receive SMS updates for urgent matters</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}


const allServices = [
  { icon: Ship, title: 'Vessel Sales & Chartering', description: 'Buy, sell, or charter vessels' },
  { icon: Shield, title: 'Marine Insurance', description: 'Comprehensive marine coverage' },
  { icon: Flag, title: 'Flag Registration', description: 'International flag services' },
  { icon: Users, title: 'Crew Management', description: 'Recruitment and support' },
  { icon: Wrench, title: 'Repair & Docking', description: 'Maintenance services' },
  { icon: Package, title: 'Spare Parts Supply', description: 'Marine parts delivery' },
  { icon: Truck, title: 'Logistics & Shipping', description: 'Cargo and equipment' },
  { icon: GraduationCap, title: 'Training & Certification', description: 'Professional courses' },
  { icon: ClipboardCheck, title: 'Classification & Survey', description: 'Class and survey booking' },
  { icon: Building2, title: 'Offshore Project Support', description: 'Engineering and logistics' },
  { icon: FileText, title: 'Legal Consultancy', description: 'Maritime law services' },
  { icon: LifeBuoy, title: 'Salvage & Towage', description: 'Emergency services' },
];

const requests = [
  {
    icon: Flag,
    service: 'Flag Registration',
    vessel: 'MV OCEAN STAR',
    date: 'Dec 15, 2024',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-800',
    priority: 'Normal',
    priorityColor: 'bg-gray-100 text-gray-800',
  },
  {
    icon: Shield,
    service: 'Marine Insurance',
    vessel: 'MV PACIFIC',
    date: 'Dec 18, 2024',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-800',
    priority: 'Urgent',
    priorityColor: 'bg-orange-100 text-orange-800',
  },
  {
    icon: Users,
    service: 'Crew Training',
    vessel: 'MV ATLANTIC',
    date: 'Dec 20, 2024',
    status: 'In Progress',
    statusColor: 'bg-blue-100 text-blue-800',
    priority: 'Normal',
    priorityColor: 'bg-gray-100 text-gray-800',
  },
  {
    icon: Wrench,
    service: 'Dry Docking',
    vessel: 'MV INDIAN',
    date: 'Dec 22, 2024',
    status: 'Scheduled',
    statusColor: 'bg-purple-100 text-purple-800',
    priority: 'High',
    priorityColor: 'bg-red-100 text-red-800',
  },
];

