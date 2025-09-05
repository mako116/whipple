import { Link } from "react-router-dom";
import GameBets from "../../Features/GameHistory/GameHistory";
import AccountMenu from "../HeaderPanel/AccountMenu/AccountMenu";
import BalancePane from "../HeaderPanel/BalancePanel/BalancePanel";
import LogoBar from "../HeaderPanel/LogoBar/LogoBar";
import NavMenu from "../HeaderPanel/NavMenu/NavMenu";

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed w-full z-30 whitespace-nowrap ">
      <div className="max-w-7xl mt-auto mx-auto flex items-center justify-between p-4 gap-3">
        <LogoBar />
        <BalancePane />
        <div className="flex gap-7">
          <Link
            to={"/bet-history"}
            className=" md:block mt-auto text-xs md:text-sm"
          >
            Bet-history
          </Link>
          <AccountMenu />
        </div>
      </div>
      <div className="bg-gray-50 border-t mt-auto ">
        <div className="max-w-7xl mx-auto p-2 flex justify-center">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
