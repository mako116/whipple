import './App.css'
import { BrowserRouter,   Route, Routes } from "react-router-dom";
import AppLayout from './Layouts/Layout';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from './UI/protectedRoutes/ProtectedRoutes';
import OnboardingScreen from './Features/onBoarding/OnBoardingScreen';
import Login from './Features/auth/Login';
import Signup from './Features/auth/signup';
import OTPPAge from './Features/auth/otp';
 import { lazy, Suspense } from 'react';
import Spinner from './UI/spinner/Spinner';
import { AuthProvider } from './context/authContext';
 import { Toaster } from 'react-hot-toast';
 
import SelectedDiceRoll from './Features/Games/ALLGames/Dice Roll/SelectedDiceRoll';
import MainOneNumber from './Features/Games/ALLGames/One Number Spin/MainOneNumber';
import SelectedOneNumber from './Features/Games/ALLGames/One Number Spin/SelectedOneNumber';
  import MainWheelSpin from './Features/Games/ALLGames/Wheel Spin/MainWheelSpin';
import TodaysWheelSpin from './Features/HomeBannerLinks/TodaysWheel\'sSpin';
import PlayColorRoulette from './Features/HomeBannerLinks/PlayColorRoulette';
import PreBetActivities from './Features/Pre-BetActivities/Main/FirstPage';
import SelectLeagueScreen from './Features/Pre-BetActivities/znd/SelecteLeague';
import PreBetGames from './Features/Pre-BetActivities/TabPanel/ChooseGamePanel';
import PredictScoresScreen from './Features/Pre-BetActivities/CorrectScores/CorrectScores';
import PredictMatches from './Features/Pre-BetActivities/Predictmatch/Predictmatch';
import CorrectScores from './Features/Pre-BetActivities/CorrectScores/CorrectScores';
import ProfileScreen from './Features/AccountInfo/Profile/ProfileTab';
import NotificationList from './Features/AccountInfo/Notification/Notification';
import BankTransfer from './Features/AccountInfo/BankTrsf/BankTransfer';
import DepositPage from './Features/AccountInfo/DepositPage/DepositTab';
import WithdrawPage from './Features/AccountInfo/DepositPage/Withdraw';
// import CorrectScores from './Features/Pre-BetActivities/Predictmatch/Predictmatch';
// import PredictMatches from './Features/Pre-BetActivities/Predictmatch/Predictmatch';
// import MainMysteryBox from './Features/Games/ALLGames/mystery box/MainMysteryBox';
// import AppLayout from './Layout/Layout';
 
