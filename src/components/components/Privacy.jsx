import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection.jsx";
import { useStaggeredAnimation } from "../../hooks/useScrollAnimation.js";

const PrivacyPolicy = () => {
  const [containerRef, visibleItems] = useStaggeredAnimation(11, 200);
   useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "a) Personal Identification Information – Full name, Date of birth (to confirm you are 18+), Email address, Phone number.",
        "b) Financial & KYC Information – Bank account details, Payment processor details (Paystack, Monnify, Flutterwave, Opay, PalmPay, etc.), Identity documents (BVN, NIN, or valid ID) where required for verification.",
        "c) Usage & Gameplay Information – Quiz responses, points earned, rewards used, Game history (House vs Player, wins/losses, amounts staked), Device information (IP address, browser type, operating system, mobile identifiers).",
        "d) Communication Data – Messages sent to our support team, Notifications and in-app communications."
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "Account Management – to register, verify, and secure your Whipple account.",
        "Wallet Operations – to process deposits, withdrawals, and rewards.",
        "Gameplay & Rewards – to record quiz results, award points, and manage discounts/free plays.",
        "Fraud Prevention – to detect suspicious activity and prevent money laundering.",
        "Customer Support – to respond to your requests and provide assistance.",
        "Analytics & Improvements – to improve quizzes, game features, and platform performance.",
        "Legal Compliance – to comply with the necessary Nigerian laws."
      ]
    },
    {
      title: "3. Sharing of Information",
      content: [
        "Payment Partners – banks, Paystack, Monnify, Flutterwave, Opay, PalmPay, etc., for secure deposits and withdrawals.",
        "Service Providers – trusted vendors for hosting, analytics, fraud detection, and KYC verification.",
        "Regulators & Law Enforcement – when required by law or to protect against fraud and criminal activity.",
        "Business Transfers – if Whipple merges, is acquired, or undergoes restructuring, your data may be transferred.",
        "We do not sell your personal data to third parties."
      ]
    },
    {
      title: "4. Data Retention",
      content: [
        "Quiz points reset every 24 hours, but gameplay and transaction records may be stored for up to 5 years for legal and financial compliance.",
        "If you close your account, we may retain limited information to comply with regulatory obligations."
      ]
    },
    {
      title: "5. Data Security",
      content: [
        "Encryption for sensitive data (wallets, transactions, KYC documents).",
        "Secure servers hosted with trusted cloud providers.",
        "Access controls to prevent unauthorized access.",
        "However, no system is 100% secure, and users accept the risk of online activity."
      ]
    },
    {
      title: "6. Your Rights",
      content: [
        "Access the personal data we hold about you.",
        "Request correction of inaccurate information.",
        "Request deletion of your account/data (subject to legal obligations).",
        "Restrict or object to processing in certain cases.",
        "Withdraw consent where processing is based on consent.",
        "Requests can be made via support@mywhipple.com."
      ]
    },
    {
      title: "7. Cookies & Tracking",
      content: [
        "Whipple may use cookies and similar technologies to save your preferences, track session activity, and improve gameplay and user experience.",
        "You may disable cookies in your browser, but some features may not work properly."
      ]
    },
    {
      title: "8. Children’s Privacy",
      content: [
        "Whipple is strictly for adults (18+).",
        "We do not knowingly collect data from minors.",
        "Accounts found to be operated by underage users will be closed immediately."
      ]
    },
    {
      title: "9. International Transfers",
      content: [
        "If we transfer data outside Nigeria, we will ensure adequate protection measures are in place, consistent with NDPR and international standards."
      ]
    },
    {
      title: "10. Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy periodically.",
        "We will notify users through the app or email of any significant changes.",
        "Continued use of Whipple means acceptance of the updated Privacy Policy."
      ]
    },
    {
      title: "11. Contact Us",
      content: [
        "📧 support@mywhipple.com",
        "📞 08149470004",
        "🏢 No 8, Winners Close, off Obasanjo Road, Dutse, Abuja."
      ]
    }
  ];

  return (
    <section className="py-20 text-gray-900 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            🔒 Whipple – Privacy Policy
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

export default PrivacyPolicy;
