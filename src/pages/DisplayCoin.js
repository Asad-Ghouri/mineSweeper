import React,{useEffect,useState} from 'react'
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { ConnectWallet,useAddress } from "@thirdweb-dev/react";
import { useBalance } from "@thirdweb-dev/react";
import Header from "../components/Header";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export const DisplayCoin = () => {
const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
const address = useAddress();

const [addfunds , setaddfunds] = useState();

const [isTransactionok , setisTransactionok] = useState(false);

const [getfvalue , setgetfvalue] = useState();

console.log("fetch value is "+getfvalue)
const nativeTokenValue = data?.displayValue;
console.log("nativeTokenValue "+ nativeTokenValue)

console.log("input account is  "+ addfunds)

const firebaseConfig = {
  apiKey: "AIzaSyD4akvNcxkhRCrr0vsqdq7b2cXO1vXKVyQ",
  authDomain: "minesweeper-a5f1c.firebaseapp.com",
  projectId: "minesweeper-a5f1c",
  storageBucket: "minesweeper-a5f1c.appspot.com",
  messagingSenderId: "654858489308",
  appId: "1:654858489308:web:3cb5cead1b143e4c25d319",
  measurementId: "G-MVXNHNDT1M"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const sdk = ThirdwebSDK.fromPrivateKey(
    "fd9b29441275bc65a4e2cdfbb4e8c5f7f0cc2e3adabd277e378499966e2f74da", // DANGER: This is a sensitive value that should be stored securely.
    "ethereum",
    {
      clientId: "bec7d66eea65ca6425d3607f72b43b02", // Use client id if using on the client side, get it from dashboard settings
      secretKey: "TKA9WkIgDA69bKcApP8I6Iqby7aeEjdZLYCWpa0ELJagAroh7x2l_DszqI-iz2oCvjHrz6UHG7QqVDVVqeWe9g", // Use secret key if using on the server, get it from dashboard settings
    },
  );

  const saveTokenValueToDatabase = () => {
    const userRef = firebase.database().ref("users/" + address);
  
    userRef.once("value").then((snapshot) => {
      if (!snapshot.exists()) {
        // Wallet not found, set the balance to 0
        setgetfvalue(0)
        userRef
          .set({ balance: 0 })
          .then(() => {
            console.log("Wallet not found. Balance set to 0 in the database.");
          })
          .catch((error) => {
            console.error("Error setting balance to 0:", error);
          });
      } else {
        // Wallet found, fetch the current balance from the database
        const balanceRef = firebase.database().ref("users/" + address + "/balance");
  
        balanceRef
          .once("value")
          .then(function (snapshot) {
            const balanceValue = snapshot.val();
            console.log("Current balance value:", balanceValue);
  
            if (isTransactionok) {
              // If the transaction is not okay, update the balance by adding funds
             const addfunds1 = parseInt(addfunds)
             const balanceValue1 = parseInt(balanceValue)

              const updateValue = balanceValue1 + addfunds1;
              setgetfvalue(updateValue)
              userRef
                .update({ balance: updateValue })
                .then(() => {
                  console.log("Native token value updated in the database!");
                })
                .catch((error) => {
                  console.error("Error updating native token value:", error);
                });
            } else {
              // If the transaction is okay, do not change the balance
              console.log("Transaction is okay. Balance remains unchanged.");
            }
          })
          .catch(function (error) {
            console.error("Error fetching balance:", error);
          });
      }
    });
  };
  async function transferFunds() {
    try {
      const txResult = await sdk.wallet.transfer(address, addfunds);
      // If the transfer is successful, return true
      console.error("done");
      setisTransactionok(true)
      saveTokenValueToDatabase()
      return true;
    } catch (error) {
      // If there's an error during the transfer, you can log it or handle it here
      console.error("Error during transfer:", error);
      // Return false to indicate that the transfer was not successful
      setisTransactionok(false)
      return false;
    }
  }

  
useEffect(() => {

    const saveTokenValueToDatabase = () => {
        const userRef = firebase.database().ref("users/" + address);
      
        userRef.once("value").then((snapshot) => {
          if (!snapshot.exists()) {
            // Wallet not found, set the balance to 0
            setgetfvalue(0)
            userRef
              .set({ balance: 0 })
              .then(() => {
                console.log("Wallet not found. Balance set to 0 in the database.");
              })
              .catch((error) => {
                console.error("Error setting balance to 0:", error);
              });
          } 
          else {
            // Wallet found, fetch the current balance from the database
            const balanceRef = firebase.database().ref("users/" + address + "/balance");
      
            balanceRef
              .once("value")
              .then(function (snapshot) {
                const balanceValue = snapshot.val();
                console.log("Current balance value:", balanceValue);
      
                if (isTransactionok) {
                  // If the transaction is not okay, update the balance by adding funds
                 const addfunds1 = parseInt(addfunds)
                 const balanceValue1 = parseInt(balanceValue)
    
                  const updateValue = balanceValue1 + addfunds1;
                  setgetfvalue(updateValue)
                  userRef
                    .update({ balance: updateValue })
                    .then(() => {
                      console.log("Native token value updated in the database!");
                    })
                    .catch((error) => {
                      console.error("Error updating native token value:", error);
                    });
                } else {
                    const balanceValue1 = parseInt(balanceValue)
       
                     setgetfvalue(balanceValue1)
                  // If the transaction is okay, do not change the balance
                  console.log("Transaction is okay. Balance remains unchanged.");
                }
              })
              .catch(function (error) {
                console.error("Error fetching balance:", error);
              });
          }
        });
      };

  saveTokenValueToDatabase()
  }, []);



    return (
        <>
        <Header className="head"/>
    <div className="displaycoin">
       <center> <h2>Your Balance</h2></center>
        <div className="tokenGrid">
         <div className="tokenItem">
            <h3 className='tokenLabel'>Current Balance</h3>
               <p className="tokenValue">                     
                   <b>{getfvalue}</b>                
                            </p>
            </div>     
        </div>
        <div className="container">
      <form className="form-container">
        <div>
          <input
            required
            id="name"
            label="Name"
            placeholder="Enter your amount"
            variant="outlined"
            className="form-input"
            type="number"
            onChange={(e)=>{
                setaddfunds(e.target.value)
            }}
          />
        </div>
      </form>
        <div>
          <button onClick={transferFunds}  className="submit-button">Add Funds</button>
        </div>
    </div>
    </div>
        </>
  )
}
