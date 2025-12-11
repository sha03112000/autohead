import { useState } from 'react';
import { Search, Plus, Edit, Eye, Phone, Mail } from 'lucide-react';
import { AddEditVendorModal } from '../components/vendors/AddEditVendorModal';
import { VendorDetailModal } from '../components/vendors/VendorDetailsModal';


const mockVendors = [
  {
    id: 1,
    name: 'AutoParts Pro',
    contact: '+91 98765 43210',
    email: 'contact@autopartspro.com',
    productsSupplied: 234,
    pendingReturns: 3,
    lastTransaction: '2 days ago',
    status: 'active',
  },
  {
    id: 2,
    name: 'BrightAuto Ltd',
    contact: '+91 98765 43211',
    email: 'sales@brightauto.com',
    productsSupplied: 156,
    pendingReturns: 0,
    lastTransaction: '1 week ago',
    status: 'active',
  },
  {
    id: 3,
    name: 'ShieldCar Inc',
    contact: '+91 98765 43212',
    email: 'info@shieldcar.com',
    productsSupplied: 89,
    pendingReturns: 2,
    lastTransaction: '3 days ago',
    status: 'active',
  },
  {
    id: 4,
    name: 'TechDrive Co',
    contact: '+91 98765 43213',
    email: 'support@techdrive.com',
    productsSupplied: 312,
    pendingReturns: 5,
    lastTransaction: '1 day ago',
    status: 'active',
  },
  {
    id: 5,
    name: 'SafeView Systems',
    contact: '+91 98765 43214',
    email: 'hello@safeview.com',
    productsSupplied: 178,
    pendingReturns: 1,
    lastTransaction: '4 days ago',
    status: 'active',
  },
  {
    id: 6,
    name: 'LuxuryAuto',
    contact: '+91 98765 43215',
    email: 'contact@luxuryauto.com',
    productsSupplied: 95,
    pendingReturns: 0,
    lastTransaction: '2 weeks ago',
    status: 'active',
  },
  {
    id: 7,
    name: 'SafetyFirst Ltd',
    contact: '+91 98765 43216',
    email: 'info@safetyfirst.com',
    productsSupplied: 267,
    pendingReturns: 4,
    lastTransaction: '5 days ago',
    status: 'active',
  },
];


export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);



  const filteredVendors = mockVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVendor = (vendorData: any) => {
    console.log('New vendor:', vendorData);
    alert('Vendor added successfully!');
  };

  const handleViewVendor = (vendor: any) => {
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
                  <th className="px-4 py-3 text-left text-sm text-muted-foreground">Last Transaction</th>
                  <th className="px-4 py-3 text-left text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-accent/50 transition-colors">
                    <td className="px-4 py-3.5">{vendor.name}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{vendor.contact}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{vendor.email}</td>
                    <td className="px-4 py-3.5 text-center">{vendor.productsSupplied}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`${vendor.pendingReturns > 0 ? 'text-amber-600' : 'text-green-600'
                          }`}
                      >
                        {vendor.pendingReturns}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">
                      {vendor.lastTransaction}
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
                    {vendor.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{vendor.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{vendor.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Products</p>
                    <p className="mt-1">{vendor.productsSupplied}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Returns</p>
                    <p
                      className={`mt-1 ${vendor.pendingReturns > 0 ? 'text-amber-600' : 'text-green-600'
                        }`}
                    >
                      {vendor.pendingReturns}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Last Txn</p>
                    <p className="mt-1 text-xs">{vendor.lastTransaction}</p>
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

      {/* Add Vendor Modal */}
       <AddEditVendorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddVendor}
      />
      <VendorDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        vendor={selectedVendor}
      />
    </div>
  );
}