import React from "react";
import { Fragment, useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import { getDefaultProvider } from "ethers";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const WalletBalance = (props) => {
	const [loadedBalance, setLoadedBalance] = useState();
	const [loadedBalanceDecimal, setLoadedBalanceDecimal] = useState();
	const [loadedBalanceUSD, setLoadedBalanceUSD] = useState();
	const [showCryptoBalance, setShowCryptoBalance] = useState();
	const [showUSDBalance, setShowUSDBalance] = useState();

	// const [bundlerHttpAddress, setBundlerHttpAddress] = useState("https://node1.bundlr.network");
	const [bundlerHttpAddress, setBundlerHttpAddress] = useState("https://devnet.bundlr.network");

	const [rpcUrl, setRpcUrl] = useState();
	const [contractAddress, setContractAddress] = useState();
	const [ethPrice, setEthPrice] = useState(0);
	const [maticPrice, setMaticPrice] = useState(0);

	const currencies = [
		{ symbol: "ETH", name: "ethereum" },
		{ symbol: "MATIC", name: "matic" },
	];
	const [selected, setSelected] = useState(currencies[1]);

	useEffect(() => {
		console.log("selected=", selected);
		setShowCryptoBalance(props.showCryptoBalance);
		setShowUSDBalance(props.showUSDBalance);
		try {
			// get ETH and MATIC prices using free 0x.org api.
			// feel free to swtich to any other data provider

			try {
				let ePrice, mPrice;
				const getBaseAssetPrices = async () => {
					ePrice = await fetch(
						"https://api.0x.org/swap/v1/price?sellToken=ETH&buyToken=DAI&sellAmount=1000000000000000000",
					);
					ePrice = await ePrice.json();
					setEthPrice(ePrice.price);

					mPrice = await fetch(
						"https://api.0x.org/swap/v1/price?sellToken=MATIC&buyToken=DAI&sellAmount=1000000000000000000",
					);
					mPrice = await mPrice.json();
					setMaticPrice(mPrice.price);
				};
				getBaseAssetPrices();
			} catch (e) {
				console.log(e);
			}

			// create our bundlr object
			const bundlr = new WebBundlr(bundlerHttpAddress, selected.name, getDefaultProvider());

			const getLoadedBalance = async () => {
				console.log("getting balance currency=", selected.name);
				const curBalance = await bundlr.getLoadedBalance();
				setLoadedBalance(curBalance.toString());
				setLoadedBalanceDecimal(bundlr.utils.unitConverter(curBalance).toFixed(7, 2).toString());
				if (selected.name == "matic") {
					console.log("setting balance usd matic mPrice=", maticPrice);
					setLoadedBalanceUSD(
						bundlr.utils
							.unitConverter(curBalance / maticPrice)
							.toFixed(7, 2)
							.toString(),
					);
				} else if (selected.name == "etherem") {
					console.log("setting balance usd matic mPrice=", ethPrice);
					setLoadedBalanceUSD(
						bundlr.utils
							.unitConverter(curBalance / ethPrice)
							.toFixed(7, 2)
							.toString(),
					);
				}
			};
			getLoadedBalance();
		} catch (e) {
			console.log(e);
		}
	}, [selected, ethPrice, maticPrice]);

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(" ");
	};

	return (
		<div className="flex flex-row items-center px-2 py-2 border-2 border-primary rounded-lg drop-shadow-lg">
			<div className="pr-5">${loadedBalanceUSD}</div>
			<div className="">{loadedBalanceDecimal}</div>
			<div className="pl-3 w-48">
				<Listbox value={selected} onChange={setSelected}>
					<div className="relative mt-1">
						<Listbox.Button className="relative w-full cursor-default rounded-lg bg-primary py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
							<span className="block truncate">{selected.symbol}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-text" aria-hidden="true" />
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-text shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{currencies.map((curCurrency, currencyIdx) => (
									<Listbox.Option
										key={currencyIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-secondary text-text" : "text-text"
											}`
										}
										value={curCurrency}
									>
										{({ selected }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{curCurrency.symbol}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
			</div>
		</div>
	);
};

export default WalletBalance;
