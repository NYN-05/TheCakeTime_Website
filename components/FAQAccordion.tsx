"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How far in advance should I order a custom cake?",
    answer: "We recommend ordering custom cakes at least 3-5 days in advance. For elaborate designs or wedding cakes, please order 2-3 weeks ahead to ensure we can accommodate your specific requirements.",
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes! We offer same-day delivery for orders placed before 12 PM, subject to availability in your area. Additional charges may apply for same-day deliveries.",
  },
  {
    question: "Can I customize the flavors and design?",
    answer: "Absolutely! We specialize in custom cakes. You can choose from our wide variety of flavors, frostings, and designs. Our team will work with you to create your dream cake.",
  },
  {
    question: "What are your allergen-free options?",
    answer: "We offer eggless, sugar-free, and gluten-free options. Please inform us of any specific dietary requirements when placing your order, and we'll create a delicious cake that meets your needs.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 48 hours before delivery are eligible for a full refund. Cancellations within 24-48 hours receive a 50% refund. Unfortunately, we cannot process refunds for same-day cancellations.",
  },
  {
    question: "How should I store my cake?",
    answer: "Store cakes in the refrigerator and bring to room temperature 30 minutes before serving for best taste. Fondant cakes should be kept in an air-conditioned room. Consume within 2-3 days for optimal freshness.",
  },
];

export const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqData.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-pink-50/50 transition-colors group"
          >
            <span className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors pr-4">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-pink-600 flex-shrink-0" size={20} />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
