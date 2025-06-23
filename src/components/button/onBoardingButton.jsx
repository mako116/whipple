import arrow from "../../assets/icons/right-arrow.png";

const BlueButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-6 py-3"
    >
      {text}
      <img src={arrow} alt="arrow" className="w-4 h-4" />
    </button>
  );
};

export default BlueButton;
