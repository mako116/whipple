import { Link } from "react-router-dom";

 
export function GameCardBox({ game, isTop, index, }) {
  return (
    <div className="bg-white shadow relative rounded-lg p-4 flex flex-col">
      {isTop && <div className="bg-red-500 absolute left-0 top-[-10px] text-white px-2  py-1 rounded self-start text-[13px] font-bold">{index + 1}</div>}
      <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded mb-2" />
      <h3 className="text-lg font-[700] ">{game.title}</h3>
      <p className=" text-[13px] font-medium  ">{game.description}</p>
      <div className="mt-2">
        <span className="font-semibold text-[13px]   ">Variants:</span>{' '}
        {game.variants.map((v, i) => (
          <span key={i} className="ml-1 font-medium text-[13px] ">• {v}</span>
        ))}
      </div>
      <Link 
      className="mt-auto bg-blue-600 cursor-pointer text-white py-2 text-center rounded font-bold "
       to={game.to}
      >
      Create Game
      </Link>
      
    </div>
  );
}
