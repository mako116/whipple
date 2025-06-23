// src/components/GameSection.jsx
 import { GameCardBox } from './GameBox';
 
export function GameSection({ title, games }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((game, idx) => (
          <GameCardBox key={idx} game={game} isTop={title === 'Top Games'} index={idx} />
        ))}
      </div>
    </section>
  );
}
