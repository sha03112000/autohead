import { useState } from 'react';
import { Search, Plus, Edit, Eye, Filter } from 'lucide-react';
import { AddEditProductModal } from '../components/products/AddEditProductModal';
import { ProductDetailModal } from '../components/products/ProductsDetailsModal';


const mockProducts = [
    {
        id: 1,
        name: 'Premium Floor Mats',
        sku: 'ACC-001',
        category: 'Interior',
        vendor: 'AutoParts Pro',
        stock: 45,
        costPrice: 850,
        sellingPrice: 1200,
    },
    {
        id: 2,
        name: 'LED Headlight Kit',
        sku: 'ACC-045',
        category: 'Lighting',
        vendor: 'BrightAuto Ltd',
        stock: 23,
        costPrice: 2500,
        sellingPrice: 3500,
    },
    {
        id: 3,
        name: 'Car Cover Waterproof',
        sku: 'ACC-089',
        category: 'Exterior',
        vendor: 'ShieldCar Inc',
        stock: 18,
        costPrice: 1200,
        sellingPrice: 1800,
    },
    {
        id: 4,
        name: 'Phone Mount Magnetic',
        sku: 'ACC-112',
        category: 'Electronics',
        vendor: 'TechDrive Co',
        stock: 67,
        costPrice: 450,
        sellingPrice: 750,
    },
    {
        id: 5,
        name: 'Dash Camera HD',
        sku: 'ACC-156',
        category: 'Electronics',
        vendor: 'SafeView Systems',
        stock: 31,
        costPrice: 3200,
        sellingPrice: 4500,
    },
    {
        id: 6,
        name: 'Seat Covers Leather',
        sku: 'ACC-201',
        category: 'Interior',
        vendor: 'LuxuryAuto',
        stock: 12,
        costPrice: 4500,
        sellingPrice: 6500,
    },
    {
        id: 7,
        name: 'Tire Pressure Monitor',
        sku: 'ACC-267',
        category: 'Safety',
        vendor: 'SafetyFirst Ltd',
        stock: 54,
        costPrice: 1800,
        sellingPrice: 2500,
    },
    {
        id: 8,
        name: 'Steering Wheel Cover',
        sku: 'ACC-298',
        category: 'Interior',
        vendor: 'AutoParts Pro',
        stock: 89,
        costPrice: 350,
        sellingPrice: 550,
    },
];


export default function ProductsPage() {
    const [products, setProducts] = useState(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);



    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', ...Array.from(new Set(mockProducts.map((p) => p.category)))];

    const handleAddProduct = (productData: any) => {
        console.log('New product:', productData);
        alert('Product added successfully!');
    };


    const handleViewProduct = (product: any) => {
        setSelectedProduct(product);
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
                            placeholder="Search products by name or SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Add Product</span>
                        </button>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Product Name</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">SKU</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Category</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Vendor</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Stock Qty</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Cost Price</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Selling Price</th>
                                    <th className="px-4 py-3 text-left text-sm text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-accent/50 transition-colors">
                                        <td className="px-4 py-3.5">{product.name}</td>
                                        <td className="px-4 py-3.5 text-sm text-muted-foreground">{product.sku}</td>
                                        <td className="px-4 py-3.5">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-sm">{product.vendor}</td>
                                        <td className="px-4 py-3.5">
                                            <span
                                                className={`${product.stock < 20 ? 'text-amber-600' : 'text-green-600'
                                                    }`}
                                            >
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-sm">₹{product.costPrice.toLocaleString()}</td>
                                        <td className="px-4 py-3.5">₹{product.sellingPrice.toLocaleString()}</td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewProduct(product)}
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
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-card rounded-xl p-4 border border-border shadow-sm"
                        >
                            <div className="space-y-3">
                                <h3 className="text-foreground">{product.name}</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">SKU:</span>
                                        <p className="mt-0.5">{product.sku}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Stock:</span>
                                        <p
                                            className={`mt-0.5 ${product.stock < 20 ? 'text-amber-600' : 'text-green-600'
                                                }`}
                                        >
                                            {product.stock} units
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Category:</span>
                                        <p className="mt-0.5">
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                                                {product.category}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Vendor:</span>
                                        <p className="mt-0.5">{product.vendor}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Cost:</span>
                                        <p className="mt-0.5">₹{product.costPrice.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Selling:</span>
                                        <p className="mt-0.5">₹{product.sellingPrice.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => handleViewProduct(product)}
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

                {filteredProducts.length === 0 && (
                    <div className="bg-card rounded-xl p-12 text-center border border-border">
                        <p className="text-muted-foreground">No products found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Floating Add Button (Mobile) */}
            <button
                onClick={() => setShowAddModal(true)}
                className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-110"
            >
                <Plus className="w-6 h-6" />
            </button>


            <AddEditProductModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddProduct}
            />

            <ProductDetailModal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                product={selectedProduct}
            />

        </div>
    );
}