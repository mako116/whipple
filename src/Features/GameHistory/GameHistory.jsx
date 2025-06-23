// src/pages/History.jsx
import { useState } from 'react';
// import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../components/Tabs';
import GameCard from '../../components/MyGames/MyGames';
import { Tabs,TabList, Tab, TabPanels, TabPanel } from '../../context/TabContext';
// import GameCard from '../components/GameCard';

export default function GameBets() {
  const [gameData] = useState({ GameName: 'GAME123' });
  const myGames = [
     {
      id: '1',
     
      players: '3/7 Players',
      category: 'Category A',
      amount: '$100',
     
    },
    {
      id: '2',
     
      players: '5/7 Players',
      category: 'Category B',
      amount: '$150',
     
    },
  ];
  
 
 const pastGames = [
    {
      id: '3',
      gameName: 'POST789',
      players: '7/7 Players',
      concluded: 'Concluded',
      amount: '$200',
      status: 'won',
    }
     
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      <header className="bg-blue-200 py-4 text-center font-bold text-xl">My Games</header>

      <div className="container mx-auto p-4">
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab index={0}>My Games</Tab>
            <Tab index={1}>Past Games</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {myGames.map(item => (
                <GameCard key={item.id} item={item} type="my" GameName={gameData.GameName} />
              ))}
            </TabPanel>
            <TabPanel>
              {pastGames.map(item => (
                <GameCard key={item.id} item={item} type="past" GameName={gameData.GameName} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
