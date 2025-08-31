import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection.jsx";
import { useStaggeredAnimation } from "../../hooks/useScrollAnimation.js";

const RefundPolicy = () => {
  const [containerRef, visibleItems] = useStaggeredAnimation(6, 200);

    useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const sections = [
    {
      title: "1. General Rule – No Refunds on Gameplay",
      content: [
        "All stakes, admission fees, or paid quiz extensions are final and non-refundable once gameplay begins.",
        "",
        "This rule applies to:",
        "- Amounts placed against other users or the House.",
        "- Admission fees paid to originate a game.",
        "- Fees paid to extend quiz/question timing.",
        "- Any other gameplay-related payments.",
        "",
        "Reason: Whipple operates on a peer-to-peer model, where outcomes depend on skill, knowledge, or random draws. Once play starts, user actions and results cannot be reversed."
      ]
    },
    {
      title: "2. Eligible Refund Cases",
      content: [
        "Refunds may only be granted under the following circumstances:",
        "1. Duplicate Charges – If your wallet or linked account is charged more than once for the same transaction.",
        "2. Failed Transactions – If funds are deducted from your bank or wallet, but the equivalent balance is not credited into your Whipple account.",
        "3. Technical Errors – If a system error prevents a game from starting after payment was successfully made.",
        "4. Fraudulent Activity – If unauthorized transactions are confirmed on your account (subject to investigation)."
      ]
    },
    {
      title: "3. Refund Process",
      content: [
        "Users must submit a refund request within 72 hours of the transaction by contacting:",
        "📧 support@mywhipple.com",
        "📞 08149470004",
        "",
        "Provide transaction details (date, reference ID, amount).",
        "Whipple will investigate the claim within 5–10 business days.",
        "",
        "Approved refunds will be processed back to:",
        "- The original funding source (bank, card, or wallet), or",
        "- The user’s Whipple Wallet (if chosen by the user)."
      ]
    },
    {
      title: "4. Non-Refundable Cases",
      content: [
        "Refunds will not be issued for:",
        "- Losses from games, or quizzes.",
        "- Unused quiz points (since they reset every 24 hours).",
        "- Voluntary account closures after funds have been staked.",
        "- Failure to play before countdowns expire (unless caused by a system error)."
      ]
    },
    {
      title: "5. Whipple’s Rights",
      content: [
        "Whipple reserves the right to withhold or deny refunds if fraudulent behavior, collusion, or abuse of the system is suspected.",
        "Whipple may also deduct reasonable processing or transaction fees where applicable."
      ]
    },
    {
      title: "6. Final Note",
      content: [
        "Our goal is to ensure fairness, security, and user confidence.",
        "While gameplay-related payments are final, Whipple will always refund users in genuine cases of errors, failed transactions, or unauthorized deductions."
      ]
    }
  ];

  return (
    <section className="py-20 text-gray-900 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            💳 Whipple Refund Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Effective Date: 30 September, 2025 | Last Updated: 30 September, 2025
          </p>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            At Whipple, we value transparency and fairness in all user transactions. 
            This Refund Policy outlines the circumstances under which refunds may or may not be granted.
          </p>
        </AnimatedSection>

        <div ref={containerRef} className="space-y-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <AnimatedSection animationType="fadeUp" delay={index * 100}>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                  {section.content.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RefundPolicy;
