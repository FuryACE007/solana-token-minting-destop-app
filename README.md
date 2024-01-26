
# Solana Token Minter Desktop App

This is a cross-platform desktop application which can be used to create and mint SPL tokens ( Fungible ) on Solana blockchain.


## Installation

Folloe these steps to get the app running:
Note: It's better to use pnpm for package management

```bash
  cd project-name
  pnpm i
```
Now, you need to create a `.env` file at the root of the project, to contain the Solana RPC.

Add this to the enviroment file:

```NEXT_PUBLIC_RPC_ENDPOINT = https://devnet.helius-rpc.com/?api-key=<Your API key from https://www.helius.dev/>```

You need to use node version >= v20 to run the application.

```bash
    pnpm tauri dev
```

This should spin-up a window with the application running inside it. 

## Working
Now, follow-these steps:

    1. Click on the `Create Wallet` button.
    2. Copy the mnemonics and keep it safe.
    3. Enter the mnemonics in the 12 boxes and click on the `Load Wallet` button.
    4. On the next page, create the wallet address, and fund it with some SOLs.
    5. Balance won't be updated on the page ( still working on it ), but be assured you wallet is now funded.
    6. Create a token
    7. Mint token into your wallet.
    8. You can also create some `n` number of wallets and fund them all with 0.001 SOL and any number of the created tokens, from the create wallet section.


Now, you can create the bundle of the application using the command:
```bash
pnpm tauri build
```

Contributions are welcomed and appreciated ofc :)