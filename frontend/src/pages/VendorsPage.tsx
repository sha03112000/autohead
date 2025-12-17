import { useState } from 'react';
import { Search, Plus, Edit, Eye, Phone, Mail } from 'lucide-react';
import { AddEditVendorModal } from '../components/vendors/AddEditVendorModal';
import { VendorDetailModal } from '../components/vendors/VendorDetailsModal';
import { useVendorData } from '../hooks/vendor';
import IsLoadingDisplay from '../components/common/IsLoadingDisplay';
import IsErrorDisplay from '../components/common/IsErrorDisplay';
import Pagination from '../components/common/Pagination';
import type { FlatVendorForm } from '../utils/vendorPayLoad';
import type { VendorResponse } from '../types/vendor';
import { mapVendorFormToPayload } from '../utils/vendorPayLoad';
import { toast } from 'react-toastify';






export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [page, setPage] = useState(1);


  const {
    data, isLoading, isError,
    createVendor, isCreating
  } = useVendorData(page);


  const vendors = data?.results ?? [];
  const total_pages = data?.total_pages ?? 0;
  const current_page = data?.current_page ?? 0;


 


  if (isLoading) return <IsLoadingDisplay />;
  if (isError) return <IsErrorDisplay type='Vendor' />;




  const filteredVendors = vendors.filter(
    (vd) =>
      vd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vd.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVendor = async(vendorData: FlatVendorForm) => {
    try {
      await createVendor(mapVendorFormToPayload(vendorData)).unwrap();
      toast.success('Vendor added successfully', { autoClose: 2000 });
    } catch (err: any) {
      const errorMessage =
        err?.data?.errors?.name?.[0] ||
        err?.data?.errors?.email?.[0] ||
        'Failed to add vendor. Please try again.';
      toast.error(errorMessage, { autoClose: 2000 });

      throw err;
    }
  };

  const handleViewVendor = (vendor: VendorResponse) => {
    setSelectedVendor(vendor);
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
              placeholder="Search vendors by name or email..."
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
            Add Vendor
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-muted-foreground">Vendor Name</th>
                  <th className="px-4 py-3 text-left text-sm text-muted-foreground">Contact</th>
                  <th className="px-4 py-3 text-left text-sm text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-sm text-muted-foreground">Products Supplied</th>
                  <th className="px-4 py-3 text-left text-sm text-muted-foreground">Pending Returns</th>

                  <th className="px-4 py-3 text-left text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-accent/50 transition-colors">
                    <td className="px-4 py-3.5">{vendor.name}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{vendor.phone}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{vendor.email}</td>
                    <td className="px-4 py-3.5 text-center">{vendor.address}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`${vendor.phone > 0 ? 'text-amber-600' : 'text-green-600'
                          }`}
                      >
                        {vendor.phone}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewVendor(vendor)}
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
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-card rounded-xl p-4 border border-border shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-foreground">{vendor.name}</h3>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs">
                    {vendor.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{vendor.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Products</p>
                    <p className="mt-1">{vendor.phone}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Returns</p>
                    <p
                      className={`mt-1 ${vendor.phone > 0 ? 'text-amber-600' : 'text-green-600'
                        }`}
                    >
                      {vendor.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleViewVendor(vendor)}
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

        {filteredVendors.length === 0 && (
          <div className="bg-card rounded-xl p-12 text-center border border-border">
            <p className="text-muted-foreground">No vendors found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={current_page}
        totalPages={total_pages}
        onPageChange={setPage}
        onShowLess={() => setPage(1)} // ✅ reset to first page
        isLoading={isLoading && page > 1}
      />


      {/* Add Vendor Modal */}
      <AddEditVendorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddVendor}
        isSaving={isCreating}
        mode="add"
      />

      <VendorDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        vendor={selectedVendor}
      />
    </div>
  );
}