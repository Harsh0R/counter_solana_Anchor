import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const AppBar = () => {
    return (
        <div>
            <h3>Wallet connction</h3>
            <WalletMultiButton />
        </div>
    )
}

export default AppBar