import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo_symbol.svg";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
// import NavSidebar1 from "./NavSidebar";
export default function Header1() {
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
        </div>
        <div className="flex">
          <div className="headCbtn">
            {" "}
            <ConnectWallet className="" />{" "}
            <Link to="/Cryptomines">Cryptomines</Link>
          </div>
          <div className="links">
            {/* <ConnectWallet className="" /> */}
            {/* <Link to="/">Home</Link>
            <Link to="/DisplayCoin">Add Funds</Link>
            <Link to="/WithdrawCoin">Withdraw Funds</Link>
            <Link to="/Referral">Add Referral</Link> */}
          </div>
        </div>
      </header>
    </>
  );
}
