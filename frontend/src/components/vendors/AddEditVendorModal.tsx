import { useState } from 'react';
import { Modal } from '../Modal';
import { FormField, Input } from '../FormField';
import { Save, X } from 'lucide-react';
import type { VendorResponse } from '../../types/vendor';


interface AddEditVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vendor: any) => void;
  isSaving: boolean;
  mode: 'add' | 'edit';
  vendors?: VendorResponse | null
}


export function AddEditVendorModal({ isOpen, onClose, onSave, isSaving, mode, vendors }: AddEditVendorModalProps) {


  const [formData, setFormData] = useState({
    name: vendors?.name || '',
    phone: vendors?.phone || '',
    email: vendors?.email || '',
    address: vendors?.address || '',
    city: vendors?.city || '',
    state: vendors?.state || '',
    pincode: vendors?.pincode || '',
    gst_number: vendors?.gst_number || '',
    bank_name: vendors?.bank?.bank_name || '',
    account_number: vendors?.bank?.account_number || '',
    ifsc_code: vendors?.bank?.ifsc_code || '',
    branch_name: vendors?.bank?.branch_name || '',
  });



  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Vendor name is required';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (Number.isInteger(formData.phone) || formData.phone.toString().length !== 10)
      newErrors.phone = 'Invalid phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSave(formData);
        handleClose();
      } catch (error) {
        console.error('Error saving vendor:', error);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: 0,
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      gst_number: '',
      bank_name: '',
      account_number: '',
      ifsc_code: '',
      branch_name: '',
    });
    setErrors({});
    onClose();
  };


  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Vendor" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div>
          <h4 className="mb-4 pb-2 border-b border-border">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <FormField label="Vendor Name" required error={errors.name}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., AutoParts Pro"
                  error={!!errors.name}
                />
              </FormField>
            </div>



            <FormField label="Phone Number" required error={errors.phone}>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                error={!!errors.phone}
              />
            </FormField>

            <FormField label="Email Address" required error={errors.email}>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@autopartspro.com"
                error={!!errors.email}
              />
            </FormField>

            <FormField label="GST Number">
              <Input
                name="gst_number"
                value={formData.gst_number}
                onChange={handleChange}
                placeholder="22AAAAA0000A1Z5"
              />
            </FormField>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h4 className="mb-4 pb-2 border-b border-border">Address Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <FormField label="Street Address" required error={errors.address}>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Building No., Street Name"
                  error={!!errors.address}
                />
              </FormField>
            </div>

            <FormField label="City">
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Mumbai"
              />
            </FormField>

            <FormField label="State">
              <Input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g., Maharashtra"
              />
            </FormField>

            <FormField label="Pincode">
              <Input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="400001"
              />
            </FormField>
          </div>
        </div>

        {/* Banking Information */}
        <div>
          <h4 className="mb-4 pb-2 border-b border-border">Banking Information (Optional)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Bank Name">
              <Input
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                placeholder="e.g., HDFC Bank"
              />
            </FormField>

            <FormField label="Account Number">
              <Input
                name="account_number"
                value={formData.account_number}
                onChange={handleChange}
                placeholder="1234567890"
              />
            </FormField>

            <FormField label="Branch Name">
              <Input
                name="branch_name"
                value={formData.branch_name}
                onChange={handleChange}
                placeholder="Test Branch"
              />
            </FormField>

            <FormField label="IFSC Code">
              <Input
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
                placeholder="HDFC0001234"
              />
            </FormField>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 sm:flex-none px-6 py-2.5 border border-border rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 sm:flex-none px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving
            ? mode === "add"
              ? "Saving..."
              : "Updating..."
            : mode === "add"
              ? "Save Vendor"
              : "Update Vendor"}

          </button>
        </div>
      </form>
    </Modal>
  );
}