import React, { useState, useEffect } from "react";
import Header from "../components/Header";

import firebase from "firebase/compat/app";
import "firebase/compat/database";

import { useAddress } from "@thirdweb-dev/react";

export const Referral = () => {
  const address = useAddress(); // Replace with actual user address

  useEffect(() => {
    const saveTokenValueToDatabase = () => {
      const userRef = firebase.database().ref("users/" + address);

      userRef.once("value").then((snapshot) => {
        if (!snapshot.exists()) {
          // Wallet not found, set the balance to 0

          userRef
            .set({ balance: 0 })
            .then(() => {
              console.log(
                "Wallet not found. Balance set to 0 in the database."
              );
            })
            .catch((error) => {
              console.error("Error setting balance to 0:", error);
            });
        }
      });
    };

    saveTokenValueToDatabase();
  }, []);
  const firebaseConfig = {
    apiKey: "AIzaSyD4akvNcxkhRCrr0vsqdq7b2cXO1vXKVyQ",
    authDomain: "minesweeper-a5f1c.firebaseapp.com",
    projectId: "minesweeper-a5f1c",
    storageBucket: "minesweeper-a5f1c.appspot.com",
    messagingSenderId: "654858489308",
    appId: "1:654858489308:web:3cb5cead1b143e4c25d319",
    measurementId: "G-MVXNHNDT1M",
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  const [referralCode, setReferralCode] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    // Get the user's address (you may implement this based on your application)
    const userAddressFromServer = address; // Replace with actual user address
    setUserAddress(userAddressFromServer);

    // Listen for changes in the referral list and update the state
    const referralRef = firebase
      .database()
      .ref(`users/${userAddressFromServer}/referrals`);
    referralRef.on("value", (snapshot) => {
      const referralList = snapshot.val();
      if (referralList) {
        setReferrals(Object.values(referralList));
      } else {
        setReferrals([]);
      }
    });

    return () => {
      // Clean up the Firebase listener when the component unmounts
      referralRef.off();
    };
  }, [address, userAddress]);

  const submitReferral = () => {
    if (referralCode.length < 40) {
      alert("Enter valid address");
      return;
    }

    if (userAddress) {
      // Store the referral code in Firebase
      const referralRef = firebase
        .database()
        .ref(`users/${userAddress}/referrals`);
      referralRef.push(referralCode);
      setReferralCode("");
    } else {
      alert("User address not available. Please provide the user address.");
    }
  };
  return (
    <div>
      <Header />
      <div class="containerR">
        <h1 className="h1R">Referral Program</h1>
        <p className="pR">Refer a friend and earn rewards!</p>
        <div class="input-container">
          <input
            type="text"
            id="referral-code"
            pattern=".{40,}"
            title="Please enter at least 40 characters"
            className="Rinput"
            placeholder="Enter your referral code"
            value={referralCode}
            onChange={(e) => {
              setReferralCode(e.target.value);
            }}
          />
          <button
            className="buttonR"
            type="button"
            id="submit-btn"
            onClick={submitReferral}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="referral-list">
        <h2>Referral List:</h2>
        <ul>
          {referrals.map((referral, index) => (
            <li key={index}>{`${userAddress} referred: ${referral}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
