// src/components/Tabs.jsx
import { createContext, useState, useContext } from 'react';

const TabsContext = createContext();
export const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children }) => (
  <div className="flex border-b bg-slate-100 rounded-md">{children}</div>
);

export const Tab = ({ index, children }) => {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const active = index === activeIndex;
  return (
    <button
      onClick={() => setActiveIndex(index)}
      className={`px-4 py-2 flex-1 text-center -mb-px border-b-2 ${
        active ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-600 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  );
};

export const TabPanels = ({ children }) => {
  const { activeIndex } = useContext(TabsContext);
  return <div className="p-4">{children[activeIndex]}</div>;
};

export const TabPanel = ({ children }) => <div>{children}</div>;
