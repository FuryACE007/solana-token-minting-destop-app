import { KeypairSigner } from "@metaplex-foundation/umi";
import { Dispatch, SetStateAction, createContext } from "react";

interface WalletObj {
  wallet: KeypairSigner | null;
  setWallet: Dispatch<SetStateAction<KeypairSigner | null>>;
}

export const WalletContext = createContext<WalletObj>({
  wallet: null,
  setWallet: () => {},
});