function App() {
 
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

    
    
    


  

  // React Query Client Setup
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
     <AuthProvider> 
    <BrowserRouter>
     <Suspense
              fallback={
                <div className="flex justify-center items-center mt-12 text-3xl">
                  <Spinner />
                </div>
         } >
         
          {/* <SessionProvider> */}
          <Routes> 
            <Route
              element={
                // <ProtectedRoute>
                  <AppLayout />
                // </ProtectedRoute>
              }
             >
              <Route
                index
                path="/"
                element={
                  // <PageTransition >
                    <Home/>
                  // </PageTransition>
                }
              />
              <Route
                path="/bet-history"
                element={
                  <GameBets />
                }
              />
                <Route
                path="/available-games"
                element={
                  <AvailablePublishedGame/>
                }
              />
               <Route
                path="/losers-games"
                element={
                  <LosersGames/>
                }
              />
              <Route
                path="/game-details"
                element={
                  <GameDetails/>
                }
              />
               <Route
                path="/game-details-noVote"
                element={
                  <GameDetailsWithOutVote/>
                }
              />

               <Route
                path="/vote"
                element={
                  <VotePage/>
                }
              />

               <Route
                path="/games"
                element={
                  <GameList/>
                }
              />
              {/* colorRoulette */}
               <Route
                path="games/colorRoulette"
                element={
                  <MainColorRoulette/>
                }
              />
              <Route
                path="/choose-colorRoulette"
                element={
                  <SelectedColorRoulette/>
                }
              />
              {/* Lucky Numbers */}

              <Route
                path="/lucky-numbers"
                element={
                  <MainLuckyNumbers/>
                }
              />

               <Route
                path="/select-lucky-numbers"
                element={
                  <CreateLuckyNumbers/>
                }
              />

               <Route
                path="/choose-lucky-numbers"
                element={
                  <SelectedLuckyNumbers/>
                }
              />

              {/* Flip Coins */}
               <Route
                path="/coin-flip"
                element={
                  <MainFlipCoin/>
                }
              />

               
               <Route
                path="/Selected-coin-flip"
                element={
                  <SelectedFlipCoin/>
                }
              />

              {/* Goal Challange */}
               <Route
                path="/goal-challenge"
                element={
                  <MainGoalChallenge/>
                }
              />

               <Route
                path="/Selected-goal-challenge"
                element={
                  <SelectedGoalChallenge/>
                }
              />

              {/* Dice Roll */}
               <Route
                path="/dice-roll"
                element={
                  <MainDiceRoll/>
                }
              />

               <Route
                path="/selected-dice-roll"
                element={
                  <SelectedDiceRoll/>
                }
              />
               
                {/* One Number */}
               <Route
                path="/one-number"
                element={
                  <MainOneNumber/>
                }
              />
               <Route
                path="/selected-one-number"
                element={
                  <SelectedOneNumber/>
                }
              />

              {/* Wheel Spin */}
               <Route
                path="/wheel-spin"
                element={
                  <MainWheelSpin/>
                }
              />

               <Route
                path="/selected-wheel-spin"
                element={
                  <SelectedWheelSpin/>
                }
              />

              {/* Mystery Box*/}
               <Route
                path="/mystery-box"
                element={
                  <MainMysteryBox/>
                }
              />

               <Route
                path="/selected-mystery-box"
                element={
                  <MysterySelect/>
                }
              />

              {/* ColorRouletteGame2 */}
              <Route
                path="/color-roulette2"
                element={
                  <ColorRouletteGame2/>
                }
              />

              <Route
                path="/selected-color-roulette2"
                element={
                  <SelectedColorRoulette2/>
                }
              />

               {/* SpinBottleMain*/}
               <Route
                path="/spin-bottle"
                element={
                  <SpinBottleMain/>
                }
              />

               <Route
                path="/selected-spin-bottle"
                element={
                  <SelectedSpinBottle/>
                }
              />

               <Route
                path="/today's-wheel-spin"
                element={
                  <TodaysWheelSpin/>
                }
              />

               <Route
                path="/all-color-roulette"
                element={
                  <PlayColorRoulette/>
                }
              />

               <Route
                path="/prebet-activities"
                element={
                  <PreBetActivities/>
                }
              />

              <Route
                path="/select-league"
                element={
                  <SelectLeagueScreen/>
                }
              />

               <Route
                path="/league-menu"
                element={
                  <PreBetGames/>
                }
              />

               <Route
                path="/overall-outcome"
                element={
                  <PredictMatches/>
                }
              />

               <Route
                path="/correct-score"
                element={
                  <CorrectScores/>
                }
              />

              {/* My Account Screen */}
               <Route
                path="/my-profile"
                element={
                  <ProfileScreen/>
                }
              />

               <Route
                path="/notification"
                element={
                  <NotificationList/>
                }
              />

               <Route
                path="/deposit-page"
                element={
                  <DepositPage/>
                }
              />

               <Route
                path="/bank-transfer"
                element={
                  <BankTransfer/>
                }
              />
               <Route
                path="/withdraw"
                element={
                  <WithdrawPage/>
                }
              />

              
              
              
              {/* <Route path="*" element={<PageNotFound />} />  */}
            </Route>
             {/* onBoarding screens */}
               <Route
                path="/onboarding"
                element={
                  <OnboardingScreen/>
                }
              />
              {/* auth */}
               <Route
                path="/login"
                element={
                  <Login/>
                }
              />
               {/* auth */}
               <Route
                path="/signup"
                element={
                  <Signup/>
                }
                
              />
              {/* auth */}
               <Route
                path="/otp"
                element={
                  <OTPPAge/>
                }
              />
          </Routes>
           {/* </SessionProvider> */}
          
          </Suspense>
       </BrowserRouter>
        </AuthProvider>
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
       </QueryClientProvider>
  )
}
 
export default App