"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Phone, ShoppingBag } from "lucide-react";
import { StoreService } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function AdminCustomersPage() {
  const orders = StoreService.getOrders();
  const [search, setSearch] = useState("");

  // Aggregate customer accounts from orders
  const customerMap: Record<
    string,
    { name: string; email: string; phone: string; totalSpent: number; orderCount: number; city: string }
  > = {};

  orders.forEach((o) => {
    const key = o.customerEmail.toLowerCase();
    if (!customerMap[key]) {
      customerMap[key] = {
        name: o.customerName,
        email: o.customerEmail,
        phone: o.customerPhone,
        totalSpent: 0,
        orderCount: 0,
        city: o.shippingAddress.city,
      };
    }
    customerMap[key].totalSpent += o.totalAmount;
    customerMap[key].orderCount += 1;
  });

  const customerList = Object.values(customerMap);

  const filtered = customerList.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9B8065] font-semibold">
            Client Registry
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] mt-0.5">
            Registered Patrons & Clients ({customerList.length})
          </h1>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#77716A] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patron by name, email..."
            className="w-full bg-[#FAF7F2] border border-[#DED8CF] pl-9 pr-3 py-2 text-xs text-[#171717] focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-[#FAF7F2] border border-[#DED8CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DED8CF] bg-[#EFE9DE]/50 text-[#77716A] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Patron Name</th>
                <th className="py-3 px-4">Email Coordinates</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Consignments</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4 text-right">Privilege Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CF]/60 text-[#171717]">
              {filtered.map((cust) => (
                <tr key={cust.email} className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-sm">
                    {cust.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#77716A]">
                    {cust.email}
                  </td>
                  <td className="py-3.5 px-4 text-[#77716A]">
                    {cust.phone}
                  </td>
                  <td className="py-3.5 px-4 text-[#77716A]">
                    {cust.city}
                  </td>
                  <td className="py-3.5 px-4 font-medium">
                    {cust.orderCount} orders
                  </td>
                  <td className="py-3.5 px-4 font-semibold">
                    {formatPrice(cust.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-block bg-[#9B8065]/10 text-[#9B8065] font-semibold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                      VIP Circle
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

