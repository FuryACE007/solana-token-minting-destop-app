import { UmiContext } from "@/contexts/UmiContext";
import { WalletContext } from "@/contexts/WalletContext";
import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { useRouter } from "next/router";
import React, {
  RefObject,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadWallet = () => {
  console.log(
    "bike crystal argue project bachelor upset rubber tomato ship cannon yellow faint"
  );
  const words = new Array(12)
    .fill(null)
    .map(() => createRef<HTMLInputElement>());

  const [isClient, setIsClient] = useState(false);
  const [mnemonic, setMnemonic] = useState("");

  const { umi, setUmi } = useContext(UmiContext);
  const { wallet, setWallet } = useContext(WalletContext);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (wallet?.publicKey && umi) {
      // console.log("Wallet check:", wallet.publicKey);
      setUmi(umi?.use(signerIdentity(wallet)));
      router.push("/createToken");
    }
  }, [wallet]);

  if (!isClient) {
    return <div>Is Loading</div>; // Or some placeholder content
  }

  async function handleWords(words: RefObject<HTMLInputElement>[]) {
    const phrase = words
      .map((wordRef: RefObject<HTMLInputElement>) => wordRef.current?.value)
      .filter((word) => word !== "" && word !== null)
      .join(" ");

    const uniqueWords = Array.from(new Set(phrase.split(" ")));

    if (uniqueWords.length !== 12) {
      toast.error("❌ Words aren't unique or aren't of length 12!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // console.log(phrase); // Logs the phrase to the console

    /** Now, we need to add logic to generate wallet from the mnemonics ✅
     * Then, set the signerIdentity using the wallet ✅
     * Note: We need to set wallet as the global state using context api ✅
     */

    if (!umi) {
      return <div>Loading...</div>;
    }
    // Create seed phrase from mnemonic
    const seed = await mnemonicToSeed(phrase);
    const seed32 = new Uint8Array(seed.toJSON().data.slice(0, 32));

    //Generate Keypair from the seed
    const keypair = umi?.eddsa.createKeypairFromSeed(seed32);
    const signer = createSignerFromKeypair(umi, keypair);

    // console.log("Wallet loaded: ", signer.publicKey);

    setWallet(signer);

    toast.success(" 🚀 Wallet Loaded Successfully ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const generateWalletHandler = () => {
    setMnemonic(generateMnemonic());
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#BEADFA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: "2rem",
      }}
    >
      <Box
        component="form"
        noValidate
        width="50%"
        minHeight="85vh"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          handleWords(words);
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          color: "#6C22A6",
        }}
      >
        <Typography variant="h6">Enter the wallet mnemonics:</Typography>
        <Grid container spacing={3}>
          {words.map((wordRef, index) => (
            <Grid item xs={3} key={index}>
              <TextField
                id={`word-${index}`}
                label={`Word ${index + 1}`}
                variant="outlined"
                inputRef={wordRef}
                required
              />
            </Grid>
          ))}
        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Button
          variant="contained"
          sx={{ background: "#6C22A6" }}
          type="submit"
        >
          Load Wallet
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          type="button"
          onClick={generateWalletHandler}
        >
          Generate Wallet
        </Button>
        <Typography variant="body1">{mnemonic}</Typography>
      </Box>
    </Box>
  );
};

export default LoadWallet;
