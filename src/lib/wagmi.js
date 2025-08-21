// src/lib/wagmi.js
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const WALLETCONNECT_PROJECT_ID = "c224b34b5381ac1341225274d8bd0156";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected({ chains: [mainnet, sepolia] }),
    walletConnect({
      chains: [mainnet, sepolia],
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
