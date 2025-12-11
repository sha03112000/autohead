import { Modal } from '../Modal';
import { 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  CreditCard,
  TrendingUp,
  AlertCircle,
  Calendar,
  FileText
} from 'lucide-react';

interface Vendor {
  id: number;
  name: string;
  contact: string;
  email: string;
  productsSupplied: number;
  pendingReturns: number;
  lastTransaction: string;
  status: string;
  address?: string;
  gstin?: string;
  contactPerson?: string;
}

interface VendorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor | null;
}

export function VendorDetailModal({ isOpen, onClose, vendor }: VendorDetailModalProps) {
  if (!vendor) return null;

  // Mock data for demonstration
  const totalPurchaseValue = 2340000;
  const outstandingBalance = 145000;
  const recentTransactions = [
    { id: 1, date: '2024-12-08', type: 'Purchase', amount: 45000, invoice: 'PO-1234' },
    { id: 2, date: '2024-12-05', type: 'Payment', amount: -30000, invoice: 'PAY-456' },
    { id: 3, date: '2024-12-01', type: 'Purchase', amount: 67000, invoice: 'PO-1230' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vendor Details" size="lg">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between pb-5 border-b border-border">
          <div>
            <h3 className="text-foreground mb-2">{vendor.name}</h3>
            <div className="space-y-1.5 text-sm">
              {vendor.contactPerson && (
                <p className="text-muted-foreground">Contact: {vendor.contactPerson}</p>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{vendor.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{vendor.email}</span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm capitalize">
            {vendor.status}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="text-blue-600">{vendor.productsSupplied}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-purple-600">₹{(totalPurchaseValue / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </div>

          <div className={`${vendor.pendingReturns > 0 ? 'bg-amber-50' : 'bg-green-50'} rounded-xl p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${vendor.pendingReturns > 0 ? 'bg-amber-100' : 'bg-green-100'} rounded-lg`}>
                <AlertCircle className={`w-5 h-5 ${vendor.pendingReturns > 0 ? 'text-amber-600' : 'text-green-600'}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Returns</p>
                <p className={vendor.pendingReturns > 0 ? 'text-amber-600' : 'text-green-600'}>
                  {vendor.pendingReturns}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Txn</p>
                <p className="text-orange-600 text-sm">{vendor.lastTransaction}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Information */}
        <div className="space-y-4">
          <h4>Vendor Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Outstanding Balance */}
            <div className="bg-accent/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Outstanding Balance</p>
              </div>
              <p className="text-destructive">₹{outstandingBalance.toLocaleString()}</p>
            </div>

            {/* Credit Period */}
            <div className="bg-accent/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Credit Period</p>
              <p>30 days</p>
            </div>

            {/* GST Number */}
            {vendor.gstin && (
              <div className="bg-accent/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">GST Number</p>
                </div>
                <p className="text-sm">{vendor.gstin}</p>
              </div>
            )}

            {/* Address */}
            {vendor.address && (
              <div className="bg-accent/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Address</p>
                </div>
                <p className="text-sm">{vendor.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="pt-5 border-t border-border">
          <h4 className="mb-4">Recent Transactions</h4>
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-accent/50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      transaction.type === 'Purchase' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {transaction.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{transaction.invoice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <p className={`${
                  transaction.amount > 0 ? 'text-destructive' : 'text-green-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products from Vendor */}
        <div className="pt-5 border-t border-border">
          <h4 className="mb-4">Top Products from Vendor</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-accent/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">LED Headlight Kit</p>
              <p>156 units</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Premium Floor Mats</p>
              <p>234 units</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Steering Wheel Cover</p>
              <p>189 units</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-border">
          <button className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Edit Vendor
          </button>
          <button className="flex-1 px-4 py-2.5 border border-border rounded-lg hover:bg-accent transition-colors">
            View All Transactions
          </button>
          <button className="flex-1 px-4 py-2.5 border border-border rounded-lg hover:bg-accent transition-colors">
            Record Payment
          </button>
        </div>
      </div>
    </Modal>
  );
}
