import React, { useState } from 'react';

const faqData = [
  {
    question: 'Does it cost any money to register on Whipple Nigeria?',
    answer: 'No. It’s completely free of charge.',
  },
  {
    question: 'How do I register on Whipple Nigeria?',
    answer: 'Visit Whipple Nigeria website and click on “Register” in the top-right corner, fill in the registration details and follow the given steps.',
  },
  {
    question: 'Can I change my username?',
    answer: 'Unfortunately not; the username, which should be a verified phone number, cannot be changed once you have created your account.',
  },
  {
    question: 'How can I retrieve my login details?',
    answer: 'To retrieve your password, please click on “Forgot Password?” below the login area. If you have forgotten your username, please contact us.',
  },
  {
    question: 'How do I change my password?',
    answer: 'Login into your account, go to "My Account" drop down menu and select "My Account Info", then click on "Change Password".',
  },
  {
    question: 'How do I update my personal details?',
    answer: 'Login into your account, go to "My Account" drop down menu and select "My Account Info". You can then change your profile as desired.',
  },
  {
    question: 'What is the minimum age for betting with Whipple Nigeria?',
    answer: 'It is strictly forbidden for persons under the age of 18 to open an account and use our services.',
  },
  {
    question: 'Where can I find Whipple\'s Terms & Conditions?',
    answer: 'You can find our Terms and Conditions at the bottom of the website (footer).',
  },
  {
    question: 'What are the maximum Payouts?',
    answer: 'The Max Sports Payout per Bet is NGN 125,000,000. The Daily Max Winnings per User are NGN 200,000,000.',
  },
  {
    question: 'How many selections can I add to my betslip?',
    answer: 'The maximum number of selections you can add to your betslip is 50, however, it allows a maximum of 15 selections for System bets.',
  },
  {
    question: 'How to withdraw money?',
    answer: 'To withdraw your winnings, go to "My Account" and click the "Withdraw" button. Enter the amount and click on “Withdraw”. Your winnings will be sent to your bank account after confirmation.',
  },
  {
    question: 'Are there any fees for withdrawals?',
    answer: 'All withdrawals are free of charges.',
  },
  {
    question: 'What is the usual withdrawal processing time?',
    answer: 'In normal situations, withdrawals are processed automatically. Withdrawals may fail due to the Daily Limit Transfer amount.',
  },
  {
    question: 'Why was my money deducted suddenly?',
    answer: 'If incorrect results were provided, a Rollback notification will be sent. Bets will be re-settled with the correct final results. The balance may turn negative if winnings were spent or withdrawn before the Rollback. For more details, check your Transaction History.',
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen mt-[20px] bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="font-medium text-lg">{item.question}</span>
              <span className="text-2xl">{activeIndex === index ? '−' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="mt-3 text-gray-700 leading-relaxed">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
