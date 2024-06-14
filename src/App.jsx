import { ChakraProvider, VStack, Link } from '@chakra-ui/react';
import './App.css';
import AppBar from './Components/AppBar';
import WalletContextProvider from './Context/WalletContextProvider';
import { useState } from 'react';
import Initialize from './Components/Initialize';
import Increment from './Components/Increment';

function App() {
  const [counter, setCounter] = useState("");
  const [transactionUrl, setTransactionUrl] = useState("");

  return (
    <ChakraProvider>
      <WalletContextProvider>
        <AppBar />
        <VStack>
          <h1>Initialize</h1>
          <Initialize
            setCounter={setCounter}
            setTransactionUrl={setTransactionUrl}
          />
          <h1>counter</h1>
          <Increment
            counter={counter}
            setTransactionUri={setTransactionUrl}
            setCounter={setCounter}  // Make sure to pass setCounter here
          />

        </VStack>
        <div>Connect Wallet 123</div>
        <br />
        {transactionUrl && (
          <Link href={transactionUrl} color="white" isExternal margin={8}>
            View most recent transaction
          </Link>
        )}
      </WalletContextProvider>
    </ChakraProvider>
  );
}

export default App;
