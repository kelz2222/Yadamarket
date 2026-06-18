export const PAYMENT_COUNTRIES = {
  GH: {
    name: "Ghana",
    currency: "GHS",
    symbol: "₵",
    methods: [
      { id: "mtn_momo",   label: "MTN Mobile Money", icon: "📱", type: "mobile_money", requiresPhone: true },
      { id: "vodafone",   label: "Vodafone Cash",     icon: "📲", type: "mobile_money", requiresPhone: true },
      { id: "airteltigo", label: "AirtelTigo Money",  icon: "📡", type: "mobile_money", requiresPhone: true },
      { id: "card",       label: "Visa / Mastercard", icon: "💳", type: "card",         requiresPhone: false },
    ],
  },
  NG: {
    name: "Nigeria",
    currency: "NGN",
    symbol: "₦",
    methods: [
      { id: "opay",        label: "OPay",             icon: "🔵", type: "mobile_money", requiresPhone: true },
      { id: "flutterwave", label: "Flutterwave",      icon: "🟠", type: "gateway",      requiresPhone: false },
      { id: "paystack",    label: "Paystack",         icon: "🟢", type: "gateway",      requiresPhone: false },
      { id: "bank",        label: "Bank Transfer",    icon: "🏦", type: "bank",         requiresPhone: false },
      { id: "card",        label: "Visa / Mastercard",icon: "💳", type: "card",         requiresPhone: false },
    ],
  },
};

export function generateRef() {
  return "YDA-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}
