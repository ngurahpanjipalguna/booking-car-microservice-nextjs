"use client";
import OrderCard from "@/components/fragments/card/customer/order-card";
import Button from "@/components/ui/button/button";
import LogoutButton from "@/components/ui/button/logout-button";
import SpinnerLoading from "@/components/ui/loading/spinner-loading";
import ErrorText from "@/components/ui/text/error-text";
import { useGetOrderList } from "@/features/order/use-get-order-list";
import Link from "next/link";
import { ShoppingBag, Plus, Package } from "lucide-react"; // Add icons for better visual

export default function ListOrderPage() {
  const { data, isLoading, error } = useGetOrderList();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and track all your orders here
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* Action Button Section */}
        <div className="flex justify-end">
          <Link href="/customer/create" className="w-full md:w-auto">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 w-full md:w-auto flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Order
            </Button>
          </Link>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <SpinnerLoading />
              <p className="mt-4 text-gray-500">Loading your orders...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-red-50 rounded-full p-4 mb-4">
                <Package className="w-12 h-12 text-red-500" />
              </div>
              <ErrorText message={error.message} />
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && data?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <Package className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Start by creating your first order!
              </p>
              <Link href="/customer/create">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg">
                  Create Order
                </Button>
              </Link>
            </div>
          )}

          {!isLoading && !error && data && data.length > 0 && (
            <div className="divide-y divide-gray-100">
              {data.map((order, index) => (
                <div 
                  key={order.id} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats (optional) */}
        {!isLoading && !error && data && data.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Showing <span className="font-semibold text-gray-800">{data.length}</span> order{data.length !== 1 ? 's' : ''} • 
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}