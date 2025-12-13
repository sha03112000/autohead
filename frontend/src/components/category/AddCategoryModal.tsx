import { useState } from 'react';
import { Modal } from '../Modal';
import { FormField, Input, TextArea } from '../FormField';
import { Save, X } from 'lucide-react';
import { Loader } from 'lucide-react';


interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vendor: any) => void;
    isSaving: boolean;
}


export function AddCategoryModal({ isOpen, onClose, onSave, isSaving }: AddCategoryModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
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

        if (!formData.name.trim()) newErrors.name = 'Category name is required';
        if (formData.description.trim() && formData.description.length < 5) newErrors.description = 'Description must be at least 5 characters';

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

            }
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
        <Modal isOpen={isOpen} onClose={handleClose} title="Add New Category" size="sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                    <h4 className="mb-4 pb-2 border-b border-border">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <FormField label="Category Name" required error={errors.name}>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., AutoParts"
                                    error={!!errors.name}
                                />
                            </FormField>
                        </div>


                    </div>

                    <FormField label="Description" required error={errors.description}>
                        <TextArea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Any additional notes about this category..."
                            rows={4}
                        />
                    </FormField>
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
                        {isSaving ? (
                            <>
                                <Loader />
                                Saving...
                            </>

                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Category
                            </>
                        )}

                    </button>
                </div>
            </form>
        </Modal>
    );
}