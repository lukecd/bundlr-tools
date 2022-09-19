import React from "react";
import { useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import { getDefaultProvider } from "ethers";

const CheckPrice = (props) => {
	const [files, setFile] = useState([]);
	const [message, setMessage] = useState();
	const [ethPrice, setEthPrice] = useState(0);
	const [maticPrice, setMaticPrice] = useState(0);
	const [bundlerAddresses, setBundlerAddresses] = useState([
		"https://node1.bundlr.network",
		"https://node2.bundlr.network",
	]);

	useEffect(() => {
		try {
			if (props.useDevnet) {
				setBundlerAddresses(["https://devnet.bundlr.network"]);
			}

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
		} catch (e) {
			console.log(e);
		}
	}, []);

	const getPriceForFile = async (file) => {
		let prices = [];
		for (let i = 0; i < bundlerAddresses.length; i++) {
			// create our bundlr object
			const bundlr = new WebBundlr(bundlerAddresses[i], "matic", getDefaultProvider());

			let cost = await bundlr.getPrice(file.size);
			cost = bundlr.utils.unitConverter(cost).toString();
			cost *= maticPrice;
			prices.push(cost.toString());
		}
		return Math.min(...prices);
	};

	const handleFile = async (e) => {
		setMessage("");
		let file = e.target.files;

		for (let i = 0; i < file.length; i++) {
			const fileType = file[i]["type"];
			file[i]["price"] = await getPriceForFile(file[i]);
			const validImageTypes = ["image/gif", "image/jpeg", "image/png", "text/plain"];
			if (validImageTypes.includes(fileType)) {
				setFile([...files, file[i]]);
			} else {
				setMessage("only images and text accepted");
			}
		}
	};

	const removeImage = (i) => {
		setFile(files.filter((x) => x.name !== i));
	};

	return (
		<div>
			<div className="flex flex-row justify-start items-start px-2 py-2 border-2 border-primary rounded-lg drop-shadow-lg bg-primary">
				<div className="rounded-md">
					<span className="flex justify-center items-center text-sm mb-1 text-text ">
						{message}
					</span>
					<div className="h-32 w-32 relative border-2 items-center rounded-md cursor-pointer bg-background border-primary border-dotted">
						<input
							type="file"
							onChange={handleFile}
							className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
							multiple="multiple"
							name="files[]"
						/>
						<div className="flex justify-center items-center h-full w-full absolute z-1 top-0">
							<div className="flex flex-col">
								<i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
								<span className="text-sm">{`Drag & Drop Files`}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col pl-5 gap-2 mt-2">
					{files.map((file, key) => {
						return (
							<div key={key} className="flex flex-row overflow-hidden relative">
								<img
									className="h-20 w-20 rounded-md"
									src={URL.createObjectURL(file)}
									onClick={() => {
										removeImage(file.name);
									}}
								/>
								<div className="flex flex-col">
									<span className="pl-2 text-sm">{file.name}</span>
									<span className="pl-2 text-sm">{file.size} bytes</span>
									<span className="pl-2 text-sm">${file.price}</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CheckPrice;
