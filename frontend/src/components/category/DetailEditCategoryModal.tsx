import { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { FormField, Input, TextArea } from '../FormField';
import type { CategoryResponse } from '../../types/category';
import { useCategoryData } from '../../hooks/category';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';



interface CategoryEditDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: CategoryResponse | null;
}

export function DetailEditCategoryModal({ isOpen, onClose, category }: CategoryEditDetailModalProps) {


    const { updateCategory, isUpdating, deleteCategory, isDeleting } = useCategoryData();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });


    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description ?? '',
            });
        }
    }, [category]);


    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!category) return null;

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

        if (!formData.name.trim()) newErrors.name = 'Category name is required';
        if (formData.description.trim() && formData.description.length < 5) newErrors.description = 'Description must be at least 5 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            await updateCategory(
                {
                    id: category.id,
                    ...formData,
                }
            ).unwrap();
            toast.success('Category updated successfully', { autoClose: 2000 });
            handleClose();
        } catch (err: any) {
            const errorMessage =
                err?.data?.errors?.name?.[0] ||
                err?.data?.message ||
                'Something went wrong';
            toast.error(errorMessage, { autoClose: 2000 });

            throw err;
        }
    };

    const handleDelete = async () => {

        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            console.log(category.id);
            await deleteCategory(category.id).unwrap();
            toast.success('Category deleted successfully', { autoClose: 2000 });
            handleClose();
        } catch (err: any) {
            const errorMessage =
                err?.data?.errors?.name?.[0] ||
                err?.data?.message ||
                'Something went wrong';
            toast.error(errorMessage, { autoClose: 2000 });

            throw err;
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            description: '',
        });
        setErrors({});
        onClose();
    };



    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Category Details" size="sm">
            <form onSubmit={handleUpdate} className="space-y-6">
                {/* Header Section */}
                <div>
                    <h4 className="mb-4 pb-2 border-b border-border">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <FormField label="Category Name" required error={errors.name}>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                />
                            </FormField>
                        </div>
                    </div>

                    <FormField label="Description" required >
                        <TextArea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            placeholder="Any additional notes about this category..."
                            rows={4}
                        />
                    </FormField>
                </div>


                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-border">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        {isUpdating ? <Loader /> : 'Update'}
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex-1 px-4 py-2.5 border border-border rounded-lg hover:bg-accent transition-colors">
                        {isDeleting ? <Loader /> : 'Delete'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
