import React, { useState } from 'react';

export default function Support() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    'How do I become The House?',
    'What is the German Juice fee?',
    'How does voting work?',
    "What is the Losers' Game?",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="bg-blue-600 text-white py-4 px-6 rounded mb-4">
        <h1 className="text-xl font-semibold">Support</h1>
      </header>

      <div className="space-y-6 max-w-2xl mx-auto pb-10">

        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-lg shadow border space-y-4">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b py-3">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-medium text-gray-800">{faq}</span>
                <span className="text-blue-600 text-lg">{activeFAQ === index ? '−' : '+'}</span>
              </button>
              {activeFAQ === index && (
                <p className="pt-2 text-gray-600 text-sm">
                  This is the answer to: {faq}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support Form */}
        <div className="bg-white p-6 rounded-lg shadow border space-y-4">
          <h2 className="text-lg font-semibold mb-4">Contact Support</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              placeholder="Issue topic"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded bg-gray-50 mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded bg-gray-50"
            />
          </div>

          <button className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800">
            Submit Ticket
          </button>

          <div className="text-center mt-6 space-y-1">
            <p className="text-gray-600 text-sm">For urgent matters, contact us directly:</p>
            <p className="text-gray-700 text-sm">📧 support@whipple.com</p>
            <p className="text-gray-700 text-sm">📞 +234 800 WHIPPLE</p>
          </div>
        </div>

      </div>
    </div>
  );
}
