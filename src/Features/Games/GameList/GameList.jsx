import { useState, useMemo, useEffect } from 'react';
import { allGames, popularGames, quickGames, topGames } from '../../../utlis/gamesData';
import { GameSection } from '../../../components/MyGames/GameSection';

export default function GameList({ filterType = 'all' }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Home');

  const filteredGames = useMemo(() => {
    let games = [...allGames];

    if (filterType === 'spin') {
      games = games.filter(g => g.title.toLowerCase().includes('spin'));
    } else if (filterType === 'colorRoulette') {
      games = games.filter(g => g.title.toLowerCase().includes('color roulette'));
    } else {
      // default behavior
      if (filter !== 'Home')
        games = games.filter(g => g.title === filter);
      if (search)
        games = games.filter(g => g.title.toLowerCase().includes(search.toLowerCase()));
    }

    return games;
  }, [search, filter, filterType]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-200/100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Become The House</h1>
      </div>

      {/* Search & Filter only if default behavior */}
      {filterType === 'all' && (
        <div className="flex space-x-4 mb-8 flex-wrap gap-3">
          <input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-grow p-2  rounded bg-white focus:outline-0"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="p-2  rounded bg-white focus:outline-0"
          >
            <option value="Home">All</option>
            {allGames.map((g, i) => <option key={i} value={g.title}>{g.title}</option>)}
          </select>
        </div>
      )}

      {/* Sections */}
      {search && filterType === 'all' && (
        filteredGames.length
          ? <GameSection title="Search Results" games={filteredGames} />
          : <p className="text-center text-gray-500">No results found.</p>
      )}

      {!search && filter === 'Home' && filterType === 'all' && <>
        <GameSection title="Top Games" games={topGames} />
        <GameSection title="Popular Games" games={popularGames} />
        <GameSection title="Quick Games" games={quickGames} />
      </>}

      {!search && filter !== 'Home' && filterType === 'all' && (
        filteredGames.length
          ? <GameSection title={filter} games={filteredGames} />
          : <p className="text-center text-gray-500">No results found for “{filter}”.</p>
      )}

      {/* If filtering for spin */}
      {filterType === 'spin' && filteredGames.length === 0 && (
        <p className="text-center text-gray-500">No spin games found.</p>
      )}

      {filterType === 'spin' && filteredGames.length > 0 && (
        <GameSection title="Spin Games" games={filteredGames} />
      )}

      {/* If filtering for color roulette */}
      {filterType === 'colorRoulette' && filteredGames.length === 0 && (
        <p className="text-center text-gray-500">No Color Roulette games found.</p>
      )}

      {filterType === 'colorRoulette' && filteredGames.length > 0 && (
        <GameSection title="Color Roulette Games" games={filteredGames} />
      )}
    </div>
  );
}
