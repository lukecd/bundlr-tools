import React from "react";
import { Fragment, useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import { getDefaultProvider } from "ethers";
import { useBalance, useAccount, useContract, useContractEvent, useProvider, useSigner } from "wagmi";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const FundWallet = (props) => {
	// const [bundlerHttpAddress, setBundlerHttpAddress] = useState("https://node1.bundlr.network");
	const [bundlerHttpAddress, setBundlerHttpAddress] = useState("https://devnet.bundlr.network");
	const { data: signer, isError: isSignerError, isLoading: isSignerLoading } = useSigner();

	const [rpcUrl, setRpcUrl] = useState();
	const [contractAddress, setContractAddress] = useState();
	const [ethPrice, setEthPrice] = useState(0);
	const [maticPrice, setMaticPrice] = useState(0);

	const provider = useProvider();

	const currencies = [
		{ symbol: "ETH", name: "ethereum", address: "" },
		{ symbol: "MATIC", name: "matic", address: "0x0000000000000000000000000000000000001010" },
	];
	const [selected, setSelected] = useState(currencies[1]);

	useEffect(() => {
		try {
			if (signer) {
			}
			const bundlr = new WebBundlr(bundlerHttpAddress, selected.name, getDefaultProvider());
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
