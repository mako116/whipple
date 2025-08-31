import React, { useEffect } from "react";
import AnimatedSection from "./AnimatedSection.jsx";
import { useStaggeredAnimation } from "../../hooks/useScrollAnimation.js";

const ResponsibleGaming = () => {
  const [containerRef, visibleItems] = useStaggeredAnimation(9, 200);

    useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const sections = [
    {
      title: "1. Our Commitment",
      content: [
        "Whipple is designed as a peer-to-peer, skill-based platform where knowledge, strategy, and decision-making matter. To protect our users, we are committed to:",
        "- Preventing underage access (18+ only).",
        "- Promoting balance and healthy play habits.",
        "- Ensuring fairness in all quizzes and skill game activities.",
        "- Protecting users from fraud, exploitation, and addiction."
      ]
    },
    {
      title: "2. Responsible Gaming Guidelines",
      content: [
        "1. Play for fun, not income. Whipple is an entertainment and skill-testing platform, not a guaranteed way to make money.",
        "2. Set personal limits. Decide in advance how much time and money you want to spend.",
        "3. Avoid chasing losses. Take breaks and walk away when you’re not in the right mindset.",
        "4. Balance play with life. Maintain healthy activities outside of Whipple (work, studies, family, exercise).",
        "5. Seek support if needed. If gaming stops being fun and starts feeling like pressure, consider taking a break or contacting support."
      ]
    },
    {
      title: "3. Age Restriction",
      content: [
        "Only individuals 18 years and above may use Whipple.",
        "Verification methods (BVN, NIN, ID checks) may be used to enforce this.",
        "Accounts found to be operated by minors will be suspended or terminated immediately."
      ]
    },
    {
      title: "4. Fair Play Principles",
      content: [
        "1. Transparent Rules – All quiz rules and game mechanics are clearly explained before play.",
        "2. Equal Opportunity – Every user has the same chance of winning based on skill, knowledge, or random draw (where applicable).",
        "3. No Bots or Exploits – Automated accounts, cheating, or system manipulation is strictly prohibited.",
        "4. Independent Voting & Polling – In community-based outcomes (e.g., 'Deciders' voting), no single user or group can unfairly control the results.",
        "5. Anti-Collusion Protection – Group play and decision-making are monitored to prevent collusion or unfair advantages."
      ]
    },
    {
      title: "5. Protection Against Problem Gaming",
      content: [
        "Daily Points Reset – Keeps quiz-based point rewards fair and balanced.",
        "Self-Exclusion Option – Users may temporarily or permanently suspend their account if they need a break.",
        "Spending Limits (Optional) – Users may set limits on deposits, stakes, or playing time."
      ]
    },
    {
      title: "6. Fraud & Anti-Money Laundering (AML)",
      content: [
        "All transactions are monitored to prevent fraud, illegal transfers, or money laundering.",
        "Suspicious activity may be reported to the relevant Nigerian regulators and law enforcement agencies."
      ]
    },
    {
      title: "7. Support & Resources",
      content: [
        "If you or someone you know is struggling with excessive compulsive habits:",
        "📧 support@mywhipple.com",
        "📞 08149470004"
      ]
    },
    {
      title: "8. Breaches of Policy",
      content: [
        "Violations of this policy (underage play, cheating, fraud, or irresponsible use) may result in:",
        "- Temporary or permanent account suspension",
        "- Loss of rewards or winnings",
        "- Reporting to authorities (if laws are violated)"
      ]
    },
    {
      title: "9. Final Note",
      content: [
        "Whipple was built to reward knowledge, encourage strategy, and create fair peer-to-peer gaming experiences.",
        "By following this policy, you help us maintain a safe, skill-driven, and enjoyable community."
      ]
    }
  ];

  return (
    <section className="py-20 text-gray-900 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            🎯 Whipple – Responsible Gaming & Fair Play Policy
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

export default ResponsibleGaming;
