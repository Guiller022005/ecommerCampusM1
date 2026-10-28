import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { createOrder } from '../lib/supabase';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shippingFee,
    totalAmount,
    totalItems,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('Visa ending in 2143');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ id: string } | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    try {
      const res = await createOrder(cart, totalAmount, shippingFee, paymentMethod);
      if (res.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'],
        });

        setCompletedOrder({ id: res.orderId });
        clearCart();
      }
    } catch (e) {
      console.error('Order error:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <ShoppingBag size={22} />
            <h2>Your Shopping Bag</h2>
            <span className="drawer-badge">{totalItems} items</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => {
              setIsCartOpen(false);
              setCompletedOrder(null);
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Order Completed Success View */}
        {completedOrder ? (
          <div className="order-success-view">
            <CheckCircle size={64} className="success-icon" />
            <h3>Order Confirmed!</h3>
            <p className="order-message">
              Thank you for shopping with Campus Store. Your order has been placed successfully in the database.
            </p>
            <div className="order-id-box">
              <span>Order Reference</span>
              <strong>#{completedOrder.id}</strong>
            </div>
            <button
              type="button"
              className="btn-continue-shopping"
              onClick={() => {
                setCompletedOrder(null);
                setIsCartOpen(false);
              }}
            >
              <span>Continue Shopping</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="drawer-empty-view">
            <div className="empty-cart-icon">🛍️</div>
            <h3>Your bag is empty</h3>
            <p>Explore our curated collection and add your favorite items to the cart.</p>
            <button
              type="button"
              className="btn-continue-shopping"
              onClick={() => setIsCartOpen(false)}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Cart Items & Checkout */
          <>
            <div className="drawer-items-list">
              {cart.map((item) => (
                <div key={item.product.id} className="drawer-item">
                  <div className="item-thumb">
                    <img src={item.product.main_photo} alt={item.product.title} />
                  </div>
                  <div className="item-details">
                    <h4 className="item-title">{item.product.title}</h4>
                    <div className="item-meta">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && (
                        <span className="color-indicator">
                          Color:{' '}
                          <span
                            className="color-dot"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </span>
                      )}
                    </div>
                    <span className="item-unit-price">${item.product.price.toFixed(2)}</span>
                  </div>

                  <div className="item-controls">
                    <button
                      type="button"
                      className="item-delete-btn"
                      onClick={() => removeFromCart(item.product.id)}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="item-stepper">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="stepper-qty">{item.quantity}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment & Summary Footer */}
            <div className="drawer-footer">
              {/* Payment Method Selector */}
              <div className="payment-select-row">
                <CreditCard size={18} />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-select"
                >
                  <option value="Visa ending in 2143">Visa ending in 2143</option>
                  <option value="Mastercard ending in 8890">Mastercard ending in 8890</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="final-total-amount">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                className="checkout-submit-btn"
                disabled={isProcessing}
                onClick={handleCheckout}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-inline" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay with Confidence</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};
