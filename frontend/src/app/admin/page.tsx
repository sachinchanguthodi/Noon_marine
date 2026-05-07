'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Bell,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Check,
  X,
  Clock,
  AlertCircle,
  Users,
  Ship,
  Shield,
  Flag,
  Wrench,
  Package,
  Truck,
  GraduationCap,
  FileText,
  ShoppingBag,
} from 'lucide-react';

interface ServiceRequest {
  id: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  service: {
    name: string;
    category: string;
  };
  customer: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  };
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Check if user is admin
      if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(parsedUser.role)) {
        alert('Access denied. Admin privileges required.');
        window.location.href = '/dashboard';
        return;
      }

      fetchServiceRequests();

      // Set up auto-refresh every 30 seconds
      const refreshInterval = setInterval(() => {
        fetchServiceRequests();
      }, 30000);

      // Cleanup interval on unmount
      return () => clearInterval(refreshInterval);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const fetchServiceRequests = async () => {
    try {
      const { serviceRequestsService } = await import('@/lib/api');
      const response: any = await serviceRequestsService.getAll({ limit: 100 });
      setRequests(response.data?.serviceRequests || []);
    } catch (error) {
      console.error('Failed to fetch service requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const { serviceRequestsService } = await import('@/lib/api');
      await serviceRequestsService.updateStatus(requestId, newStatus);

      // Refresh the list
      fetchServiceRequests();
      setSelectedRequest(null);
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
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
      case 'NORMAL':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'VESSEL_SALES':
      case 'CHARTERING':
        return Ship;
      case 'INSURANCE':
        return Shield;
      case 'FLAG_REGISTRATION':
        return Flag;
      case 'REPAIR_DOCKING':
        return Wrench;
      case 'SPARE_PARTS':
        return Package;
      case 'LOGISTICS':
        return Truck;
      case 'TRAINING':
        return GraduationCap;
      default:
        return FileText;
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesFilter = filter === 'all' || req.status === filter;
    const matchesSearch = searchTerm === '' ||
      req.customer.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.customer.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.customer.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.service.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: requests.length,
    open: requests.filter(r => r.status === 'OPEN').length,
    inProgress: requests.filter(r => r.status === 'IN_PROGRESS').length,
    closed: requests.filter(r => r.status === 'CLOSED').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
                    {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
                  </div>
                  <div className="text-xs text-primary-400 font-semibold">
                    {user?.role?.replace('_', ' ')}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                  {user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : 'A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <ClipboardList className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.open}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.inProgress}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.closed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('OPEN')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'OPEN'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Open ({stats.open})
              </button>
              <button
                onClick={() => setFilter('IN_PROGRESS')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'IN_PROGRESS'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                In Progress ({stats.inProgress})
              </button>
              <button
                onClick={() => setFilter('CLOSED')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'CLOSED'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Closed ({stats.closed})
              </button>
            </div>

            <div className="flex items-center space-x-4">
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
              <button
                onClick={fetchServiceRequests}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardList className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No service requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => {
                    const ServiceIcon = getServiceIcon(request.service.category);
                    return (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {request.customer.user.firstName} {request.customer.user.lastName}
                            </div>
                            <div className="text-xs text-gray-500">{request.customer.user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="bg-primary-100 p-2 rounded-lg mr-3">
                              <ServiceIcon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div className="text-sm text-gray-900">{request.service.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="text-primary-600 hover:text-primary-900 inline-flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Back to Dashboard
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/users"
              className="px-5 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center"
            >
              <Users className="h-5 w-5 mr-2" />
              Users
            </Link>
            <Link
              href="/admin/payments"
              className="px-5 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center"
            >
              <Shield className="h-5 w-5 mr-2" />
              Payment Methods
            </Link>
            <Link
              href="/admin/marketplace"
              className="px-5 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition flex items-center"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Marketplace
            </Link>
          </div>
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Service Request Details</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Created on {new Date(selectedRequest.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {selectedRequest.customer.user.firstName} {selectedRequest.customer.user.lastName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedRequest.customer.user.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {selectedRequest.customer.user.phone || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Service Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Service:</span> {selectedRequest.service.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Category:</span> {selectedRequest.service.category.replace('_', ' ')}
                  </p>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Request Description</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">{selectedRequest.description}</p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => updateRequestStatus(selectedRequest.id, 'OPEN')}
                    disabled={selectedRequest.status === 'OPEN'}
                    className="flex-1 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark as Open
                  </button>
                  <button
                    onClick={() => updateRequestStatus(selectedRequest.id, 'IN_PROGRESS')}
                    disabled={selectedRequest.status === 'IN_PROGRESS'}
                    className="flex-1 px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateRequestStatus(selectedRequest.id, 'CLOSED')}
                    disabled={selectedRequest.status === 'CLOSED'}
                    className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark as Closed
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

