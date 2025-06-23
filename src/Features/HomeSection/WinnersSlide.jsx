import { useEffect, useRef } from 'react';
import bg from "../../assets/images/bgims.jpg";

const winners = [
  { amount: 'NGN40,261.07', time: '1 min ago', type: 'Color Roulette', user: '81*****979' },
  { amount: 'NGN67,732.42', time: '1 min ago', type: 'Lucky Numbers', user: '80*****977' },
  { amount: 'NGN95,000.00', time: '1 min ago', type: 'Color Roulette', user: '81*****065' },
  { amount: 'NGN42,426.87', time: '1 min ago', type: 'Coin Flipper', user: '81*****533' },
  { amount: 'NGN62,948.34', time: '1 min ago', type: 'Spin da Bottle', user: '70*****348' },
  { amount: 'NGN1,267,250.00', time: '1 min ago', type: 'Sports Betting', user: '80*****585' },
  { amount: 'NGN38,750.00', time: '1 min ago', type: 'Sports Betting', user: '81*****161' },
  { amount: 'NGN35,177.15', time: '1 min ago', type: 'Spin da Bottle', user: '80*****066' },
  { amount: 'NGN504,256.72', time: '1 min ago', type: 'Goal Challenge', user: '90*****000' },
  { amount: 'NGN180,413.83', time: '1 min ago', type: 'Dice Roll', user: '80*****294' },
];

export default function WinnersPrizeTicker() {
  const containerRef = useRef(null);
  const scrollStep = 1;
  const scrollSpeed = 50;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Duplicate content for seamless scroll
    el.innerHTML += el.innerHTML;
    
    let scroll = 0;
    const height = el.scrollHeight / 2;
    
    const ticker = () => {
      scroll += scrollStep;
      if (scroll >= height) {
        scroll = 0;
      }
      el.scrollTop = scroll;
    };

    const interval = setInterval(ticker, scrollSpeed);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
    style={{
        backgroundImage: `url(${bg})`,
       }}
    className="m-gd-wrapper  border rounded-lg shadow-md p-4">
      <h5 className="m-gd-title text-lg font-semibold mb-2">Grand Prize Winners</h5>
      <div
        ref={containerRef}
        className="m-gd-con overflow-hidden h-64"
      >
        <div className="m-bdcast flex flex-col space-y-2">
          {winners.map((w, i) => (
            <div key={i} className="m-gd-item p-2 bg-gray-50 rounded-lg">
              <div className="i-title flex justify-between text-sm text-gray-500">
                <span>{w.amount}</span>
                <span>{w.time}</span>
              </div>
              <div className="i-main flex justify-between font-medium">
                <span>{w.type}</span>
                <span>{w.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
