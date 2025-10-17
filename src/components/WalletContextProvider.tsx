"use client";

import React, { ReactNode, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";


import "@solana/wallet-adapter-react-ui/styles.css";
import Image from "next/image";

const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <div className="min-h-screen bg-lime-100">
            <header className="bg-lime-50 shadow-sm px-5 py-4 border-b border-gray-400">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Image src="image.png" alt="NotesChain Logo" className="w-12 h-12 object-contain"/>
                  <h1 className="text-2xl font-bold text-gray-800">NotesChain</h1>
                </div>
                <WalletMultiButton />
              </div>
            </header>
            <main className="p-5 mx-auto w-full lg:w-[50%] flex flex-col justify-center">
              {children}
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;