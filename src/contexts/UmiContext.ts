import { Umi } from "@metaplex-foundation/umi";
import { Dispatch, SetStateAction, createContext } from "react";

interface UmiValue {
  umi: Umi | null;
  setUmi: Dispatch<SetStateAction<Umi | null>>;
}

export const UmiContext = createContext<UmiValue>({
  umi: null,
  setUmi: () => {},
});
