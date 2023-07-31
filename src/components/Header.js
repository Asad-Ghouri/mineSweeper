import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo_symbol.svg"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="flex">
          <div className="headCbtn"> <ConnectWallet className="" /> </div>
          <div className="links">
            {/* <ConnectWallet className="" /> */}
            <Link to="/">Home</Link>
            <Link to="/DisplayCoin">Add Funds</Link>
            <Link to="/WithdrawCoin">Withdraw Funds</Link>
            <Link to="/Referral">Add Referral</Link>
          </div>
        </div>
      </header>

    </>
  );
}
