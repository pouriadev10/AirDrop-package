import { clusterApiUrl } from '@solana/web3.js';
import { 
    ConnectionProvider, 
    WalletProvider,
} from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from './Adapters';

const adapters = [
    PhantomWalletAdapter,
    SolflareWalletAdapter,
]

export const SolanaWalletProvider = ({ children, wallets = adapters }) => {
    return (
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
    );
};
  
export const SolanaConnectionProvider = ({ children, provider = 'devnet' }) => {
    const endpoint = clusterApiUrl(provider);
    return (
            <ConnectionProvider endpoint={endpoint}>
                {children}
            </ConnectionProvider>
    );
};