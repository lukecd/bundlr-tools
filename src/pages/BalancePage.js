import React from "react";
import WalletBalance from "../components/WalletBalance";
const BalancePage = () => {
	return (
		<div
			name="wallet-balance"
			className="w-full h-full md:h-screen overflow-visible bg-background text-text"
		>
			<div className="flex flex-col justify-center items-start w-full h-full">
				<div className="pl-20 pr-20w-full grid grid-cols-2 gap-8">
					<div className="text-left pb-8 pl-4">
						<p className="text-4xl font-bold inline border-b-4 border-primary">
							wallet balance ...
						</p>
					</div>
				</div>

				<div className="px-5 w-full">
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default BalancePage;
