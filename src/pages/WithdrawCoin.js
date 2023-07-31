import React,{useEffect,useState} from 'react'
import { useAddress } from "@thirdweb-dev/react";
import Header from "../components/Header";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// import { Relayer } from 'defender-relay-client';
export const WithdrawCoin = () => {

const address = useAddress();

const [isTransactionok , setisTransactionok] = useState(false);

const[getBalance,setGetBalance]=useState();

const firebaseConfig = {
  apiKey: "AIzaSyD4akvNcxkhRCrr0vsqdq7b2cXO1vXKVyQ",
  authDomain: "minesweeper-a5f1c.firebaseapp.com",
  projectId: "minesweeper-a5f1c",
  storageBucket: "minesweeper-a5f1c.appspot.com",
  messagingSenderId: "654858489308",
  appId: "1:654858489308:web:3cb5cead1b143e4c25d319",
  measurementId: "G-MVXNHNDT1M"
};
const [addfunds , setaddfunds] = useState();

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

useEffect(() => {
    const saveWalletValueToDatabase = () => {

var balanceRef = database.ref("users/" + address + "/balance/");
balanceRef.once("value")
  .then(function(snapshot) {
    // The value you are looking for will be in the snapshot object
    var balanceValue = snapshot.val();
    console.log("Balance value:", balanceValue);
    setGetBalance(balanceValue)
    // Now you can use the balanceValue variable as needed
    // For example, you can store it in another variable or use it in your code.
  })
  .catch(function(error) {
    console.error("Error fetching balance:", error);
  });

    };
      saveWalletValueToDatabase()
  }, []);

  const saveTokenValueToDatabase = () => {
    const userRef = firebase.database().ref("users/" + address);
  
    userRef.once("value").then((snapshot) => {
      if (!snapshot.exists()) {
        // Wallet not found, set the balance to 0
        setGetBalance(0)
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

             if(addfunds1 > balanceValue1){
                alert("your amount is greater than availaible")
                return
             }

              const updateValue = balanceValue1 - addfunds1;
              setGetBalance(updateValue)
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

//   const relayer = new Relayer({
//     apiKey: 'BXUWYBBFVypyLcEkEqvhfQ9E7UbByGhN',
//     apiSecret: 'DA2ag1zucSyAma9hryvN6zJoXyTLvtV4DTX1AJNjD5ChtHTBEqchq9Y7MYZwBh5g',
//   });

  async function transferFunds() {
    try {
        // const tx = await relayer.sendTransaction({
        //     to: address,
        //     value: 100000000000, // 1 MATIC
        //     data: '0x',
        //     gasLimit: 21000,
        //     speed: 'fast',
        //   });
          
        //   console.error("done");
        //   console.log("tx is "+ tx); 
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
    return (
        <>
        <Header className="head"/>
        <div className="displaycoin">
        <center> <h2>Your Balance</h2></center>
     <div className="tokenGrid">
          <div className="tokenItem">
             <h3 className='tokenLabel'>Available Balance</h3>
                <p className="tokenValue">                     
                    <b>{getBalance}</b>                
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
          <button onClick={transferFunds}  className="submit-button">Withdraw Funds</button>
        </div>
    </div>
     </div>
        </>
  )
}
