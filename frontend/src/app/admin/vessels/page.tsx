'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Ship, Eye } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Vessel {
  id: string;
  name: string;
  vesselType: string;
  status: string;
  flag?: string;
  yearBuilt?: number;
  grossTonnage?: number;
  price?: number;
  charterRate?: number;
  description?: string;
  images: string[];
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: 'bg-green-100 text-green-700',
  SOLD: 'bg-gray-100 text-gray-600',
  CHARTERED: 'bg-blue-100 text-blue-700',
  UNDER_MAINTENANCE: 'bg-yellow-100 text-yellow-700',
  DECOMMISSIONED: 'bg-red-100 text-red-700',
};

export default function AdminVesselsPage() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) { router.push('/login'); return; }
    const user = JSON.parse(storedUser);
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role)) { router.push('/dashboard'); return; }
    loadVessels();
  }, [router]);

  const loadVessels = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/vessels?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setVessels(data.data || []);
    } catch {
      alert('Failed to load vessels');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/vessels/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setVessels(vessels.filter((v) => v.id !== id));
      } else {
        alert('Failed to delete vessel');
      }
    } catch {
      alert('Failed to delete vessel');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vessel Management</h1>
            <p className="text-gray-500 text-sm mt-1">{vessels.length} vessel{vessels.length !== 1 ? 's' : ''} total</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 transition">← Admin</Link>
            <Link
              href="/admin/vessels/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
            >
              <Plus className="h-4 w-4" />
              Add Vessel
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading vessels...</div>
        ) : vessels.length === 0 ? (
          <div className="text-center py-20">
            <Ship className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No vessels yet</h3>
            <p className="text-gray-400 mb-6">Add your first vessel to display it on the website.</p>
            <Link href="/admin/vessels/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
              <Plus className="h-4 w-4" /> Add Vessel
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Vessel</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Type</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Price / Rate</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Year</th>
                  <th className="text-right px-6 py-3 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vessels.map((vessel) => (
                  <tr key={vessel.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {vessel.images?.[0] ? (
                          <img src={vessel.images[0]} alt={vessel.name} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                            <Ship className="h-5 w-5 text-primary-600" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">{vessel.name}</div>
                          {vessel.flag && <div className="text-xs text-gray-400">{vessel.flag}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{vessel.vesselType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[vessel.status] || 'bg-gray-100 text-gray-600'}`}>
                        {vessel.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {vessel.price ? `$${vessel.price.toLocaleString()}` : vessel.charterRate ? `$${vessel.charterRate.toLocaleString()}/day` : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{vessel.yearBuilt || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/vessels/edit/${vessel.id}`}
                          className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(vessel.id, vessel.name)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
