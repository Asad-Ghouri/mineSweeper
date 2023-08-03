import React from "react";
import Img1 from "../images/img1.jpeg"
import Img2 from "../images/img2.jpeg"
import Img3 from "../images/img3.jpeg"
import Img4 from "../images/img4.jpeg"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export const WithoutConnect = () => {
    return (
        <>
            <div className="bg1 wc">
                <div className="bg2 wc">

                    <div className="parMain mainPara1">
                        <div className="relative inline-flex xl:flex-row lg:flex-row flex-col justify-stretch items-stretch border-paper border-8 gradient p-3 shadow-shadow rounded-md shadow-xl">
                            <span className="inline-flex flex-col relative container mx-auto gap-5 flex-1 p-8">
                                <div className="absolute top-0 right-0 bottom-0 left-[50%] h-full z-10 -translate-x-[50%] w-full flex flex-row justify-center items-center flex-wrap overflow-hidden">
                                    <div>
                                    </div>

                                </div>
                                <h4 className="font-heading text-3xl text-text z-50 backdrop-blur-lg p-3 rounded">
                                    Crypto Mines
                                </h4>
                                <p className="font-body xl:text-4xl lg:text-4xl text-2xl text-text z-50 text-center backdrop-blur-lg rounded">
                                    Welcome to Crypto Mines, an interactive game of chance inspired by the classic game of Minesweeper but with a twist! You can bet on your outcome.
                                    Holding $MINES will allow you to receive game revenue distributed at the end of every month!CryptoMines  Real Yield
                                </p>
                            </span>
                        </div>
                    </div>
                    <div className="conbtn">
                        {" "}
                        <ConnectWallet className="connectbtn" />{" "}
                    </div>



                </div>

            </div>

        </>
    );
};
