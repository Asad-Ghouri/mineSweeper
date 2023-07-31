import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <header>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/DisplayCoin">Add Funds</Link>
          <Link to="/WithdrawCoin">Withdraw Funds</Link>
        </div>
      </header>
    </>
  );
}
