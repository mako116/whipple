import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection.jsx";
import { useStaggeredAnimation } from "../../hooks/useScrollAnimation.js";
// import {   } from "../../hooks/useScrollAnimation.js";

const TermsAndConditions = () => {
 
    const [containerRef, visibleItems] = useStaggeredAnimation(13, 200);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const sections = [
    {
      title: "1. Eligibility",
      content: [
        "You must be at least 18 years old and legally capable of entering into binding agreements.",
        "You confirm that gaming activities are legal in your jurisdiction. Whipple is not responsible for users who access the platform where it is restricted.",
        "Whipple reserves the right to verify your identity (including KYC checks) before you can withdraw funds."
      ]
    },
    {
      title: "2. Account Registration & Security",
      content: [
        "Each user may only maintain one account. Multiple accounts may result in suspension.",
        "You are responsible for maintaining the confidentiality of your login credentials.",
        "You agree to notify Whipple immediately of any unauthorized use of your account."
      ]
    },
    {
      title: "3. Wallet & Payments",
      content: [
        "Users can fund their Whipple Wallet via approved payment processors (e.g., Paystack, Monnify, Flutterwave, Paga, Opay, PalmPay, banks).",
        "Withdrawals are processed to verified Nigerian bank accounts in the user’s name.",
        "Whipple may charge transaction fees such as withdrawal fees, admission fees (for House roles), or other service charges as applicable.",
        "Fraudulent deposits, chargebacks, or suspicious transactions may result in account suspension or legal action."
      ]
    },
    {
      title: "4. Peer-to-Peer Gaming Rules",
      content: [
        "Whipple provides a platform for users to create and participate in games. Whipple is not a direct participant in bets.",
        "Users can play as The House (originating games and setting odds) or The Player (playing against the House).",
        "The House must pay a 25% admission fee (unless waived through rewards).",
        "All outcomes are determined by Whipple’s automated systems (e.g., dice rolls, number picks, quizzes, etc.). Decisions are final and binding."
      ]
    },
    {
      title: "5. Skill-Based Quiz Rules",
      content: [
        "Users may participate in daily quizzes to earn points.",
        "Each quiz consists of 40 multiple-choice questions, with 2 points per correct answer (maximum 80 points daily).",
        "Users have 5 seconds per question unless they extend the time by paying ₦1,000 per question.",
        "Quiz points are valid for 24 hours only and reset daily.",
        "Rewards from quiz points include: 20 Points → Waive 2.5% withdrawal fee, 40 Points → 25% discount on games/admission fees, 80 Points → Free game or waived admission fee.",
        "Questions will not be repeated and differ per user to prevent collusion."
      ]
    },
    {
      title: "6. Responsible Gaming",
      content: [
        "Whipple encourages responsible play.",
        "Users should only stake what they can afford to lose.",
        "Whipple may provide self-exclusion tools upon request.",
        "Whipple is not liable for losses arising from gaming activities."
      ]
    },
    {
      title: "7. Prohibited Activities",
      content: [
        "Use of automated bots, cheats, or unfair strategies.",
        "Colluding with other users to manipulate outcomes.",
        "Money laundering or fraudulent activities.",
        "Creating multiple accounts to abuse rewards or bonuses.",
        "Violations may result in account termination and forfeiture of funds."
      ]
    },
    {
      title: "8. Intellectual Property",
      content: [
        "All content, trademarks, logos, and designs on Whipple are the property of Torsade de Pointes Ltd.",
        "Users may not copy, distribute, or exploit Whipple’s content without permission."
      ]
    },
    {
      title: "9. Disclaimers & Limitation of Liability",
      content: [
        "Whipple provides the platform “as is” without warranties of any kind.",
        "Whipple does not guarantee uninterrupted or error-free access.",
        "Whipple is not responsible for technical issues, internet failures, or third-party payment delays.",
        "Whipple’s liability, if any, shall not exceed the amount in dispute on your wallet."
      ]
    },
    {
      title: "10. Termination & Suspension",
      content: [
        "Whipple may suspend or terminate accounts for: breach of these Terms, fraudulent or suspicious activity, violation of applicable laws.",
        "Upon termination, any remaining balance may be forfeited if tied to fraudulent activity."
      ]
    },
    {
      title: "11. Modifications",
      content: [
        "Whipple reserves the right to update these Terms at any time. Continued use of the platform means you accept the updated Terms."
      ]
    },
    {
      title: "12. Governing Law",
      content: [
        "These Terms shall be governed by and construed under the laws of the Federal Republic of Nigeria, and disputes shall be subject to the exclusive jurisdiction of a Nigerian court of competent jurisdiction."
      ]
    },
    {
      title: "13. Contact",
      content: [
        "📧 support@mywhipple.com",
        "📞 08149470004"
      ]
    }
  ];

  return (
    <section className="py-20 text-gray-900 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            📜 Whipple – Terms and Conditions
          </h1>
          <p className="text-gray-600 text-lg">
            Effective Date: 30 September, 2025 | Last Updated: 30 September, 2025
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

export default TermsAndConditions;
