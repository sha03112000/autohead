import { useState } from 'react';
import { Search, Plus, Edit, Eye, Notebook } from 'lucide-react';
import { AddCategoryModal } from '../components/category/AddCategoryModal';
import { DetailEditCategoryModal } from '../components/category/DetailEditCategoryModal';
import { useCategoryData } from '../hooks/category';
import type { CategoryFormData, CategoryResponse } from '../types/category';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';





export default function CategoryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const { data: categories = [], isLoading, isError,
        createCategory, isCreating } = useCategoryData();


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader className="w-6 h-6 animate-spin text-primary" />
            </div>
        );
    }


    if (isError) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <p className="text-red-500">Error fetching categories</p>
            </div>
        );
    }



    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleAddCategory = async (vendorData: CategoryFormData) => {
        try {
            await createCategory(vendorData).unwrap();
            toast.success('Category added successfully', { autoClose: 2000 });
        } catch (err: any) {
            const errorMessage =
                err?.data?.errors?.name?.[0] ||
                err?.data?.message ||
                'Something went wrong';
            toast.error(errorMessage, { autoClose: 2000 });

            throw err;
        }
    };


    const handleViewVendor = (category: CategoryResponse) => {
        setSelectedCategory(category);
        setShowDetailModal(true);
    };

    return (
        <div className="p-4 lg:p-6">
            <div className="mb-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search Category by name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        Add Category
                    </button>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Category Name</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Descriptions</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredCategories.map((category) => (
                                    <tr key={category.id} className="hover:bg-accent/50 transition-colors">
                                        <td className="px-4 py-3.5">{category.name}</td>
                                        <td className="px-4 py-3.5 text-sm text-muted-foreground">{category.description ? category.description : '-'}</td>

                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewVendor(category)}
                                                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                    {filteredCategories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-card rounded-xl p-4 border border-border shadow-sm"
                        >
                            <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-foreground">{category.name}</h3>

                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Notebook className="w-4 h-4" />
                                        <span>{category.description}</span>
                                    </div>

                                </div>



                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => handleViewVendor(category)}
                                        className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCategories.length === 0 && (
                    <div className="bg-card rounded-xl p-12 text-center border border-border">
                        <p className="text-muted-foreground">No categories found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Add Vendor Modal */}
            <AddCategoryModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddCategory}
                isSaving={isCreating}
            />
            <DetailEditCategoryModal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                category={selectedCategory}
            />
        </div>
    );
}