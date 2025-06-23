import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalWrapper = ({
  visible,
  onClose,
  autoNavigateTo,
  timeout ,
  children,
}) => {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    let timer;

    if (visible) {
      setShowAnimation(true);

      if (autoNavigateTo) {
        timer = setTimeout(() => {
          onClose();
          navigate(autoNavigateTo);
        }, timeout);
      }
    } else {
      setShowAnimation(false);
    }

    return () => clearTimeout(timer);
  }, [visible, onClose, autoNavigateTo, navigate, timeout]);

  if (!visible) return null;

  return (
    <div className="h-full  w-full fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        className={`w-[50%]  rounded-xl transform transition-all duration-500 ease-out 
          ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} 
          p-4 flex items-center justify-center`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
