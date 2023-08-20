import React from "react";
import { Link } from "react-router-dom";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
const NavSidebar = ({ open, onClose }) => {
  return (
    <div className={`nav-sidebar ${open ? "nav-open" : ""}`}>
      <button className="nav-close-btn" onClick={onClose}>
        &times;
      </button>
      <ul className="nav-links">
        <li className="nav-link">
          <ConnectWallet className="" />
        </li>
        <li className="nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/DisplayCoin">Add Funds</Link>
        </li>
        <li className="nav-link">
          <Link to="/WithdrawCoin">Withdraw Funds</Link>
        </li>
        <li className="nav-link">
          <Link to="/Referral">Add Referral</Link>
        </li>
        <li className="nav-link">
          <Link to="/Cryptomines">TOKENOMICS</Link>
        </li>
        <li className="nav-link">
        <Link to="/pvp">PvP</Link>
        </li>

      </ul>
    </div>
  );
};

export default NavSidebar;
