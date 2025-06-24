import React from 'react';
import { Link } from 'react-router-dom';

const paymentMethods = [
  { src: 'https://s.sporty.net/cms/footer_opay_logo_a954fa8a51.png', alt: 'Opay' },
  { src: 'https://s.sporty.net/cms/footer_palmpay_logo_dbb2dc54fc.png', alt: 'Palmpay' },
  { src: 'https://s.sporty.net/cms/footer_quickteller_logo_67ba461e70.png', alt: 'Quickteller' },
  { src: 'https://s.sporty.net/cms/footer_verve_logo_c68b5a53c0.png', alt: 'Verve' },
  { src: 'https://s.sporty.net/cms/footer_visa_logo_9dabd03576.png', alt: 'Visa' },
  { src: 'https://s.sporty.net/cms/footer_mastercard_logo_094fa25aea.png', alt: 'MasterCard' },
  { src: 'https://s.sporty.net/cms/footer_uba_logo_58a31a9c3b.png', alt: 'UBA' },
  { src: 'https://s.sporty.net/cms/footer_access_logo_93dc405323.png', alt: 'Access' },
  { src: 'https://s.sporty.net/cms/footer_firstbank_logo_d49c06c2ef.png', alt: 'FirstBank' },
  { src: 'https://s.sporty.net/cms/footer_zenith_logo_5bfa08a0c5.png', alt: 'Zenith' },
  { src: 'https://s.sporty.net/cms/footer_fidelity_logo_b6239d349d.png', alt: 'Fidelity' },
  { src: 'https://s.sporty.net/cms/footer_gtbank_logo_6b74706f30.png', alt: 'GTBank' },
];

const WhippleFooter = () => {
  return (
    <footer className="bg-transparent  p-4 mt-10 text-[#fff]">
      {/* Copyright Section */}
      

      {/* Partnership Section */}
      <div className="text-lefft mb-4">
        <h2 className='text-[17px] md:text-[40px] font-[700] text-[#fff]'>
            Whipple
        </h2>
      </div>

      {/* Payment Methods */}
      <div className="mb-4 text-[#fff]">
        <h5 className="text-center font-semibold mb-2">Payment Methods</h5>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 justify-items-center">
          {paymentMethods.map((method, index) => (
            <div key={index} className="w-16">
              <img src={method.src} alt={method.alt} />
            </div>
          ))}
        </div>
      </div>

      {/* Age and Responsibility Notice */}
      <p className="text-center text-xs text-gray-500 mt-4 mb-4">
        Age 18 and above only to register or play at Whipple. Play Responsibly. Betting is addictive and can be psychologically harmful. | Whipple Nigeria is licensed by the National Lottery Regulatory Commission of Nigeria.
      </p>

      {/* Divider */}
      <div className="border-t my-4"></div>

      {/* Terms and About Us */}
      <div className="flex justify-center space-x-4 mb-4">
        <Link to={"/faq"} className="underline cursor-pointer">
            FAQ</Link>
        <span>|</span>
         <Link className='font-medium underline' to={'/games'}>
         Games
         </Link>
      </div>

      {/* Back to Top Button */}
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default WhippleFooter;
