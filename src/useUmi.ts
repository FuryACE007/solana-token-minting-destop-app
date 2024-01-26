/* This is a custom hook to reduce the repeated configuration of the umi instance */

import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import type { Umi } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { useMemo } from "react";

export function useUmi(): Umi {
  //   const wallet = useWallet();
  const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;

  if (!rpcEndpoint) {
    throw new Error("RPC endpoint is not defined. ");
  }

  const umi = useMemo(() => {
    return (
      createUmi(rpcEndpoint)
        //   .use(walletAdapterIdentity(wallet))
        .use(mplTokenMetadata())
        .use(
          irysUploader({
            address: "https://devnet.irys.xyz",
          })
        )
    );
    //   }, [wallet]);
  }, []);

  if (!umi) {
    throw new Error(
      "Umi context was not initialized. " +
        "Did you forget to wrap your app with <UmiProvider />?"
    );
  }
  return umi;
}
