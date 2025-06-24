import React from 'react';
// import Header from '../Header/Header';
import gamestart from '../../../assets/images/mingcute_game-2-fill.png';
import Congrats from '../../../assets/images/material-symbols_money-bag.png';

const notifications = [
  { id: '1', name: 'Deposit Successful', description: 'You deposited ₦5,000 into your account.', time: '10:20 AM', date: new Date(), image: gamestart },
  { id: '2', name: 'Transfer Alert', description: '₦2,000 was sent to John Doe.', time: '8:30 AM', date: new Date(), image: Congrats },
  { id: '3', name: 'Welcome Bonus', description: 'You received a ₦500 welcome bonus!', time: '9:00 PM', date: new Date(Date.now() - 86400000), image: gamestart },
  { id: '4', name: 'Security Notice', description: 'A new device was detected on your account.', time: '3:15 PM', date: new Date(Date.now() - 2 * 86400000), image: Congrats },
  { id: '5', name: 'Security Notice', description: 'A new device was detected on your account.', time: '3:15 PM', date: new Date(Date.now() - 2 * 86400000), image: Congrats },
  { id: '6', name: 'Security Notice', description: 'A new device was detected on your account.', time: '3:15 PM', date: new Date(Date.now() - 2 * 86400000), image: Congrats },
  { id: '7', name: 'Security Notice', description: 'A new device was detected on your account.', time: '3:15 PM', date: new Date(Date.now() - 2 * 86400000), image: Congrats },
];

const formatDateLabel = (date) => {
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return date.toLocaleDateString('en-NG', { weekday: 'long', month: 'short', day: 'numeric' });
};

const groupByDate = () => {
  const grouped  = {};

  notifications.forEach((item) => {
    const label = formatDateLabel(item.date);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(item);
  });

  return Object.keys(grouped).map((label) => ({
    title: label,
    data: grouped[label],
  }));
};

export default function NotificationList() {
  const sections = groupByDate();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
       <div className="max-w-2xl mx-auto p-4">
        {sections.length === 0 ? (
          <p className="text-center mt-20 text-gray-500 font-medium">No notifications yet.</p>
        ) : (
          sections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">{section.title}</h2>
              {section.data.map((item) => (
                <div key={item.id} className="flex items-center bg-white rounded-lg p-4 mb-4 shadow-sm relative">
                  <div className="bg-gray-700 rounded w-12 h-12 flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <span className="absolute top-4 right-4 text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
