'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const VESSEL_TYPES = ['YACHT', 'CARGO', 'SUPPLY', 'TANKER', 'FISHING', 'PASSENGER', 'TUGBOAT', 'OTHER'];
const VESSEL_STATUSES = ['AVAILABLE', 'SOLD', 'CHARTERED', 'UNDER_MAINTENANCE', 'DECOMMISSIONED'];

export default function NewVesselPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    vesselType: 'CARGO',
    status: 'AVAILABLE',
    imoNumber: '',
    mmsiNumber: '',
    flag: '',
    yearBuilt: '',
    length: '',
    beam: '',
    draft: '',
    grossTonnage: '',
    engineType: '',
    speed: '',
    price: '',
    charterRate: '',
    description: '',
    images: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) { router.push('/login'); return; }
    const user = JSON.parse(storedUser);
    if (!['SUPER_ADMIN', 'ADMIN'].includes(user.role)) { router.push('/dashboard'); return; }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const payload: any = {
        name: form.name,
        vesselType: form.vesselType,
        status: form.status,
        description: form.description || undefined,
        flag: form.flag || undefined,
        imoNumber: form.imoNumber || undefined,
        mmsiNumber: form.mmsiNumber || undefined,
        images: form.images ? form.images.split('\n').map(u => u.trim()).filter(Boolean) : [],
      };

      const numFields = ['yearBuilt', 'length', 'beam', 'draft', 'grossTonnage', 'speed', 'price', 'charterRate'] as const;
      numFields.forEach((f) => { if (form[f]) payload[f] = parseFloat(form[f]); });
      if (form.engineType) payload.engineType = form.engineType;

      const res = await fetch(`${API_URL}/api/vessels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin/vessels');
      } else {
        setError(data.message || 'Failed to create vessel');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Vessel</h1>
          <Link href="/admin/vessels" className="text-sm text-gray-500 hover:text-gray-700">← Back to Vessels</Link>
        </div>

        {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 mb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vessel Name *</label>
                <input name="name" required value={form.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="MV OCEAN STAR" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vessel Type *</label>
                <select name="vesselType" value={form.vesselType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  {VESSEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  {VESSEL_STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IMO Number</label>
                <input name="imoNumber" value={form.imoNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="IMO 1234567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MMSI Number</label>
                <input name="mmsiNumber" value={form.mmsiNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="123456789" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flag / Country</label>
                <input name="flag" value={form.flag} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="UAE" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                <input name="yearBuilt" type="number" value={form.yearBuilt} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="2020" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="Describe the vessel..." />
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'length', label: 'Length (m)' },
                { name: 'beam', label: 'Beam (m)' },
                { name: 'draft', label: 'Draft (m)' },
                { name: 'grossTonnage', label: 'Gross Tonnage' },
                { name: 'speed', label: 'Speed (knots)' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input name={f.name} type="number" step="0.1" value={(form as any)[f.name]} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Engine Type</label>
                <input name="engineType" value={form.engineType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="MAN B&W" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (USD)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="1500000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Charter Rate (USD/day)</label>
                <input name="charterRate" type="number" value={form.charterRate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="5000" />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-2">Image URLs</h2>
            <p className="text-xs text-gray-400 mb-3">One URL per line</p>
            <textarea name="images" value={form.images} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm" placeholder={"https://example.com/vessel1.jpg\nhttps://example.com/vessel2.jpg"} />
          </div>

          <div className="flex gap-3 justify-end">
            <Link href="/admin/vessels" className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">Cancel</Link>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium disabled:opacity-50">
              {saving ? 'Saving...' : 'Add Vessel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
