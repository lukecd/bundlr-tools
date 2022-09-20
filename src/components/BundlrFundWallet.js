import React from "react";
import { Fragment, useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import { getDefaultProvider } from "ethers";
import { useBalance, useAccount, useContract, useContractEvent, useProvider, useSigner } from "wagmi";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import erc20ABI from "../assets/abi/ERC-20.abi.json";
import { BigNumber, ethers } from "ethers";

const BundlrFundWallet = (props) => {
	const [bundlerAddress, setBundlerAddresses] = useState("https://node1.bundlr.network");
	const { data: signer, isError: isSignerError, isLoading: isSignerLoading } = useSigner();

	const [rpcUrl, setRpcUrl] = useState();
	const [contractAddress, setContractAddress] = useState();
	const [ethPrice, setEthPrice] = useState(0);
	const [maticPrice, setMaticPrice] = useState(0);
	const provider = useProvider();

	const ethProvider = ethers.getDefaultProvider();
	const goerliProvider = ethers.getDefaultProvider("goerli");
	const maticProvider = ethers.getDefaultProvider("matic");
	const mumbaiProvider = new ethers.providers.AlchemyProvider("maticmum");

	const [ethBalance, setEthBalance] = useState(0);
	const [gorBalance, setGorBalance] = useState(0);
	const [maticBalance, setMaticBalance] = useState(0);
	const [mumbaiBalance, setMumbaiBalance] = useState(0);

	const [message, setMessage] = useState("");
	const [fundAmount, setFundAmount] = useState(0);

	const currencies = [
		{ symbol: "ETH", name: "ethereum" },
		{ symbol: "MATIC", name: "matic" },
	];
	const [selected, setSelected] = useState(currencies[1]);

	useEffect(() => {
		console.log("selected ", selected.symbol);
		if (props.useDevnet == "true") {
			setBundlerAddresses("https://devnet.bundlr.network");
		}

		// try getting matic and eth balances for the user
		try {
			if (signer) {
				const getBalances = async () => {
					let ethBalance = await ethProvider.getBalance(signer._address);
					ethBalance = ethers.utils.formatEther(ethBalance);
					setEthBalance(ethBalance);

					let gorBalance = await goerliProvider.getBalance(signer._address);
					gorBalance = ethers.utils.formatEther(gorBalance);
					setGorBalance(gorBalance);

					let maticBalance = await maticProvider.getBalance(signer._address);
					maticBalance = ethers.utils.formatEther(maticBalance);
					setMaticBalance(maticBalance);

					let mumbaiBalance = await mumbaiProvider.getBalance(signer._address);
					mumbaiBalance = ethers.utils.formatEther(mumbaiBalance);
					setMumbaiBalance(mumbaiBalance);
				};
				getBalances();
			}
		} catch (e) {
			console.log(e);
		}
	}, [signer]);

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(" ");
	};

	const fund = async () => {
		// connect to BUNDLR
		console.log(`conecting to ${bundlerAddress} network ${selected.name}`);
		const bundlr = new WebBundlr(bundlerAddress, selected.name, getDefaultProvider());

		// test
		console.log("starting test");
		let fundAmountParsed = ethers.utils.parseEther(fundAmount);

		// parse decimal input into atomic units (from the Bundlr docs)
		// const fundAmountParsed = BigNumber.from(fundAmount).multipliedBy(bundlr.currencyConfig.base[1]);
		//const fundAmountParsed = ethers.utils.parseEther(fundAmount);

		console.log("fund called fundAmountParsed=", fundAmountParsed.toString());
		// if (fundAmountParsed <= 0) {
		// 	setMessage("Must fund > 0");
		// 	return;
		// }

		await bundlr
			.fund(fundAmountParsed)
			.then((res) => {
				setMessage("funded");
			})
			.catch((e) => {
				console.log(e);
				setMessage("error on fund ", e.message);
			});
	};

	return (
		<div className="flex flex-col md:flex-row items-center px-2 py-2 border-2 border-primary rounded-lg drop-shadow-lg">
			<div className="flex flex-row">
				<div className="flex flex-col">
					<div>
						<input
							class="rounded py-1 px-2 leading-tight focus:outline-none bg-primary text-text"
							id="grid-first-name"
							type="number"
							value={fundAmount}
							onChange={(e) => setFundAmount(e.target.value)}
						/>
					</div>
					<div>
						{props.useDevnet && selected.symbol == "MATIC" && (
							<span className="text-sm">Balance {mumbaiBalance}</span>
						)}
						{props.useDevnet && selected.symbol == "ETH" && (
							<span className="text-sm">Balance {gorBalance}</span>
						)}
						{!props.useDevnet && selected.symbol == "MATIC" && (
							<span className="text-sm">Balance {maticBalance}</span>
						)}
						{!props.useDevnet && selected.symbol == "ETH" && (
							<span className="text-sm">Balance {ethBalance}</span>
						)}
					</div>
				</div>
				<div className="pl-3 w-48">
					<Listbox value={selected} onChange={setSelected}>
						<div className="relative">
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
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
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
				<div className="px-2">
					<button class="bg-primary hover:bg-blue-700 text-text py-1 px-5 rounded" onClick={fund}>
						fund
					</button>
				</div>
			</div>
			<div className="text-sm flex flex-row justify-start">{message}</div>
		</div>
	);
};

export default BundlrFundWallet;
