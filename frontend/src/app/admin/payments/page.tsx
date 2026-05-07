'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  CreditCard,
  Building2,
  Bitcoin,
  Eye,
  EyeOff,
  Upload,
  RefreshCw,
  GripVertical,
} from 'lucide-react';
import { paymentService } from '@/lib/paymentService';
import { PaymentMethod } from '@/lib/supabase';

const emptyForm = {
  type: 'CRYPTO' as 'CRYPTO' | 'BANK',
  name: '',
  is_active: true,
  sort_order: 0,
  network: '',
  wallet_address: '',
  qr_code_url: '',
  bank_name: '',
  account_name: '',
  account_number: '',
  iban: '',
  swift_code: '',
  routing_number: '',
  bank_country: '',
  bank_currency: '',
  additional_info: '',
};

export default function AdminPaymentsPage() {
  const [user, setUser] = useState<any>(null);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PaymentMethod | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { window.location.href = '/login'; return; }
    const parsed = JSON.parse(stored);
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(parsed.role)) {
      window.location.href = '/dashboard';
      return;
    }
    setUser(parsed);
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      const data = await paymentService.getAll();
      setMethods(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm, sort_order: methods.length + 1 });
    setShowForm(true);
  };

  const openEdit = (method: PaymentMethod) => {
    setEditing(method);
    setForm({
      type: method.type,
      name: method.name,
      is_active: method.is_active,
      sort_order: method.sort_order,
      network: method.network || '',
      wallet_address: method.wallet_address || '',
      qr_code_url: method.qr_code_url || '',
      bank_name: method.bank_name || '',
      account_name: method.account_name || '',
      account_number: method.account_number || '',
      iban: method.iban || '',
      swift_code: method.swift_code || '',
      routing_number: method.routing_number || '',
      bank_country: method.bank_country || '',
      bank_currency: method.bank_currency || '',
      additional_info: method.additional_info || '',
    });
    setShowForm(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, qr_code_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { alert('Name is required'); return; }
    if (form.type === 'CRYPTO' && !form.wallet_address.trim()) {
      alert('Wallet address is required for crypto payment methods');
      return;
    }
    if (form.type === 'BANK' && !form.bank_name.trim()) {
      alert('Bank name is required for bank payment methods');
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        type: form.type,
        name: form.name,
        is_active: form.is_active,
        sort_order: Number(form.sort_order),
        network: form.network || null,
        wallet_address: form.wallet_address || null,
        qr_code_url: form.qr_code_url || null,
        bank_name: form.bank_name || null,
        account_name: form.account_name || null,
        account_number: form.account_number || null,
        iban: form.iban || null,
        swift_code: form.swift_code || null,
        routing_number: form.routing_number || null,
        bank_country: form.bank_country || null,
        bank_currency: form.bank_currency || null,
        additional_info: form.additional_info || null,
      };

      if (editing) {
        await paymentService.update(editing.id, payload);
      } else {
        await paymentService.create(payload);
      }

      setShowForm(false);
      setEditing(null);
      fetchMethods();
    } catch (err: any) {
      alert('Failed to save: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      await paymentService.toggleActive(id, !current);
      fetchMethods();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await paymentService.delete(id);
      setDeleteConfirm(null);
      fetchMethods();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="h-10 w-10 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.webp" alt="Noon Marine" width={110} height={42} className="object-contain" />
          </Link>
          <div className="text-sm text-gray-300">
            {user?.firstName} {user?.lastName} &mdash; <span className="text-primary-400">{user?.role}</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
              <p className="text-sm text-gray-500 mt-1">Manage crypto wallets and bank accounts shown to customers</p>
            </div>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            <Plus className="h-5 w-5" />
            Add Payment Method
          </button>
        </div>

        {methods.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No payment methods configured yet</p>
            <button onClick={openNew} className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
              Add First Payment Method
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {methods.map((method) => (
              <div
                key={method.id}
                className={`bg-white rounded-xl shadow-sm border ${method.is_active ? 'border-gray-200' : 'border-gray-100 opacity-60'} p-5`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${method.type === 'CRYPTO' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                      {method.type === 'CRYPTO' ? (
                        <Bitcoin className="h-6 w-6 text-orange-600" />
                      ) : (
                        <Building2 className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{method.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          method.type === 'CRYPTO' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {method.type}
                        </span>
                        {!method.is_active && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Inactive</span>
                        )}
                      </div>

                      {method.type === 'CRYPTO' && (
                        <div className="mt-2 space-y-1">
                          {method.network && <p className="text-sm text-gray-500">Network: <span className="text-gray-700">{method.network}</span></p>}
                          {method.wallet_address && (
                            <p className="text-sm text-gray-500">
                              Address: <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 break-all">{method.wallet_address}</code>
                            </p>
                          )}
                        </div>
                      )}

                      {method.type === 'BANK' && (
                        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1">
                          {method.bank_name && <p className="text-sm text-gray-500">Bank: <span className="text-gray-700">{method.bank_name}</span></p>}
                          {method.account_name && <p className="text-sm text-gray-500">Account: <span className="text-gray-700">{method.account_name}</span></p>}
                          {method.iban && <p className="text-sm text-gray-500">IBAN: <span className="text-gray-700">{method.iban}</span></p>}
                          {method.swift_code && <p className="text-sm text-gray-500">SWIFT: <span className="text-gray-700">{method.swift_code}</span></p>}
                        </div>
                      )}
                    </div>

                    {method.qr_code_url && (
                      <img
                        src={method.qr_code_url}
                        alt="QR Code"
                        className="w-16 h-16 rounded border border-gray-200 object-contain flex-shrink-0"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(method.id, method.is_active)}
                      className={`p-2 rounded-lg transition ${method.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                      title={method.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {method.is_active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => openEdit(method)}
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      title="Edit"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(method.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editing ? 'Edit Payment Method' : 'Add Payment Method'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Type toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, type: 'CRYPTO' }))}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition ${
                      form.type === 'CRYPTO' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Bitcoin className="h-5 w-5" />
                    Cryptocurrency
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, type: 'BANK' }))}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition ${
                      form.type === 'BANK' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className="h-5 w-5" />
                    Bank Transfer
                  </button>
                </div>
              </div>

              {/* Common */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={form.type === 'CRYPTO' ? 'e.g. USDT (ERC20), Bitcoin (BTC)' : 'e.g. USD Bank Transfer'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min={0}
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Active (visible to customers)</span>
                  </label>
                </div>
              </div>

              {/* Crypto fields */}
              {form.type === 'CRYPTO' && (
                <div className="space-y-4 border border-orange-100 bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-orange-800">Cryptocurrency Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Network / Token</label>
                    <input
                      type="text"
                      value={form.network}
                      onChange={e => setForm(f => ({ ...f, network: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      placeholder="e.g. Ethereum (ERC20), TRON (TRC20), Bitcoin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address *</label>
                    <input
                      type="text"
                      value={form.wallet_address}
                      onChange={e => setForm(f => ({ ...f, wallet_address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-mono text-sm"
                      placeholder="0x..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">QR Code</label>
                    {form.qr_code_url && (
                      <div className="mb-3 flex items-center gap-3">
                        <img src={form.qr_code_url} alt="QR Preview" className="h-24 w-24 object-contain rounded border border-gray-200 bg-white" />
                        <button
                          type="button"
                          onClick={() => setForm(f => ({ ...f, qr_code_url: '' }))}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={form.qr_code_url.startsWith('data:') ? '' : form.qr_code_url}
                        onChange={e => setForm(f => ({ ...f, qr_code_url: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
                        placeholder="Paste image URL or upload file"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition bg-white"
                      >
                        <Upload className="h-4 w-4" />
                        Upload
                      </button>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    <p className="text-xs text-gray-500 mt-1">Upload a QR code image or paste a URL (e.g. /usdt-qr.jpg)</p>
                  </div>
                </div>
              )}

              {/* Bank fields */}
              {form.type === 'BANK' && (
                <div className="space-y-4 border border-blue-100 bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-800">Bank Account Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                      <input
                        type="text"
                        value={form.bank_name}
                        onChange={e => setForm(f => ({ ...f, bank_name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="e.g. Emirates NBD"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                      <input
                        type="text"
                        value={form.account_name}
                        onChange={e => setForm(f => ({ ...f, account_name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="Account holder name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={form.account_number}
                        onChange={e => setForm(f => ({ ...f, account_number: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="Account number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                      <input
                        type="text"
                        value={form.iban}
                        onChange={e => setForm(f => ({ ...f, iban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="AE07 0331 2345 6789 0123 456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SWIFT / BIC</label>
                      <input
                        type="text"
                        value={form.swift_code}
                        onChange={e => setForm(f => ({ ...f, swift_code: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="e.g. EBILAEAD"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                      <input
                        type="text"
                        value={form.routing_number}
                        onChange={e => setForm(f => ({ ...f, routing_number: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="For US banks"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        value={form.bank_country}
                        onChange={e => setForm(f => ({ ...f, bank_country: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="e.g. United Arab Emirates"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <input
                        type="text"
                        value={form.bank_currency}
                        onChange={e => setForm(f => ({ ...f, bank_currency: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="e.g. USD, AED, EUR"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Info</label>
                      <textarea
                        rows={2}
                        value={form.additional_info}
                        onChange={e => setForm(f => ({ ...f, additional_info: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        placeholder="Any extra instructions for the customer (e.g. reference number format)"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50"
              >
                {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {editing ? 'Save Changes' : 'Add Method'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Payment Method</h3>
            <p className="text-gray-600 mb-6 text-sm">This payment method will be permanently removed and no longer shown to customers.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
