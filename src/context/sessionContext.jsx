// context/SessionProvider.jsx
import { createContext,  useRef, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
// import IdleModal from '../components/modals/idleModal';
// import IdleModal from '../components/IdleModal';

export const SessionContext = createContext();

export default function SessionProvider({ children }) {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [countdown, setCountdown] = useState(60);
  const idleTimer = useRef(null);

  const onIdle = () => {
    // setModalOpen(true);
    let t = 60;
    const interval = setInterval(() => {
      t -= 1;
    //   setCountdown(t);
      if (t <= 0) {
        clearInterval(interval);
        logout(); // auto-logout
      }
    }, 1000);
  };

  const { reset } = useIdleTimer({
    ref: idleTimer,
    timeout: 1000 * 60 * 4, // 4 minutes
    onIdle,
  });

  const logout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

//   const continueSession = async () => {
//     // optionally call refresh-token API here
//     reset();
//     setCountdown(60);
//     setModalOpen(false);
//   };

  useEffect(() => {
    reset(); // start timer on mount
  }, [reset]);

  return (
    <SessionContext.Provider value={{}}>
      {children}
      {/* <IdleModal
        isOpen={modalOpen}
        countdown={countdown}
        onStay={continueSession}
        onLogout={logout}
      /> */}
    </SessionContext.Provider>
  );
}
