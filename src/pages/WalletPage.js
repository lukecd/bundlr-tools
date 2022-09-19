import React from "react";
import WalletBalance from "../components/WalletBalance";
import FundWallet from "../components/FundWallet";

const WalletPage = () => {
	return (
		<div name="wallet" className="w-full h-full md:h-screen overflow-visible bg-background text-text">
			<div className="flex flex-col justify-center items-start w-full h-full">
				<div className="md:pl-20 md:pr-20 w-full">
					<div className="text-left pb-8">
						<p className="text-2xl md:text-4xl font-bold inline border-b-4 border-primary">
							wallet interactions ...
						</p>
					</div>
				</div>

				<div className="pl-20 pr-20">
					<div>
						<WalletBalance showCryptoBalance="true" showUSDBalance="true" useDevnet="true" />
					</div>
					<p className="pl-1 text-sm">Show current balance using the WalletBalance component.</p>
				</div>

				<div className="pl-20 pr-20 mt-10">
					<div>
						<FundWallet showCryptoBalance="true" showUSDBalance="true" useDevnet="true" />
					</div>
					<p className="pl-1 text-sm">
						Allow users to fund their wallets using the FundWallet component.
					</p>
				</div>
			</div>
		</div>
	);
};

export default WalletPage;
