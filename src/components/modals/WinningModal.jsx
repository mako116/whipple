import React, { useEffect } from "react";
import { BiCross } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
import success from "../../assets/images/icons/Winning Modal.png"
export default function WinningModal({ visible, closeModal }) {
  // const navigate = useNavigate();

    useEffect(() => {
    const timer = setTimeout(() => {
      // You can trigger auto-close here if needed
      // closeModal();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;


  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-gray-900/60 bg-opacity-[200px]  flex justify-center items-center z-50"
      >
        {/* Modal content container */}
        <div
          onClick={(e) => e.stopPropagation()} // prevent closing on modal click
          className=""
          style={{
            backgroundImage: `url('../../assets/images/icons/Winning Modal.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img src={success} className="w-[200px] md:w-[340px] h-auto" />
          {/* Close button */}
          {/* <button
            onClick={closeModal}
            className="absolute top-2 right-2 p-2 focus:outline-none"
            aria-label="Close modal"
          >
           <BiCross/>
          </button> */}

          {/* Buttons at bottom */}
          {/* <div className="absolute bottom-20 right-12 flex gap-5">
            <button
              className="px-8 py-2 border border-gray-700 rounded-md text-gray-700 hover:bg-gray-100 transition"
              onClick={() => alert("View Details clicked")}
            >
              View Details
            </button>

            <button
              className="px-11 py-2 bg-[#0A1931] text-white rounded-md hover:bg-[#08142a] transition"
              onClick={() => navigate("/")}
            >
              Go Home
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
