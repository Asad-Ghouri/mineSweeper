import React from "react";
import { WithdrawCoin } from "./pages/WithdrawCoin";
import Home from "./pages/Home1";
import { DisplayCoin } from "./pages/DisplayCoin";
import { Referral } from "./pages/Referral";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const address = useAddress;
  return (
    <>
      {!address ? (
        <div className="cwallet">
          <ConnectWallet className="connectbtn" />
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/DisplayCoin" element={<DisplayCoin />} />
            <Route path="/WithdrawCoin" element={<WithdrawCoin />} />
            <Route path="/Referral" element={<Referral />} />
          </Routes>
        </>
      )}
    </>
  );
}
