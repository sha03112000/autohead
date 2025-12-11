import { useState } from 'react';
import { Modal } from '../Modal';
import { FormField, Input, TextArea, Select } from '../FormField';
import { Save, X } from 'lucide-react';


interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
}

const vendors = [
  { value: '', label: 'Select Vendor' },
  { value: 'AutoParts Pro', label: 'AutoParts Pro' },
  { value: 'BrightAuto Ltd', label: 'BrightAuto Ltd' },
  { value: 'ShieldCar Inc', label: 'ShieldCar Inc' },
  { value: 'TechDrive Co', label: 'TechDrive Co' },
  { value: 'SafeView Systems', label: 'SafeView Systems' },
  { value: 'LuxuryAuto', label: 'LuxuryAuto' },
  { value: 'SafetyFirst Ltd', label: 'SafetyFirst Ltd' },
];


const categories = [
  { value: '', label: 'Select Category' },
  { value: 'Interior', label: 'Interior' },
  { value: 'Exterior', label: 'Exterior' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Lighting', label: 'Lighting' },
  { value: 'Safety', label: 'Safety' },
  { value: 'Performance', label: 'Performance' },
  { value: 'Maintenance', label: 'Maintenance' },
];


export function AddEditProductModal({ isOpen, onClose, onSave }: AddEditProductModalProps) {
const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    vendor: '',
    description: '',
    stock: '',
    minStock: '',
    costPrice: '',
    sellingPrice: '',
    barcode: '',
    location: '',
  });


  const [errors, setErrors] = useState<Record<string, string>>({});


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };



  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.vendor) newErrors.vendor = 'Vendor is required';
    if (!formData.stock || Number(formData.stock) < 0)
      newErrors.stock = 'Valid stock quantity is required';
    if (!formData.minStock || Number(formData.minStock) < 0)
      newErrors.minStock = 'Valid minimum stock is required';
    if (!formData.costPrice || Number(formData.costPrice) <= 0)
      newErrors.costPrice = 'Valid cost price is required';
    if (!formData.sellingPrice || Number(formData.sellingPrice) <= 0)
      newErrors.sellingPrice = 'Valid selling price is required';
    if (Number(formData.sellingPrice) < Number(formData.costPrice))
      newErrors.sellingPrice = 'Selling price must be greater than cost price';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        stock: Number(formData.stock),
        minStock: Number(formData.minStock),
        costPrice: Number(formData.costPrice),
        sellingPrice: Number(formData.sellingPrice),
      });
      handleClose();
    }
  };



  const handleClose = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      vendor: '',
      description: '',
      stock: '',
      minStock: '',
      costPrice: '',
      sellingPrice: '',
      barcode: '',
      location: '',
    });
    setErrors({});
    onClose();
  };


  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Product" size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Product Name */}
          <FormField label="Product Name" required error={errors.name}>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Premium Floor Mats"
              error={!!errors.name}
            />
          </FormField>

          {/* SKU */}
          <FormField label="SKU" required error={errors.sku}>
            <Input
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="e.g., ACC-001"
              error={!!errors.sku}
            />
          </FormField>

          {/* Category */}
          <FormField label="Category" required error={errors.category}>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categories}
              error={!!errors.category}
            />
          </FormField>

          {/* Vendor */}
          <FormField label="Vendor" required error={errors.vendor}>
            <Select
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              options={vendors}
              error={!!errors.vendor}
            />
          </FormField>

          {/* Stock Quantity */}
          <FormField label="Stock Quantity" required error={errors.stock}>
            <Input
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              error={!!errors.stock}
            />
          </FormField>

          {/* Minimum Stock */}
          <FormField label="Minimum Stock Level" required error={errors.minStock}>
            <Input
              name="minStock"
              type="number"
              min="0"
              value={formData.minStock}
              onChange={handleChange}
              placeholder="0"
              error={!!errors.minStock}
            />
          </FormField>

          {/* Cost Price */}
          <FormField label="Cost Price (₹)" required error={errors.costPrice}>
            <Input
              name="costPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.costPrice}
              onChange={handleChange}
              placeholder="0.00"
              error={!!errors.costPrice}
            />
          </FormField>

          {/* Selling Price */}
          <FormField label="Selling Price (₹)" required error={errors.sellingPrice}>
            <Input
              name="sellingPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.sellingPrice}
              onChange={handleChange}
              placeholder="0.00"
              error={!!errors.sellingPrice}
            />
          </FormField>

          {/* Barcode */}
          <FormField label="Barcode">
            <Input
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              placeholder="Optional"
            />
          </FormField>

          {/* Storage Location */}
          <FormField label="Storage Location">
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Warehouse A, Shelf 12"
            />
          </FormField>
        </div>

        {/* Description */}
        <FormField label="Description">
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description..."
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
            Save Product
          </button>
        </div>
      </form>
    </Modal>
  );
}