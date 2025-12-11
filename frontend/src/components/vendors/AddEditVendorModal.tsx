import { useState } from 'react';
import { Modal } from '../Modal';
import { FormField, Input, TextArea } from '../FormField';
import { Save, X } from 'lucide-react';


interface AddEditVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vendor: any) => void;
}


export function AddEditVendorModal({ isOpen, onClose, onSave }: AddEditVendorModalProps) {
    const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstin: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    notes: '',
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
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone))
      newErrors.phone = 'Invalid phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      gstin: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      notes: '',
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

            <FormField label="Contact Person" required error={errors.contactPerson}>
              <Input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="e.g., Rajesh Kumar"
                error={!!errors.contactPerson}
              />
            </FormField>

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
                name="gstin"
                value={formData.gstin}
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
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="e.g., HDFC Bank"
              />
            </FormField>

            <FormField label="Account Number">
              <Input
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="1234567890"
              />
            </FormField>

            <FormField label="IFSC Code">
              <Input
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="HDFC0001234"
              />
            </FormField>
          </div>
        </div>

        {/* Notes */}
        <FormField label="Notes">
          <TextArea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional notes about this vendor..."
            rows={4}
          />
        </FormField>

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
            className="flex-1 sm:flex-none px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Vendor
          </button>
        </div>
      </form>
    </Modal>
  );
}