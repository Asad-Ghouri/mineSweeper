import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Cell from "../components/Cell";
import Interface from "../components/Interface";
import Header from "../components/Header";
import Confetti from "react-confetti";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default function Home() {
  const [grid, setGrid] = useState([]);
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const address = useAddress();
  const [betammount, setbetammount] = useState();

  const [approvebet, setapprovebet] = useState(false);
  const [getfvalue, setgetfvalue] = useState();
  const [checktakeMoney, setchecktakeMoney] = useState(false);
  const [takeMoney, settakeMoney] = useState();
  const [incValue, setincValue] = useState(0);

  console.log("bet value is " + betammount);
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

  function inchalf() {
    const val = betammount * 1.5;
    setbetammount(val);
  }
  function incdouble() {
    const val = betammount * 2;
    setbetammount(val);
  }

  const winner = () => {
    const userRef = firebase.database().ref("users/" + address);

    userRef.once("value").then((snapshot) => {
      if (!snapshot.exists()) {
        // Wallet not found, set the balance to 0
        alert("you do not have funds!!");
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
        const balanceRef = firebase
          .database()
          .ref("users/" + address + "/balance");

        balanceRef
          .once("value")
          .then(function (snapshot) {
            const balanceValue = snapshot.val();
            console.log("Current balance value:", balanceValue);

            // If the transaction is not okay, update the balance by adding funds
            const balanceValue1 = parseInt(balanceValue);

            const updateValue = balanceValue1 + 2 * betammount;
            userRef
              .update({ balance: updateValue })
              .then(() => {
                setapprovebet(false);
                console.log("Native token value updated in the database!");
              })
              .catch((error) => {
                console.error("Error updating native token value:", error);
              });
          })
          .catch(function (error) {
            console.error("Error fetching balance:", error);
          });
      }
    });
  };

  function checkForWin() {
    if (win) {
      winner();
      console.log("inside win return is ");

      return win;
    }
    let count = 0;
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.hasBeenClicked) {
          count++;
        }
      });
    });

    if (count === 340) {
      winner();
      console.log("inside setwin return is ");
      setWin(true);
    }
    return win;
  }

  function createGrid() {
    const newGrid = [];
    for (let j = 0; j < 5; j++) {
      const newRow = [];
      for (let i = 0; i < 5; i++) {
        newRow.push({
          id: nanoid(),
          cellNum: i + j * 5,
          type: "cell",
          hasBeenClicked: false,
          adjacentMines: 0,
          coordinates: {
            x: i,
            y: j,
          },

          flagPlaced: false,
          swept: false,
        });
        console.log("inside for loop ");
      }
      newGrid.push(newRow);
    }
    return setMines(newGrid);
  }

  function setMines(array) {
    const randomNums = [];
    for (let i = 0; randomNums.length < 60; i++) {
      const newRandomNum = Math.floor(Math.random() * 400);
      if (!randomNums.includes(newRandomNum)) {
        console.log("inside set mines ");
        randomNums.push(newRandomNum);
      }
    }
    return array.map((subArr) =>
      subArr.map((cell) => {
        if (randomNums.includes(cell.cellNum)) {
          console.log("inside array map ");
          return {
            ...cell,
            isMine: true,
          };
        } else {
          return {
            ...cell,
            isMine: false,
          };
        }
      })
    );
  }

  function createMap() {
    setapprovebet(false);
    setPlay(true);
    setGameOver(false);
    setGrid(createGrid());
  }

  function cellClickHandle(event) {
    if (!gameOver) {
      const coords = {};
      grid.forEach((array, y) => {
        array.forEach((cell, x) => {
          if (cell.cellNum == event.target.dataset.id) {
            console.log("inside cellClickHandle ");
            coords.x = x;
            coords.y = y;
            setincValue((prevValue) => prevValue + 0.1);
            const val = parseFloat(betammount * incValue);
            console.log("type of val is " + typeof val);
            settakeMoney((prevValue) => parseFloat(prevValue) + val);
            console.log("type of takemoney is " + typeof takeMoney);
            console.log("inside cellClickHandle ");
          }
        });
      });
      // if shift-click, set a flag instead
      if (event.ctrlKey) {
        const newGrid = placeFlag(coords);
        setGrid(newGrid);
        return;
      }
      if (checkForMine(coords)) {
        const newGrid = checkForMine(coords);
        setGrid(newGrid);
        setGameOver(true);
        setchecktakeMoney(false);
        setbetammount("");
        // setapprovebet(false);
        return;
      }
      const setup = runSweeper(coords);

      // if (setup.adjMines === 0) {
      //   console.log(setup);
      //   console.log("inside setup ")
      //   cascadeSweep(setup.surroundingCells);
      //   console.log(setup.newGrid[coords.y][coords.x]);
      //   return;
      // }
      setGrid(setup.newGrid);
    }
  }

  function checkSurroundingCells(obj) {
    let count = 0;
    console.log("inside checkSurroundingCells ");
    if (obj.topLeft.isMine) {
      // top left
      count++;
      console.log("inside checkSurroundingCells 1");
    }
    if (obj.top.isMine) {
      // top
      console.log("inside checkSurroundingCells 2");
      count++;
    }
    if (obj.topRight.isMine) {
      // top right
      console.log("inside checkSurroundingCells 3");
      count++;
    }
    if (obj.left.isMine) {
      // left
      count++;
      console.log("inside checkSurroundingCells 4");
    }
    if (obj.right.isMine) {
      // right
      count++;
      console.log("inside checkSurroundingCells 5");
    }
    if (obj.bottomLeft.isMine) {
      // bottom left
      count++;
      console.log("inside checkSurroundingCells 6");
    }
    if (obj.bottom.isMine) {
      // bottom
      count++;
      console.log("inside checkSurroundingCells 7");
    }
    if (obj.bottomRight.isMine) {
      // bottom right
      count++;
      console.log("inside checkSurroundingCells 7");
    }
    return count;
  }

  function getSurroundingCells(coords) {
    // check corners first
    // top-left corner only use 3 values
    if (coords.x === 0 && coords.y === 0) {
      console.log("inside getSurroundingCells ");
      return {
        topLeft: grid.at(coords.y).at(coords.x),
        top: grid.at(coords.y).at(coords.x),
        topRight: grid.at(coords.y).at(coords.x),
        left: grid.at(coords.y).at(coords.x),
        right: grid.at(coords.y).at(coords.x + 1), // here
        bottomLeft: grid.at(coords.y).at(coords.x),
        bottom: grid.at(coords.y + 1).at(coords.x), // here
        bottomRight: grid.at(coords.y + 1).at(coords.x + 1), // here
      };
    }
    // top-right corner
    if (coords.x === 4 && coords.y === 0) {
      console.log("inside 4 4");
      return {
        topLeft: grid.at(coords.y).at(coords.x),
        top: grid.at(coords.y).at(coords.x),
        topRight: grid.at(coords.y).at(coords.x),
        left: grid.at(coords.y).at(coords.x - 1), // here
        right: grid.at(coords.y).at(coords.x),
        bottomLeft: grid.at(coords.y + 1).at(coords.x - 1), // here
        bottom: grid.at(coords.y + 1).at(coords.x), // here
        bottomRight: grid.at(coords.y).at(coords.x),
      };
    }
    // bottom -left corner
    if (coords.x === 0 && coords.y === 4) {
      console.log("inside 4,0 ");

      return {
        topLeft: grid.at(coords.y).at(coords.x),
        top: grid.at(coords.y - 1).at(coords.x), // here
        topRight: grid.at(coords.y - 1).at(coords.x + 1), // here
        left: grid.at(coords.y).at(coords.x),
        right: grid.at(coords.y).at(coords.x + 1), // here
        bottomLeft: grid.at(coords.y).at(coords.x),
        bottom: grid.at(coords.y).at(coords.x),
        bottomRight: grid.at(coords.y).at(coords.x),
      };
    }
    // bottom-right corner
    if (coords.x === 4 && coords.y === 4) {
      return {
        topLeft: grid.at(coords.y - 1).at(coords.x - 1), // here
        top: grid.at(coords.y - 1).at(coords.x), // here
        topRight: grid.at(coords.y).at(coords.x),
        left: grid.at(coords.y).at(coords.x - 1), // here
        right: grid.at(coords.y).at(coords.x),
        bottomLeft: grid.at(coords.y).at(coords.x),
        bottom: grid.at(coords.y).at(coords.x),
        bottomRight: grid.at(coords.y).at(coords.x),
      };
    }
    // if on bottom row, don't use indices over 19
    if (coords.y + 1 > 4) {
      return {
        topLeft: grid.at(coords.y - 1).at(coords.x - 1),
        top: grid.at(coords.y - 1).at(coords.x),
        topRight: grid.at(coords.y - 1).at(coords.x + 1),
        left: grid.at(coords.y).at(coords.x - 1),
        right: grid.at(coords.y).at(coords.x + 1),
        bottomLeft: grid.at(coords.y).at(coords.x), // here
        bottom: grid.at(coords.y).at(coords.x), // here
        bottomRight: grid.at(coords.y).at(coords.x), // here
      };
      // if on top row, don't use negative indices
    }
    if (coords.y === 0) {
      return {
        topLeft: grid.at(coords.y).at(coords.x), // here
        top: grid.at(coords.y).at(coords.x), // here
        topRight: grid.at(coords.y).at(coords.x), // here
        left: grid.at(coords.y).at(coords.x - 1),
        right: grid.at(coords.y).at(coords.x + 1),
        bottomLeft: grid.at(coords.y + 1).at(coords.x - 1),
        bottom: grid.at(coords.y + 1).at(coords.x),
        bottomRight: grid.at(coords.y + 1).at(coords.x + 1),
      };
      // if on left-most column, don't use negative indices
    }
    if (coords.x === 0) {
      return {
        topLeft: grid.at(coords.y).at(coords.x), // here
        top: grid.at(coords.y - 1).at(coords.x),
        topRight: grid.at(coords.y - 1).at(coords.x + 1),
        left: grid.at(coords.y).at(coords.x), // here
        right: grid.at(coords.y).at(coords.x + 1),
        bottomLeft: grid.at(coords.y).at(coords.x), // here
        bottom: grid.at(coords.y + 1).at(coords.x),
        bottomRight: grid.at(coords.y + 1).at(coords.x + 1),
      };
      // if on right most column, don't use indices over 19
    }
    if (coords.x + 1 > 4) {
      return {
        topLeft: grid.at(coords.y - 1).at(coords.x - 1),
        top: grid.at(coords.y - 1).at(coords.x),
        topRight: grid.at(coords.y).at(coords.x), // here
        left: grid.at(coords.y).at(coords.x - 1),
        right: grid.at(coords.y).at(coords.x), // here
        bottomLeft: grid.at(coords.y + 1).at(coords.x - 1),
        bottom: grid.at(coords.y + 1).at(coords.x),
        bottomRight: grid.at(coords.y).at(coords.x), // here
      };
    }
    return {
      topLeft: grid.at(coords.y - 1).at(coords.x - 1),
      top: grid.at(coords.y - 1).at(coords.x),
      topRight: grid.at(coords.y - 1).at(coords.x + 1),
      left: grid.at(coords.y).at(coords.x - 1),
      right: grid.at(coords.y).at(coords.x + 1),
      bottomLeft: grid.at(coords.y + 1).at(coords.x - 1),
      bottom: grid.at(coords.y + 1).at(coords.x),
      bottomRight: grid.at(coords.y + 1).at(coords.x + 1),
    };
  }

  function checkForMine(coords) {
    if (grid[coords.y][coords.x].isMine) {
      const newGrid = [...grid];
      newGrid[coords.y][coords.x].hasBeenClicked = true;
      return newGrid;
    }
    return false;
  }

  function runSweeper(coords) {
    const newGrid = [...grid];
    const surroundingCells = getSurroundingCells(coords);
    const adjMines = checkSurroundingCells(surroundingCells);
    newGrid[coords.y][coords.x].adjacentMines = adjMines;
    newGrid[coords.y][coords.x].hasBeenClicked = true;

    return {
      adjMines,
      surroundingCells,
      newGrid,
    };
  }

  function placeFlag(coords) {
    const newGrid = [...grid];
    newGrid[coords.y][coords.x].flagPlaced = true;
    return newGrid;
  }

  function cascadeSweep(surroundingCells) {
    const newGrid = [...grid];
    for (const cell in surroundingCells) {
      const thisCoord = {
        ...surroundingCells[cell].coordinates,
      };
      const surrounding = getSurroundingCells(thisCoord);
      const adjM = checkSurroundingCells(surrounding);
      newGrid[thisCoord.y][thisCoord.x].hasBeenClicked = true;
      newGrid[thisCoord.y][thisCoord.x].adjacentMines = adjM;

      if (adjM === 0 && !grid[thisCoord.y][thisCoord.x].swept) {
        newGrid[thisCoord.y][thisCoord.x].swept = true;
        cascadeSweep(surrounding);
      }
    }
    setGrid(newGrid);
  }

  const bet = () => {
    const userRef = firebase.database().ref("users/" + address);
    settakeMoney(betammount);
    userRef.once("value").then((snapshot) => {
      if (!snapshot.exists()) {
        // Wallet not found, set the balance to 0
        alert("you do not have funds!!");
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
        const balanceRef = firebase
          .database()
          .ref("users/" + address + "/balance");

        balanceRef
          .once("value")
          .then(function (snapshot) {
            const balanceValue = snapshot.val();
            console.log("Current balance value:", balanceValue);

            // If the transaction is not okay, update the balance by adding funds
            const balanceValue1 = parseInt(balanceValue);

            if (betammount > balanceValue1) {
              alert("your available balance is less");
              return;
            }
            setapprovebet(true);
            setchecktakeMoney(true);
            const updateValue = balanceValue1 - betammount;
            userRef
              .update({ balance: updateValue })
              .then(() => {
                console.log("Native token value updated in the database!");
              })
              .catch((error) => {
                console.error("Error updating native token value:", error);
              });
          })
          .catch(function (error) {
            console.error("Error fetching balance:", error);
          });
        // setbetammount("")
      }
    });
  };

  useEffect(() => {
    const saveTokenValueToDatabase = () => {
      const userRef = firebase.database().ref("users/" + address);

      userRef.once("value").then((snapshot) => {
        if (!snapshot.exists()) {
          // Wallet not found, set the balance to 0
          setgetfvalue(0);
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
        } else {
          // Wallet found, fetch the current balance from the database
          const balanceRef = firebase
            .database()
            .ref("users/" + address + "/balance");

          balanceRef
            .once("value")
            .then(function (snapshot) {
              const balanceValue = snapshot.val();
              console.log("Current balance value:", balanceValue);
              setgetfvalue(balanceValue);
            })
            .catch(function (error) {
              console.error("Error fetching balance:", error);
            });
        }
      });
    };

    saveTokenValueToDatabase();
  }, [setchecktakeMoney, checktakeMoney, address]);

  const profitadd = () => {
    const userRef = firebase.database().ref("users/" + address);

    userRef.once("value").then((snapshot) => {
      if (!snapshot.exists()) {
        // Wallet not found, set the balance to 0
        setgetfvalue(0);
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
        const balanceRef = firebase
          .database()
          .ref("users/" + address + "/balance");

        balanceRef
          .once("value")
          .then(function (snapshot) {
            const balanceValue = snapshot.val();
            console.log("Current balance value:", balanceValue);
            setchecktakeMoney(false);
            const updateValue1 = parseFloat(balanceValue);
            const updateValue2 = parseFloat(takeMoney);
            const updateValue = updateValue1 + updateValue2;
            userRef
              .update({ balance: updateValue })
              .then(() => {
                console.log("Native token value updated in the database!");
              })
              .catch((error) => {
                console.error("Error updating native token value:", error);
              });
          })
          .catch(function (error) {
            console.error("Error fetching balance:", error);
          });
      }
    });
  };

  return (
    <>
      {!address ? (
        <>
          <div className="getstarted">
            <h3>Get Started</h3>
            <br />
            <p> Becoming a VIP is an easy and rewarding process</p>
            <br />
            <br />
            <br />
          </div>
          <div className="vip-section-wrapper svelte-ogd9ct">
            <section className="vip-section svelte-kq5ssb">
              <div className="vip-section-icon svelte-kq5ssb">
                <img src="https://stake.com/_app/immutable/assets/Step1.387bc52a.jpg" />
              </div>
              <h3
                className="weight-semibold line-height-responsive align-left size-md text-size-md responsive-type-scale variant-highlighted svelte-1myjzud style-wQGHT"
                id="style-wQGHT"
              >
                Step 1
              </h3>
              <p
                className="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle svelte-1myjzud style-vKp6o"
                id="style-vKp6o"
              >
                Instantly Connect Wallet and start betting on either the casino
                or sports book.
              </p>
            </section>
            <section className="vip-section svelte-kq5ssb">
              <div className="vip-section-icon svelte-kq5ssb">
                <img src="https://stake.com/_app/immutable/assets/Step2.846182e2.jpg" />
              </div>
              <h3
                className="weight-semibold line-height-responsive align-left size-md text-size-md responsive-type-scale variant-highlighted svelte-1myjzud style-mjidI"
                id="style-mjidI"
              >
                Step 2
              </h3>
              <p
                className="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle svelte-1myjzud style-4Qv9p"
                id="style-4Qv9p"
              >
                Every bet counts towards your VIP progress. Reach new levels and
                unlock further benefits.
              </p>
            </section>
            <section className="vip-section svelte-kq5ssb">
              <div className="vip-section-icon svelte-kq5ssb">
                <img src="https://stake.com/_app/immutable/assets/Step3.78df2edc.jpg" />
              </div>
              <h3
                className="weight-semibold line-height-responsive align-left size-md text-size-md responsive-type-scale variant-highlighted svelte-1myjzud style-GJ57K"
                id="style-GJ57K"
              >
                Step 3
              </h3>
              <p
                className="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle svelte-1myjzud style-lNzVN"
                id="style-lNzVN"
              >
                Instantly claim your bonuses. Daily, weekly and monthly bonuses
                are simple and easy to claim.
              </p>
            </section>
          </div>
          <div className="conbtn">
            {" "}
            <ConnectWallet className="connectbtn" />{" "}
          </div>
        </>
      ) : (
        <>
          {/* <header>
      <p>Use CTRL-click to set a flag 🚩</p>
    </header> */}
          <Header />
          <main>
            {!play ? (
              <Interface handleClick={createMap} id="create-table" />
            ) : (
              <div className="fullgame">
                <div className="sidebar">
                  <button className="submit-button betbtn">
                    Balance : {getfvalue}
                  </button>
                  <div className="auto">
                    <button className="submit-button betbtn"> Auto </button>
                  </div>
                  <br />
                  <div className="betamount">
                    <p> Bet Amount </p>
                    <div className="input">
                      <input
                        type="number"
                        value={betammount}
                        onChange={(e) => {
                          setbetammount(e.target.value);
                        }}
                      />
                      <span onClick={inchalf}>1/2</span>
                      <span onClick={incdouble}>2</span>
                    </div>
                    <button onClick={bet} className="submit-button betbtn">
                      Bet
                    </button>
                    <div className="takeMoney">
                      {checktakeMoney ? (
                        <>
                          <div className="tak">
                            <button
                              className="submit-button betbtn"
                              onClick={profitadd}
                            >
                              {" "}
                              Take Money : {takeMoney.toString().slice(0, 8)}
                            </button>
                            <span></span>
                          </div>
                        </>
                      ) : undefined}
                    </div>
                  </div>
                </div>
                {!approvebet ? (
                  <section className="game-container">
                    {grid.map((item) =>
                      item.map((cell) => {
                        return (
                          <div
                            onClick={() => {
                              alert("make a bet");
                            }}
                          >
                            <Cell
                              key={cell.id}
                              cellNum={cell.cellNum}
                              type={cell.type}
                              isMine={cell.isMine}
                              adjacentMines={cell.adjacentMines}
                              flagPlaced={cell.flagPlaced}
                              swept={cell.swept}
                            />
                          </div>
                        );
                      })
                    )}
                  </section>
                ) : (
                  <section className="game-container">
                    {grid.map((item) =>
                      item.map((cell) => {
                        return (
                          <Cell
                            key={cell.id}
                            cellNum={cell.cellNum}
                            type={cell.type}
                            clicked={cell.hasBeenClicked}
                            handleClick={cellClickHandle}
                            isMine={cell.isMine}
                            adjacentMines={cell.adjacentMines}
                            flagPlaced={cell.flagPlaced}
                            swept={cell.swept}
                          />
                        );
                      })
                    )}
                  </section>
                )}
              </div>
            )}
            {checkForWin() && (
              <>
                <Confetti />
                <button className="btn" onClick={createMap}>
                  You won! Play again?
                </button>
              </>
            )}
            {gameOver && (
              <button className="btn" onClick={createMap}>
                Oh no! You lost! Play again?
              </button>
            )}
          </main>
        </>
      )}
    </>
  );
}
