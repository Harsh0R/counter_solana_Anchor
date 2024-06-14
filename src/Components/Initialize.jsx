import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import React, { useEffect, useState } from 'react';
import idl from '../../idl.json';
import styles from "./compStyle.module.css"

const PROGRAM_ID = new anchor.web3.PublicKey(
  '9sMy4hnC9MML6mioESFZmzpntt3focqwUq1ymPgbMf64'
);

const Initialize = ({ setCounter, setTransactionUrl }) => {
  const [program, setProgram] = useState(null);
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  useEffect(() => {
    if (!connection || !wallet) {
      console.log('Connection or wallet is not available');
      return;
    }

    const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
    anchor.setProvider(provider);

    const programInstance = new anchor.Program(idl, PROGRAM_ID);
    setProgram(programInstance);
  }, [connection, wallet]);

  const initializeCont = async () => {
    if (!program) {
      console.error('Program is not initialized');
      return;
    }

    const newAccount = anchor.web3.Keypair.generate();

    try {
      const sig = await program.methods
        .initialize()
        .accounts({
          counter: newAccount.publicKey,
        })
        .signers([newAccount])
        .rpc();

      setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
      setCounter(newAccount.publicKey);
    } catch (error) {
      console.error('Failed to initialize counter:', error);
    }
  };

  return (
    <button onClick={initializeCont} className={styles.btn} disabled={!program}>
      Initialize
    </button>
  );
};

export default Initialize;
