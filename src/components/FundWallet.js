import React from "react";
import { Fragment, useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import { getDefaultProvider } from "ethers";
import { useBalance, useAccount, useContract, useContractEvent, useProvider, useSigner } from "wagmi";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import erc20ABI from "../assets/abi/ERC-20.abi.json";
import { BigNumber, ethers } from "ethers";

const FundWallet = (props) => {
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
	const mumbaiProvider = ethers.getDefaultProvider("wss://rpc-mumbai.matic.today/");

	const [ethBalance, setEthBalance] = useState(0);
	const [gorBalance, setGorBalance] = useState(0);
	const [maticBalance, setMaticBalance] = useState(0);
	const [mumbaiBalance, setMumbaiBalance] = useState(0);

	const currencies = [
		{ symbol: "ETH", name: "ethereum", address: "" },
		{ symbol: "MATIC", name: "matic", address: "0x0000000000000000000000000000000000001010" },
	];
	const [selected, setSelected] = useState(currencies[1]);

	useEffect(() => {
		if (props.useDevnet == "true") {
			setBundlerAddresses("https://devnet.bundlr.network");
		}

		// try getting matic and eth balances for the user
		try {
			if (signer) {
				const getBalances = async () => {
					console.log("gettinb balances");
					let ethBalance = await ethProvider.getBalance(signer._address);
					ethBalance = ethers.utils.formatEther(ethBalance);
					setEthBalance(ethBalance);
					console.log("ethBalance=", ethBalance.toString());

					let gorBalance = await goerliProvider.getBalance(signer._address);
					gorBalance = ethers.utils.formatEther(gorBalance);
					setGorBalance(gorBalance);
					console.log("gorBalance=", gorBalance.toString());

					let maticBalance = await maticProvider.getBalance(signer._address);
					maticBalance = ethers.utils.formatEther(maticBalance);
					setMaticBalance(maticBalance);
					console.log("maticBalance=", maticBalance.toString());

					let mumbaiBalance = await mumbaiProvider.getBalance(signer._address);
					mumbaiBalance = ethers.utils.formatEther(mumbaiBalance);
					setMumbaiBalance(mumbaiBalance);
					console.log("mumbaiBalance=", mumbaiBalance.toString());
				};
				getBalances();
				console.log("signer=", signer._address);
			}
			const bundlr = new WebBundlr(bundlerAddress, selected.name, getDefaultProvider());
		} catch (e) {
			console.log(e);
		}
	}, [signer]);

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(" ");
	};

	return (
		<div className="flex flex-row items-center px-2 py-2 border-2 border-primary rounded-lg drop-shadow-lg">
			<div>
				<input
					class=" w-full rounded py-1 px-2 leading-tight focus:outline-none bg-primary text-text"
					id="grid-first-name"
					type="number"
					placeholder=" amount"
				/>
			</div>
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
			<div className="px-4">
				<button class="bg-primary hover:bg-blue-700 text-text py-1 px-5 rounded">fund</button>
			</div>
		</div>
	);
};

export default FundWallet;
