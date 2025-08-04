import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from './Layouts/Layout';
// import ProtectedRoute from './UI/protectedRoutes/ProtectedRoutes';
import { lazy, Suspense } from 'react';
import Spinner from './UI/spinner/Spinner';
import { AuthProvider } from './context/authContext';
import { Toaster } from 'react-hot-toast';

// Auth & Onboarding
import OnboardingScreen from './Features/onBoarding/OnBoardingScreen';
import Login from './Features/auth/Login';
import Signup from './Features/auth/signup';
import OTPPAge from './Features/auth/otp';

// Non-lazy pages
import SelectedDiceRoll from './Features/Games/ALLGames/Dice Roll/SelectedDiceRoll';
import MainOneNumber from './Features/Games/ALLGames/One Number Spin/MainOneNumber';
import SelectedOneNumber from './Features/Games/ALLGames/One Number Spin/SelectedOneNumber';
import MainWheelSpin from './Features/Games/ALLGames/Wheel Spin/MainWheelSpin';
import TodaysWheelSpin from './Features/HomeBannerLinks/TodaysWheel\'sSpin';
import PlayColorRoulette from './Features/HomeBannerLinks/PlayColorRoulette';
import PreBetActivities from './Features/Pre-BetActivities/Main/FirstPage';
import SelectLeagueScreen from './Features/Pre-BetActivities/znd/SelecteLeague';
import PreBetGames from './Features/Pre-BetActivities/TabPanel/ChooseGamePanel';
import PredictMatches from './Features/Pre-BetActivities/Predictmatch/Predictmatch';
import CorrectScores from './Features/Pre-BetActivities/CorrectScores/CorrectScores';
import ProfileScreen from './Features/AccountInfo/Profile/ProfileTab';
import NotificationList from './Features/AccountInfo/Notification/Notification';
import BankTransfer from './Features/AccountInfo/BankTrsf/BankTransfer';
import DepositPage from './Features/AccountInfo/DepositPage/DepositTab';
import WithdrawPage from './Features/AccountInfo/DepositPage/Withdraw';
import ReferAndEarn from './Features/AccountInfo/refer/Refer';
import Security from './Features/AccountInfo/Security/SercurityPassword';
import Support from './Features/AccountInfo/support/Support';
import ChatSearch from './Features/chat/ChatSearch';
import ChatScreen from './Features/chat/ChatMessage';
import FaqPage from './Features/HomeSection/FAQ';

