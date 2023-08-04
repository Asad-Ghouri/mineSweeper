import React from "react";
import Header from "../components/Header";
import Header1 from "../components/Header1";
import { useAddress } from "@thirdweb-dev/react";
export const Cryptomines = () => {
  const address = useAddress();
  return (
    <div>
      {address ? <Header /> : <Header1 />}
      <div className="bg1">
        <div className="bg2">
          <div className="parMain">
            <div className="relative inline-flex xl:flex-row lg:flex-row flex-col justify-stretch items-stretch border-paper border-8 g1 gradient p-3 shadow-shadow rounded-md shadow-xl">
              <span className="inline-flex flex-col relative container mx-auto gap-5 flex-1 p-8">
                <div className="absolute top-0 right-0 bottom-0 left-[50%] h-full z-10 -translate-x-[50%] w-full flex flex-row justify-center items-center flex-wrap overflow-hidden">
                  <div></div>
                </div>
                <h4 className="font-heading text-3xl text-text z-50 backdrop-blur-lg p-3 rounded">
                  TOKENOMICS
                </h4>
                <p className="font-body xl:text-4xl lg:text-4xl text-2xl text-text z-50 text-center backdrop-blur-lg rounded">
                  $MINES Stealth/Fair launch 100% of tokens added to LP LP is
                  locked for 2 weeks while we're in beta Contract: 0x....
                  Supply: 100,000,000 Tax: 4/4 2.5% Max wallet Mine holders will
                  receive game revenue distributed at the end of every month in
                  proportion to their $MINES holdings.
                </p>
              </span>
            </div>
          </div>

          <div className="parMain">
            <div className="relative inline-flex xl:flex-row lg:flex-row flex-col justify-stretch items-stretch border-paper border-8 g2 gradient p-3 shadow-shadow rounded-md shadow-xl">
              <span className="inline-flex flex-col relative container mx-auto gap-5 flex-1 p-8">
                <div className="absolute top-0 right-0 bottom-0 left-[50%] h-full z-10 -translate-x-[50%] w-full flex flex-row justify-center items-center flex-wrap overflow-hidden">
                  <div></div>
                </div>
                <h4 className="font-heading text-3xl text-text z-50 backdrop-blur-lg p-3 rounded">
                  To play
                </h4>
                <p className="font-body xl:text-4xl lg:text-4xl text-2xl text-text z-50 text-center backdrop-blur-lg rounded">
                  Place your bet in ETH and click the play button. Every tile
                  flipped over that isn't a mine will add to your winnings, and
                  a mine will end the game. Cash out at any time, or try to
                  clear the board if you dare. GOOD LUCK
                </p>
              </span>
            </div>
          </div>

          <div className="lin parMain">
            <div className="relative inline-flex xl:flex-row lg:flex-row flex-col justify-stretch items-stretch border-paper border-8 gradient p-3 shadow-shadow rounded-md shadow-xl">
              <span className="inline-flex flex-col relative container mx-auto gap-5 flex-1 p-8">
                <div className="absolute top-0 right-0 bottom-0 left-[50%] h-full z-10 -translate-x-[50%] w-full flex flex-row justify-center items-center flex-wrap overflow-hidden"></div>
                <p className="xl:text-4xl lg:text-4xl ff text-2xl text-text z-50 backdrop-blur-lg rounded">
                  Make sure to join us
                </p>
              </span>
              <div className="flex-1 flex-col justify-center items-stretch w-full h-full">
                <div className="w-full linksforMob flex xl:flex-row lg:flex-row flex-col items-center justify-evenly bg-paper border-text shadow-shadow shadow-xl border-2">
                  <a
                    className="flex flex-col hover:bg-secondary justify-center items-center h-40 w-40"
                    href="https://t.me/TetrisPVP"
                  >
                    <span id="style-3Kvsp" className="style-3Kvsp">
                      <span id="style-29Efi" className="style-29Efi">
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2750%27%20height=%2750%27/%3E"
                          id="style-FtjSM"
                          className="style-FtjSM"
                        />
                      </span>
                      <img
                        src="https://www.tetriseth.live/icons/telegram.svg"
                        id="style-JKNiG"
                        className="style-JKNiG"
                      />
                    </span>
                    <p className="font-heading text-text text-2xl">Telegram</p>
                  </a>
                  <a
                    className="flex flex-col hover:bg-secondary justify-center items-center h-40 w-40"
                    href="https://twitter.com/tetris_eth"
                  >
                    <span id="style-nmod5" className="style-nmod5">
                      <span id="style-AHbzW" className="style-AHbzW">
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2750%27%20height=%2750%27/%3E"
                          id="style-GsbEF"
                          className="style-GsbEF"
                        />
                      </span>
                      <img
                        src="https://www.tetriseth.live/icons/twitter.svg"
                        id="style-MxUaZ"
                        className="style-MxUaZ"
                      />
                    </span>
                    <p className="font-heading text-text text-2xl">TWITTER</p>
                  </a>
                  <a
                    className="flex flex-col hover:bg-secondary justify-center items-center h-40 w-40"
                    href="https://www.lbank.com/en-US/trade/tetris_usdt/"
                  >
                    <span id="style-Ax3ri" className="style-Ax3ri">
                      <span id="style-AGXi3" className="style-AGXi3">
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2750%27%20height=%2750%27/%3E"
                          id="style-K5Rys"
                          className="style-K5Rys"
                        />
                      </span>
                      <img
                        src="https://www.tetriseth.live/icons/LBANK.svg"
                        id="style-HPYs5"
                        className="style-HPYs5"
                      />
                    </span>
                    <p className="font-heading text-text text-2xl">L BANK</p>
                  </a>
                  <a
                    className="flex flex-col hover:bg-secondary justify-center items-center h-40 w-40"
                    href="https://www.coingecko.com/en/coins/tetris"
                  >
                    <span id="style-Ha8si" className="style-Ha8si">
                      <span id="style-UD3co" className="style-UD3co">
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2750%27%20height=%2750%27/%3E"
                          id="style-DzWox"
                          className="style-DzWox"
                        />
                      </span>
                      <img
                        src="https://www.tetriseth.live/icons/coingecko.svg"
                        id="style-oRSXl"
                        className="style-oRSXl"
                      />
                    </span>
                    <p className="font-heading text-text text-2xl">
                      COIN GECKO
                    </p>
                  </a>
                  <a
                    className="flex flex-col hover:bg-secondary justify-center items-center h-40 w-40"
                    href="https://www.dextools.io/app/en/ether/pair-explorer/0xCb8a95e76A16b58C30B01e39Dd6AAD5949E5E802"
                  >
                    <span id="style-vIzwv" className="style-vIzwv">
                      <span id="style-XNGYL" className="style-XNGYL">
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2750%27%20height=%2750%27/%3E"
                          id="style-WyTEi"
                          className="style-WyTEi"
                        />
                      </span>
                      <img
                        src="https://www.tetriseth.live/icons/dextools.svg"
                        id="style-xWC2k"
                        className="style-xWC2k"
                      />
                    </span>
                    <p className="font-heading text-text text-2xl">Dextools</p>
                  </a>
                  {/* <a className="flex flex-col hover:bg-secondary justify-center items-center h-40 w-40" href="https://etherscan.io/token/0xCb8a95e76A16b58C30B01e39Dd6AAD5949E5E802#code">
                                <span id="style-5X95w" className="style-5X95w">
                                    <span id="style-efUUP" className="style-efUUP">
                                        <img src="data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2750%27%20height=%2750%27/%3E" id="style-mKOxk" className="style-mKOxk" />
                                    </span>
                                    <img src="https://www.tetriseth.live/icons/etherscan.svg" id="style-914aT" className="style-914aT" />
                                </span>
                                <p className="font-heading text-text text-2xl">
                                    Etherscan
                                </p>
                            </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};
