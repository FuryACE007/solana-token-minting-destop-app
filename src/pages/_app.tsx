import { UmiContext } from "@/contexts/UmiContext";
import { WalletContext } from "@/contexts/WalletContext";
import { useUmi } from "@/useUmi";
import { KeypairSigner, Umi, generateSigner } from "@metaplex-foundation/umi";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [umi, setUmi] = useState<Umi | null>(useUmi());
  const [wallet, setWallet] = useState<KeypairSigner | null>(null);
  return (
    <UmiContext.Provider value={{ umi, setUmi }}>
      <WalletContext.Provider value={{ wallet, setWallet }}>
        <Component {...pageProps} />
      </WalletContext.Provider>
    </UmiContext.Provider>
  );
}