// Lazy-loaded pages
const Home = lazy(() => import("./Features/HomeSection/Home"));
const SelectedWheelSpin = lazy(() => import("./Features/Games/ALLGames/Wheel Spin/SelectedWheelSpin"));
const MainMysteryBox = lazy(() => import("./Features/Games/ALLGames/mystery box/MainMysteryBox"));
const MysterySelect = lazy(() => import("./Features/Games/ALLGames/mystery box/SelectedMysteryBox"));
const GameBets = lazy(() => import("./Features/GameHistory/GameHistory"));
const SpinBottleMain = lazy(() => import("./Features/Games/ALLGames/Spin da Bottle/MainSpinDaBottle"));
const SelectedSpinBottle = lazy(() => import("./Features/Games/ALLGames/Spin da Bottle/SelectedSpinDaBottle"));
const AvailablePublishedGame = lazy(() => import("./Features/AvailableGames/AvaliableGames"));
const LosersGames = lazy(() => import("./Features/LostGames/LostGames"));
const GameDetails = lazy(() => import("./Features/Games/GameDetails/GameDetails"));
const GameDetailsWithOutVote = lazy(() => import("./Features/Games/GameDetails/GameDetailsWithOutVote"));
const VotePage = lazy(() => import("./Features/Games/Vote/Vote"));
const GameList = lazy(() => import("./Features/Games/GameList/GameList"));
const MainColorRoulette = lazy(() => import("./Features/Games/ALLGames/Color Roulette/MainColorRoulette"));
const SelectedColorRoulette = lazy(() => import("./Features/Games/ALLGames/Color Roulette/SelectedColorRoulette"));
const MainLuckyNumbers = lazy(() => import("./Features/Games/ALLGames/LuckyNumbers/MainLuckyNumbers"));
const CreateLuckyNumbers = lazy(() => import("./Features/Games/ALLGames/LuckyNumbers/CreateLuckyNumbers"));
const SelectedLuckyNumbers = lazy(() => import("./Features/Games/ALLGames/LuckyNumbers/SelectedLuckyNumbers"));
const MainFlipCoin = lazy(() => import("./Features/Games/ALLGames/FLipCoin/MainFlipCoin"));
const SelectedFlipCoin = lazy(() => import("./Features/Games/ALLGames/FLipCoin/SelectedFlipCoin"));
const MainGoalChallenge = lazy(() => import("./Features/Games/ALLGames/Goal Challenge/MainGoalChallenge"));
const SelectedGoalChallenge = lazy(() => import("./Features/Games/ALLGames/Goal Challenge/SelectedGoalChallenge"));
const MainDiceRoll = lazy(() => import("./Features/Games/ALLGames/Dice Roll/MainDiceRoll"));
const ColorRouletteGame2 = lazy(() => import("./Features/Games/ALLGames/Color Roulette2/MainColorRoulette2"));
const SelectedColorRoulette2 = lazy(() => import("./Features/Games/ALLGames/Color Roulette2/SelectedColorRoulette2"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              element={
                // <ProtectedRoute>
                  <AppLayout />
                // </ProtectedRoute>
              } 
            >
              <Route path="/" index element={<Home />} />
              <Route path="/bet-history" element={<GameBets />} />
              <Route path="/available-games" element={<AvailablePublishedGame />} />
              <Route path="/losers-games" element={<LosersGames />} />
              <Route path="/game-details" element={<GameDetails />} />
              <Route path="/game-details-noVote" element={<GameDetailsWithOutVote />} />
              <Route path="/vote" element={<VotePage />} /> 
              <Route path="/games" element={<GameList />} />
              <Route path="/games/colorRoulette" element={<MainColorRoulette />} />
              <Route path="/choose-colorRoulette" element={<SelectedColorRoulette />} />
              <Route path="/lucky-numbers" element={<MainLuckyNumbers />} />
              <Route path="/select-lucky-numbers" element={<CreateLuckyNumbers />} />
              <Route path="/choose-lucky-numbers" element={<SelectedLuckyNumbers />} />
              <Route path="/coin-flip" element={<MainFlipCoin />} />
              <Route path="/selected-coin-flip" element={<SelectedFlipCoin />} />
              <Route path="/goal-challenge" element={<MainGoalChallenge />} />
              <Route path="/selected-goal-challenge" element={<SelectedGoalChallenge />} />
              <Route path="/dice-roll" element={<MainDiceRoll />} />
              <Route path="/selected-dice-roll" element={<SelectedDiceRoll />} />
              <Route path="/one-number" element={<MainOneNumber />} />
              <Route path="/selected-one-number" element={<SelectedOneNumber />} />
              <Route path="/wheel-spin" element={<MainWheelSpin />} />
              <Route path="/selected-wheel-spin" element={<SelectedWheelSpin />} />
              <Route path="/mystery-box" element={<MainMysteryBox />} />
              <Route path="/selected-mystery-box" element={<MysterySelect />} />
              <Route path="/color-roulette2" element={<ColorRouletteGame2 />} />
              <Route path="/selected-color-roulette2" element={<SelectedColorRoulette2 />} />
              <Route path="/spin-bottle" element={<SpinBottleMain />} />
              <Route path="/selected-spin-bottle" element={<SelectedSpinBottle />} />
              <Route path="/today's-wheel-spin" element={<TodaysWheelSpin />} />
              <Route path="/all-color-roulette" element={<PlayColorRoulette />} />
              <Route path="/prebet-activities" element={<PreBetActivities />} />
              <Route path="/select-league" element={<SelectLeagueScreen />} />
              <Route path="/league-menu" element={<PreBetGames />} />
              <Route path="/overall-outcome" element={<PredictMatches />} />
              <Route path="/correct-score" element={<CorrectScores />} />
              <Route path="/my-profile" element={<ProfileScreen />} />
              <Route path="/notification" element={<NotificationList />} />
              <Route path="/deposit-page" element={<DepositPage />} />
              <Route path="/bank-transfer" element={<BankTransfer />} />
              <Route path="/withdraw" element={<WithdrawPage />} />
              <Route path="/invite-user" element={<ReferAndEarn />} />
              <Route path="/security-password" element={<Security />} />
              <Route path="/support" element={<Support />} />
              <Route path="/chat" element={<ChatSearch />} />
              <Route path="/chat-message/:id" element={<ChatScreen />} />
              <Route path="/faq" element={<FaqPage />} />
            </Route>

            {/* Public routes */}
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<OTPPAge />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            color: 'var(--color-grey-700)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
