import React from "react";
import { useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import { getDefaultProvider } from "ethers";

const WalletBalance = () => {
	const [loadedBalance, setLoadedBalance] = useState();
	const [loadedBalanceDecimal, setLoadedBalanceDecimal] = useState();

	useEffect(() => {
		const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", getDefaultProvider());
		let curBalance;
		const getLoadedBalance = async () => {
			curBalance = await bundlr.getLoadedBalance();
		};
		setLoadedBalance(curBalance);
		setLoadedBalanceDecimal(bundlr.utils.unitConverter(curBalance));
	}, []);
	return (
		<div>
			Current Balance = ${loadedBalance} <br />
			Current Decimal = ${loadedBalanceDecimal} <br />
		</div>
	);
};

export default WalletBalance;
