import React from "react";
import { WithdrawCoin } from "./pages/WithdrawCoin";
import Home from "./pages/Home1";
import { DisplayCoin } from "./pages/DisplayCoin";
import { Referral } from "./pages/Referral";
import { Cryptomines } from "./pages/Cryptomines";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Route, Routes } from "react-router-dom";
import {Pvp }from "./pages/Pvp"

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
            <Route path="/Cryptomines" element={<Cryptomines />} />
            <Route path="/pvp" element={<Pvp  />} />
          </Routes>
        </>
      )}
    </>
  );
}
