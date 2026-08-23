import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "How does this posture corrector work?",
    answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
  },
  {
    id: 2,
    question: "Is it suitable for all ages and body types?",
    answer: "Yes, posture correctors are designed with adjustable straps to comfortably fit a wide variety of body types and age groups."
  },
  {
    id: 3,
    question: "Does it really help with back pain and posture improvement?",
    answer: "Consistent use helps build muscle memory, relieving upper back strain and promoting long-term spinal alignment."
  },
  {
    id: 4,
    question: "Does it have smart features like vibration alerts?",
    answer: "Selected models feature integrated smart sensors that gently vibrate whenever you begin to slouch."
  },
  {
    id: 5,
    question: "How will I be notified when the product is back in stock?",
    answer: "You can sign up for email or SMS notifications directly on the product page to get instantly notified upon restock."
  }
];

const AskQuestion = () => {
  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#EAEFEF] min-h-screen mt-7 rounded-2xl py-12 px-4 sm:px-6 lg:px-8 font-sans flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3B36] tracking-tight mb-3">
            Frequently Asked Question (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`transition-all duration-200 rounded-xl overflow-hidden border ${
                  isOpen
                    ? 'bg-[#E5F2F0] border-[#72A89F]'
                    : 'bg-white border-transparent shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0B3B36]">
                    {item.question}
                  </span>
                  <span className="text-[#0B3B36] shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1.5">
            <button className="bg-[#C5E86C] hover:bg-[#b8de5b] text-[#0B3B36] text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-colors cursor-pointer">
              See More FAQ's
            </button>
            <button className="bg-[#1C201D] hover:bg-[#2b302c] text-white p-3.5 rounded-full transition-colors cursor-pointer">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AskQuestion;