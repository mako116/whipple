  import successImage from '../../assets/images/OTP Successful Modal.png';
import ModalWrapper from '../../components/modals/Modal';

const SuccessModal = ({  visible,onClose,}) => {
 
  return (
    <ModalWrapper
      visible={visible}
      onClose={onClose}
      autoNavigateTo="/"
      timeout={3000}
    >
      <img src={successImage} alt="Success" className="w-full h-[200px] md:h-[500px] object-contain rounded-xl" />
    </ModalWrapper>
  );
};

export default SuccessModal;
