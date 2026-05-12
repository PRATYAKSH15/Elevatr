"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    title: "Free",
    price: "₹0",
    period: "forever",
    desc: "Get started with the essential AI tools at no cost.",
    features: [
      "10 AI generations per day",
      "Resume analyzer",
      "Job role matcher",
      "Community support",
      "Standard response speed",
    ],
    button: "Get Started",
    href: "/dashboard",
    highlighted: false,
  },
  {
    title: "Pro",
    price: "₹299",
    period: "per month",
    desc: "Unlock unlimited AI capabilities for serious job seekers.",
    features: [
      "Unlimited AI generations",
      "Priority support",
      "Premium Gemini models",
      "Resume Q&A + deep analysis",
      "Faster response speeds",
      "Export to PDF",
    ],
    button: "Upgrade to Pro",
    href: "/dashboard",
    highlighted: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "Tailored AI solutions for teams and organizations.",
    features: [
      "Dedicated AI instance",
      "Custom model fine-tuning",
      "Onboarding & SLA support",
      "Team management tools",
      "Custom integrations",
    ],
    button: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="py-20 px-6 text-center bg-white border-b border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
        >
          <Zap size={13} />
          Simple, transparent pricing
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
        >
          Choose your plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-slate-500 mt-4 max-w-md mx-auto"
        >
          Start free, upgrade when you need more. No hidden fees.
        </motion.p>
      </section>

      {/* Plans */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "border-2 border-emerald-500 shadow-lg shadow-emerald-100"
                  : "border border-slate-100 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  {plan.title}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-400 text-sm">/{plan.period}</span>
                </div>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full font-medium ${
                  plan.highlighted
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                {plan.button}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-sm mt-10">
          All plans include a 7-day free trial on paid features. Cancel anytime.
        </p>
      </section>
    </main>
  );
}
