"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { StoreService } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shipping, total, appliedCoupon, clearCart } = useCart();
  const { user, addresses } = useAuth();

  // Form Fields
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [addressLine, setAddressLine] = useState("");
  const [apartmentSuite, setApartmentSuite] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [postalCode, setPostalCode] = useState("400018");
  const [country, setCountry] = useState("India");

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-fill from user profile or default address if available
  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.fullName || "");
      if (!email) setEmail(user.email || "");
      if (!phone && user.phone) setPhone(user.phone);
    }
    if (addresses && addresses.length > 0) {
      const def = addresses.find((a) => a.isDefault) || addresses[0];
      setAddressLine(def.addressLine);
      setApartmentSuite(def.apartmentSuite || "");
      setCity(def.city);
      setState(def.state);
      setPostalCode(def.postalCode);
      setCountry(def.country);
    } else if (!addressLine) {
      setAddressLine("Apt 14B, Oberoi Sky Heights, Worli");
    }
  }, [user, addresses]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  if (items.length === 0) return null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate inputs
    if (!fullName.trim() || !email.trim() || !phone.trim() || !addressLine.trim() || !city.trim() || !postalCode.trim()) {
      setErrorMsg("Please provide all required customer and delivery address fields.");
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "razorpay") {
        // Step 1: Call server route to create Razorpay Order
        const res = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total, currency: "INR" }),
        });
        const rzpData = await res.json();

        // Step 2: Verify signature
        const verifyRes = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: rzpData.orderId,
            razorpay_payment_id: `pay_test_${Date.now()}`,
            razorpay_signature: `test_sig_${Date.now()}`,
          }),
        });
        const verifyData = await verifyRes.json();

        if (!verifyData.verified) {
          throw new Error("Payment signature verification failed.");
        }

        // Step 3: Record Order in store
        const newOrder = StoreService.createOrder({
          userId: user?.id || null,
          customerName: fullName,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: {
            addressLine,
            apartmentSuite,
            city,
            state,
            postalCode,
            country,
          },
          subtotal,
          discount,
          shippingCost: shipping,
          totalAmount: total,
          paymentMethod: "razorpay",
          paymentStatus: "paid",
          orderStatus: "confirmed",
          trackingNumber: `VEL-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
          trackingCarrier: "Velora White Glove Express",
          items: items.map((i) => ({
            id: `item-${Date.now()}-${Math.random()}`,
            productId: i.productId,
            productName: i.name,
            price: i.price,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
            imageUrl: i.imageUrl,
          })),
        });

        clearCart();
        router.push(`/order-confirmation/${newOrder.id}`);
      } else {
        // Cash on Delivery
        const newOrder = StoreService.createOrder({
          userId: user?.id || null,
          customerName: fullName,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: {
            addressLine,
            apartmentSuite,
            city,
            state,
            postalCode,
            country,
          },
          subtotal,
          discount,
          shippingCost: shipping,
          totalAmount: total,
          paymentMethod: "cod",
          paymentStatus: "pending",
          orderStatus: "confirmed",
          trackingNumber: `VEL-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
          trackingCarrier: "Velora White Glove Express",
          items: items.map((i) => ({
            id: `item-${Date.now()}-${Math.random()}`,
            productId: i.productId,
            productName: i.name,
            price: i.price,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
            imageUrl: i.imageUrl,
          })),
        });

        clearCart();
        router.push(`/order-confirmation/${newOrder.id}`);
      }
    } catch (err: any) {
      console.error("Checkout submission failed", err);
      setErrorMsg(err.message || "An unexpected error occurred during order confirmation.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-[#DED8CF] pb-6 flex items-baseline justify-between">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Concierge Checkout
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-1">
            Complete Your Consignment
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-wider text-[#77716A]">
          <Lock className="w-3.5 h-3.5 text-[#9B8065]" />
          <span>Encrypted Gateway</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Customer Info, Shipping Address & Payment Selection */}
        <div className="lg:col-span-7 space-y-10">
          {/* Section 1: Customer Identification */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-6">
            <h3 className="font-editorial text-xl text-[#171717] flex items-center justify-between">
              <span>1. Client Information</span>
              {!user && (
                <Link
                  href="/login?redirect=/checkout"
                  className="text-xs font-sans uppercase tracking-wider text-[#9B8065] hover:underline"
                >
                  Sign In for Fast Checkout
                </Link>
              )}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Email Address (for order tracking) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Mobile Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-6">
            <h3 className="font-editorial text-xl text-[#171717]">2. White Glove Delivery Address</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Street Address & Building *
                </label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Apt 14B, Oberoi Sky Heights, Worli"
                  className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  value={apartmentSuite}
                  onChange={(e) => setApartmentSuite(e.target.value)}
                  placeholder="Tower A, Penthouse 2"
                  className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Maharashtra"
                    className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                    PIN / Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="400018"
                    className="w-full bg-white border border-[#DED8CF] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#9B8065]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#171717] mb-1 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  disabled
                  value={country}
                  className="w-full bg-[#EFE9DE] border border-[#DED8CF] p-3 text-xs text-[#77716A]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Options */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-6">
            <h3 className="font-editorial text-xl text-[#171717]">3. Payment Method</h3>

            <div className="space-y-3">
              {/* Option 1: Razorpay */}
              <label
                className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  paymentMethod === "razorpay"
                    ? "border-[#171717] bg-white ring-1 ring-[#171717]"
                    : "border-[#DED8CF] bg-[#FAF7F2] hover:border-[#9B8065]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="mt-1 accent-[#171717]"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#171717] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#9B8065]" />
                      Online Payment (Razorpay Test Mode)
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-[#9B8065]/10 text-[#9B8065] px-2 py-0.5 rounded font-semibold">
                      Instant Confirmation
                    </span>
                  </div>
                  <p className="text-xs text-[#77716A] font-light">
                    Pay securely using Credit / Debit Card, UPI (Google Pay, PhonePe), or Netbanking.
                  </p>
                </div>
              </label>

              {/* Option 2: Cash on Delivery */}
              <label
                className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-[#171717] bg-white ring-1 ring-[#171717]"
                    : "border-[#DED8CF] bg-[#FAF7F2] hover:border-[#9B8065]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 accent-[#171717]"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#171717] flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#9B8065]" />
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] uppercase tracking-wider bg-gray-200 text-[#171717] px-2 py-0.5 rounded font-semibold">
                      Pay at Doorstep
                    </span>
                  </div>
                  <p className="text-xs text-[#77716A] font-light">
                    Hand over payment in cash or via handheld UPI QR code upon arrival of our courier.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-[#FAF7F2] p-6 sm:p-8 border border-[#DED8CF] space-y-6">
          <h3 className="font-editorial text-xl text-[#171717]">Review Consignment</h3>

          {/* Items Preview */}
          <div className="divide-y divide-[#DED8CF]/80 max-h-80 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <div className="relative w-14 h-18 bg-[#EAE4D9] flex-shrink-0 border border-[#DED8CF]">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#171717] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 text-xs space-y-0.5">
                  <h4 className="font-editorial text-sm text-[#171717] line-clamp-1">{item.name}</h4>
                  <p className="text-[#77716A]">{item.size} / {item.color}</p>
                </div>
                <span className="text-xs font-semibold text-[#171717]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-[#77716A] pt-4 border-t border-[#DED8CF]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#171717] font-medium">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#9B8065]">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>White Glove Shipping</span>
              <span className="text-[#171717] font-medium">
                {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold text-[#171717] pt-3 border-t border-[#DED8CF]">
              <span>Final Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Confirmation Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full btn-primary py-4 text-xs flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>Authenticating Consignment...</span>
            ) : (
              <>
                <span>
                  {paymentMethod === "razorpay" ? "Authorize & Confirm Order" : "Place COD Consignment"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <div className="space-y-2 pt-2 text-[10px] tracking-wider uppercase text-[#77716A] text-center">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#9B8065]" />
              <span>Complimentary insured shipping with archival boxing</span>
            </div>
            <p>14-Day In-Person Courier Returns & Exchange Guarantee</p>
          </div>
        </div>
      </form>
    </div>
  );
}

