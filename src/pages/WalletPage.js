import React from "react";
import BundlrWalletBalance from "../components/BundlrWalletBalance";
import BundlrFundWallet from "../components/BundlrFundWallet";
import ColorPalettes from "../components/ColorPalettes";

const WalletPage = () => {
	const escapeTags = (str) => {
		return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	};

	return (
		<div name="wallet" className="w-full h-full h-screen overflow-visible bg-background text-text">
			<div className="flex flex-col justify-center items-start h-full">
				<div className="pl-5 md:pl-20 md:pr-20 w-full">
					<div className="text-left pb-8">
						<p className="text-2xl md:text-4xl font-bold inline border-b-4 border-primary">
							wallet interactions ...
						</p>
					</div>
				</div>

				<div className="pl-5 pr-5 md:pl-20 md:pr-20 w-full">
					<div className="max-w-lg">
						<BundlrWalletBalance
							showCryptoBalance={true}
							showUSDBalance={true}
							useDevnet={true}
						/>
					</div>
					<p className="pt-3 text-sm font-bold">
						Show current balance using the BundlrWalletBalance component.
						<blockquote className="mt-2">
							<pre>
								<code>
									{
										"<BundlrWalletBalance \n\tshowCryptoBalance=true \n\tshowUSDBalance=true \n\tuseDevnet=true />"
									}
								</code>
							</pre>
						</blockquote>
					</p>
				</div>

				<div className="pl-5 pr-5 pt-20 md:pl-20 md:pr-20 w-full">
					<div className="max-w-lg">
						<BundlrFundWallet useDevnet={true} />
					</div>
					<p className="pl-1 pt-3 text-sm font-bold">
						Allow users to fund their wallets using the BundlrFundWallet component.
						<blockquote className="mt-2">
							<pre>
								<code>{"<BundlrFundWallet \n\tuseDevnet=true />"}</code>
							</pre>
						</blockquote>
					</p>
				</div>
				<div className="hidden md:flex pl-5 pr-5 pt-20 md:pl-20 md:pr-20 w-full">
					<ColorPalettes />
				</div>
			</div>
		</div>
	);
};

export default WalletPage;
