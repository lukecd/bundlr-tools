import "./index.css";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import WalletPage from "./pages/WalletPage";
import BatchUploadPage from "./pages/BatchUploadPage";
import CheckPricePage from "./pages/CheckPricePage";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
	[chain.mainnet, chain.polygon, chain.goerli, chain.polygonMumbai],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()],
);

const { connectors } = getDefaultWallets({
	appName: "Bundlr Tools",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function App() {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<div>
					<Navbar />
					<AboutPage />
					<WalletPage />
					<BatchUploadPage />
					<CheckPricePage />
				</div>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default App;
