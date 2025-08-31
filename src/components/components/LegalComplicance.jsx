import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection.jsx";
import { useStaggeredAnimation } from "../../hooks/useScrollAnimation.js";

const LegalCompliance = () => {
  const [containerRef, visibleItems] = useStaggeredAnimation(5, 200);

  const sections = [
    {
      title: "1. TERMS & CONDITIONS",
      content: [
        "1.1 Eligibility",
        "You must be 18 years or older to use Whipple.",
        "You agree to provide accurate registration details and maintain only one active account.",
        "Whipple reserves the right to verify your identity and age at any time.",
        "",
        "1.2 Account Usage",
        "Users are responsible for securing their login details.",
        "Any activity under your account is assumed to be authorized by you.",
        "Whipple may suspend or terminate accounts for fraud, collusion, or violation of these terms.",
        "",
        "1.3 Gameplay & Stakes",
        "Users may play as either:",
        "1. The House (Game Originator) – paying an admission fee to create games.",
        "2. Players (Opponents) – playing against the House.",
        "Once a game is created and plays are placed, it cannot be reversed.",
        "",
        "1.4 Fees & Commissions",
        "- Whipple charges an admission fee (25%) on games originated by the House.",
        "- A withdrawal fee (2.5%) applies to user withdrawals unless waived by Skill Points.",
        "- Whipple reserves the right to adjust fees with notice.",
        "",
        "1.5 Skill-Based Quiz System",
        "- Users may earn Skill Points by completing quizzes.",
        "- Points are valid for 24 hours only and reset daily.",
        "Rewards include:",
        "20 Points → Withdrawal fee waived (for 24 hours).",
        "40 Points → 25% discounted boosts & admission fees (for 24 hours).",
        "80 Points → Free game & free admission fees (for 24 hours).",
        "Quiz Points are non-transferable and cannot be redeemed for cash.",
        "",
        "1.6 Prohibited Activities",
        "Collusion, multiple accounts, automated bots, or manipulation of outcomes is strictly prohibited.",
        "Users must not use VPNs, fake identities, or third-party wallets to evade restrictions.",
        "",
        "1.7 Governing Law",
        "These Terms are governed by the laws of the Federal Republic of Nigeria.",
        "Disputes shall be resolved under the jurisdiction of Nigerian courts or arbitration bodies."
      ]
    },
    {
      title: "2. PRIVACY POLICY",
      content: [
        "2.1 Data Collection",
        "We collect:",
        "- Registration data (name, email, age, ID).",
        "- Transaction data (deposits, withdrawals, gameplay history).",
        "- Device and security data (IP address, location, login activity).",
        "",
        "2.2 Data Use",
        "Your data is used to:",
        "- Verify identity & prevent fraud.",
        "- Process payments and gameplay.",
        "- Improve user experience with personalized features.",
        "- Comply with regulatory requirements.",
        "",
        "2.3 Data Sharing",
        "We may share data with:",
        "- Payment providers (e.g., Paystack, Flutterwave, Monnify, banks, etc.).",
        "- Regulators.",
        "- Security agencies in cases of fraud or legal violations.",
        "",
        "2.4 Data Protection",
        "- All data is encrypted and stored securely.",
        "- Users have the right to request account closure or data deletion."
      ]
    },
    {
      title: "3. FAIR PLAY POLICY",
      content: [
        "3.1 Our Commitment",
        "Whipple promotes fun, fair, and responsible gaming.",
        "",
        "3.2 User Responsibilities",
        "- Play within your financial limits.",
        "- Avoid excessive or compulsive behavior.",
        "- Do not collude with other users or exploit system weaknesses.",
        "",
        "3.3 Platform Responsibilities",
        "- No repeated quiz questions (ever).",
        "- No identical question sets between users.",
        "- Anti-bot and anti-collusion security systems are in place.",
        "- Randomized and transparent draws in all games.",
        "",
        "3.4 Player Protection Tools",
        "- Users can set deposit or play limits.",
        "- Users may self-exclude temporarily or permanently."
      ]
    },
    {
      title: "4. REFUND POLICY",
      content: [
        "4.1 General Rule",
        "- All games, admission fees, and quiz extension fees are final and non-refundable once gameplay begins.",
        "",
        "4.2 Eligible Refunds",
        "Refunds may be issued only if:",
        "- Duplicate charges occur.",
        "- A transaction fails but funds were deducted.",
        "- A system error prevents a paid game from starting.",
        "- Unauthorized transactions are confirmed (subject to investigation).",
        "",
        "4.3 Refund Process",
        "Requests must be made within 72 hours of the transaction.",
        "Send complaints to 📧 Support@mywhipple.com or 📞 08149470004",
        "Refunds will be processed within 5–10 business days.",
        "",
        "4.4 Non-Refundable Cases",
        "- Losses in games or quizzes.",
        "- Unused quiz points after expiration.",
        "- User errors such as missed countdowns."
      ]
    },
    {
      title: "5. CONTACT & SUPPORT",
      content: [
        "For inquiries, disputes, or refund requests:",
        "📧 Email: Support@mywhipple.com",
        "📞 Phone: 08149470004"
      ]
    }
  ];
   useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="py-20 text-gray-900 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            📜 WHIPPLE LEGAL & COMPLIANCE FRAMEWORK
          </h1>
          <p className="text-gray-600 text-lg">
            Effective Date: 30 September, 2025 | Last Updated: 30 September, 2025
          </p>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            Welcome to Whipple, a peer-to-peer skill-based gaming and entertainment platform. 
            This document outlines the legal, compliance, and policy framework governing all activities on Whipple. 
            By registering, accessing, or using Whipple, you agree to comply with the following terms, policies, and conditions.
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

export default LegalCompliance;
