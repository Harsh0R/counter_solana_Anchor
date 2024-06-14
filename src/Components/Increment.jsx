import React, { useCallback, useEffect, useState } from 'react';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import idl from '../../idl.json';

const PROGRAM_ID = '9sMy4hnC9MML6mioESFZmzpntt3focqwUq1ymPgbMf64';

const Increment = ({ counter, setTransactionUri }) => {
  const [count, setCount] = useState();
  const [program, setProgram] = useState();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  useEffect(() => {
    if (!wallet || !connection) {
      console.error('Wallet or connection is not available');
      return;
    }

    const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
    anchor.setProvider(provider);

    const programInstance = new anchor.Program(idl, PROGRAM_ID);
    setProgram(programInstance);
    refreshCount(programInstance);
  }, [connection, wallet]);

  const increaseCount = useCallback(async () => {
    if (!program) {
      console.error('Program is not initialized');
      return;
    }

    try {
      const sig = await program.methods.increment().accounts({ counter }).rpc();
      setTransactionUri(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
      refreshCount(program);
    } catch (error) {
      console.error('Failed to increment count:', error);
    }
  }, [program, counter]);

  const decreaseCount = useCallback(async () => {
    if (!program) {
      console.error('Program is not initialized');
      return;
    }

    try {
      const sig = await program.methods.decrement().accounts({ counter }).rpc();
      setTransactionUri(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
      refreshCount(program);
    } catch (error) {
      console.error('Failed to decrement count:', error);
    }
  }, [program, counter]);

  const refreshCount = async (programInstance) => {
    if (!programInstance) {
      console.error('Program instance is not available');
      return;
    }

    try {
      const counterAccount = await programInstance.account.counter.fetch(counter);
      setCount(counterAccount.count.toNumber());
    } catch (error) {
      console.error('Failed to fetch counter:', error);
    }
  };

  return (
    <div>
      <button onClick={increaseCount} disabled={!program}>Inc</button>
      <br />
      <button onClick={decreaseCount} disabled={!program}>Dec</button>
      <br />
      <button onClick={() => refreshCount(program)} disabled={!program}>Reset</button>
      <br />
      <h1>Count: {count}</h1>
    </div>
  );
};

export default Increment;
