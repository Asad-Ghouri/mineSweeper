import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo_symbol.svg";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NavSidebar from "./NavSidebar";
export default function Header() {
  const [navSidebarOpen, setNavSidebarOpen] = useState(false);

  const handleNavHamburgerClick = () => {
    setNavSidebarOpen(!navSidebarOpen);
  };

  const handleNavCloseSidebar = () => {
    setNavSidebarOpen(false);
  };
  return (
    <>
      <header>
        <div className="logo">
          <img src={Logo} alt="" />
          <center>
            <Link to="/">
              <h1 className="font-heading text-3xl text-text z-50 backdrop-blur-lg p-3 rounded logotext">
                Crypto Mines
              </h1>
            </Link>
          </center>
        </div>
        <div className="flex">
          <div className="headCbtn">
            {" "}
            <ConnectWallet className="" />{" "}
          </div>
          <div className="links">
            {/* <ConnectWallet className="" /> */}
            <Link to="/">Home</Link>
            <Link to="/DisplayCoin">Add Funds</Link>
            <Link to="/WithdrawCoin">Withdraw Funds</Link>
            <Link to="/Referral">Add Referral</Link>
            <Link to="/Cryptomines">TOKENOMICS</Link>
          </div>
        </div>

        <div className="nav-app">
          <img
            src="https://theclubappe-asad-ghouri.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhamburger.bd56af02.png&w=96&q=75"
            onClick={handleNavHamburgerClick}
          />
          <NavSidebar open={navSidebarOpen} onClose={handleNavCloseSidebar} />
        </div>
      </header>
    </>
  );
}
