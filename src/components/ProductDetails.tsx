import React from 'react';
import { X, Package, Tag, ShoppingCart, AlertCircle, Link as LinkIcon } from 'lucide-react';

interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    permalink: string;
    price: string;
    regular_price: string;
    sale_price: string;
    status: string;
    stock_status: string;
    description: string;
    short_description: string;
    sku: string;
    categories: Array<{
      id: number;
      name: string;
    }>;
    images: Array<{
      id: number;
      src: string;
      alt: string;
    }>;
    store?: {
      id: string;
      name: string;
      url: string;
    };
    attributes?: Array<{
      id: number;
      name: string;
      options: string[];
    }>;
  };
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get the full product URL
  const getProductUrl = () => {
    if (product.permalink && product.store?.url) {
      // If the permalink is a full URL, use it directly
      if (product.permalink.startsWith('http')) {
        return product.permalink;
      }
      // Otherwise, combine the store URL with the permalink
      const storeUrl = product.store.url.replace(/\/$/, '');
      const productPath = product.permalink.startsWith('/') ? product.permalink : `/${product.permalink}`;
      return `${storeUrl}${productPath}`;
    }
    return null;
  };

  const productUrl = getProductUrl();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto my-8">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
            {productUrl && (
              <a
                href={productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                View Product
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Rest of the component remains the same */}
        {/* ... */}
      </div>
    </div>
  );
};

export default ProductDetails;