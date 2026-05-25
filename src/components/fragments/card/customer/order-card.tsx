import Button from "@/components/ui/button/button";
import Link from "next/link";
import { useDeleteOrder } from "@/features/order/use-delete-order";
import { IOrder } from "@/types/order.types";
import { 
  MapPin, 
  Navigation, 
  Package, 
  User, 
  Clock,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Truck
} from "lucide-react";

interface IOrderCardProps {
  order: IOrder;
}

export default function OrderCard({ order }: IOrderCardProps) {
  const { handleDelete, isLoading } = useDeleteOrder();

  // Helper function untuk menentukan warna status
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return statusColors[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Helper function untuk icon status
  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "cancelled":
        return <AlertCircle className="w-3 h-3" />;
      case "shipped":
        return <Truck className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  // Format ID untuk display (karena ID bisa number atau string)
  const formatOrderId = (id: number | string): string => {
    if (typeof id === 'number') {
      return `#${id.toString().slice(-8)}`;
    }
    return `#${id.slice(-8)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header dengan gradient */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-mono text-gray-600">
              Order {formatOrderId(order.id)}
            </p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span>{order.status || "Pending"}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Customer Info */}
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <div className="bg-gray-100 p-1.5 rounded-full">
            <User className="w-3 h-3 text-gray-600" />
          </div>
          <p className="text-sm font-medium text-gray-700">
            Customer: <span className="text-gray-900">{order.customerId}</span>
          </p>
        </div>

        {/* Pickup Location */}
        <div className="flex items-start gap-3 group">
          <div className="flex-shrink-0">
            <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors duration-200">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pickup Location</p>
            <p className="text-sm text-gray-800 font-medium mt-0.5">{order.pickup}</p>
          </div>
        </div>

        {/* Connecting Line dengan Arrow */}
        <div className="relative flex justify-center -my-1">
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
            <div className="w-px h-6 bg-gray-300"></div>
          </div>
          <div className="bg-gray-100 rounded-full p-1.5 z-10 shadow-sm">
            <Navigation className="w-3 h-3 text-gray-500 rotate-90" />
          </div>
        </div>

        {/* Destination Location */}
        <div className="flex items-start gap-3 group">
          <div className="flex-shrink-0">
            <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination Location</p>
            <p className="text-sm text-gray-800 font-medium mt-0.5">{order.destination}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex gap-2">
          <Link href={`/customer/order/${order.id}`} className="flex-1">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm py-2 rounded-lg w-full flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow">
              <Eye className="w-4 h-4" />
              Detail
            </Button>
          </Link>
          <Link href={`/customer/edit/${order.id}`} className="flex-1">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm py-2 rounded-lg w-full flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </Link>
          <Button
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm py-2 rounded-lg flex-1 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
                handleDelete(order.id);
              }
            }}
            disabled={isLoading}
          >
            <Trash2 className="w-4 h-4" />
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}