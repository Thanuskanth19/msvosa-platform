
import React, { useState } from 'react';
import { MerchandiseItem, CartItem } from '../types';
import { ShoppingCart, Plus, Minus, X, CheckCircle, Loader2 } from 'lucide-react';
import { db } from '../services/database';

interface ShopProps {
  items: MerchandiseItem[];
}

export const Shop: React.FC<ShopProps> = ({ items }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Checkout Form State
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const addToCart = (product: MerchandiseItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await db.addOrder({
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        items: cart,
        totalAmount: cartTotal,
        status: 'Pending',
        date: new Date().toLocaleDateString()
      });

      setOrderComplete(true);
      setCart([]);
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
        <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-serif">MSVOSA Store</h2>
            <p className="text-gray-500 mt-1">Wear your pride. Proceeds support the Scholarship Fund.</p>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-school-900 text-white p-3 rounded-full relative hover:bg-school-800 transition-all shadow-md"
        >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-school-gold text-school-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((product) => (
          <div key={product.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden h-64 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900 shadow">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <p className="text-xs text-school-gold font-bold uppercase tracking-wide mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                    {product.name}
                </h3>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-school-900 text-white hover:bg-school-800 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                 <Plus className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Cart Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-school-900" /> Your Cart
              </h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p>Your cart is empty.</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-school-900 font-medium underline">Start Shopping</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                      <p className="text-gray-500 text-sm">${item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-school-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 mt-4 underline">Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-school-900">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckingOut(true); }}
                  className="w-full bg-school-900 text-white py-3 rounded-lg font-bold hover:bg-school-800"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
            {!orderComplete ? (
              <form onSubmit={handleCheckout} className="p-6">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                   <h3 className="text-xl font-bold font-serif">Order Details</h3>
                   <button type="button" onClick={() => setIsCheckingOut(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      required 
                      className="w-full border p-2 rounded focus:ring-school-900 focus:border-school-900"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      required 
                      type="email"
                      className="w-full border p-2 rounded focus:ring-school-900 focus:border-school-900"
                      value={customerInfo.email}
                      onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      required 
                      className="w-full border p-2 rounded focus:ring-school-900 focus:border-school-900"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="+1 234 567 890"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                   <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Items ({cartCount})</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-school-900 border-t border-gray-200 pt-2">
                      <span>Total to Pay</span>
                      <span>${cartTotal.toFixed(2)}</span>
                   </div>
                   <p className="text-xs text-gray-400 mt-2 text-center">
                     * This is a purchase request. Payment details will be sent to your email.
                   </p>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-school-900 text-white py-3 rounded-lg font-bold hover:bg-school-800 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Place Order'}
                </button>
              </form>
            ) : (
              <div className="p-8 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Received!</h3>
                 <p className="text-gray-500 mb-6">
                   Thank you, {customerInfo.name}. Your order request has been sent to the association administration. We will contact you at {customerInfo.email} shortly.
                 </p>
                 <button 
                   onClick={() => { setIsCheckingOut(false); setOrderComplete(false); }}
                   className="bg-school-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-school-800"
                 >
                   Return to Shop
                 </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
