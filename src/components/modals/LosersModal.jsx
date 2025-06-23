 import lost from "../../assets/images/icons/Loss Modal (1).png"

export default function LosingModal({
  visible,
   closeModal,
  // default true
}) {
 
  if (!visible) return null;

  return (
    <div
            onClick={closeModal}
            className="fixed inset-0 bg-gray-900/60 bg-opacity-[200px]  flex justify-center items-center z-50"
          >
            {/* Modal content container */}
            <div
              onClick={(e) => e.stopPropagation()} // prevent closing on modal click
              className=""
            //   style={{
            //     backgroundImage: `url('../../assets/images/icons/Winning Modal.png')`,
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            //   }}
            >
              <img src={lost} className="w-[200px] md:w-[340px] h-auto" />
              
            </div>
          </div>
  );
}
