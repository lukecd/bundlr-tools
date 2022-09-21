import React from "react";
import { useState, useEffect } from "react";
import { WebBundlr } from "@bundlr-network/client";
import { ethers } from "ethers";
import { getDefaultProvider } from "ethers";
import CircleLoader from "react-spinners/CircleLoader";
import fileReaderStream from "filereader-stream";

const BundlrUpload = (props) => {
	const [isLoading, setIsLoading] = useState(false);
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
		let newFiles = e.target.files;

		for (let i = 0; i < newFiles.length; i++) {
			const fileType = newFiles[i]["type"];
			newFiles[i]["price"] = await getPriceForFile(newFiles[i]);
			const validImageTypes = ["image/gif", "image/jpeg", "image/png", "text/plain"];
			if (validImageTypes.includes(fileType)) {
				if (files.length >= props.maxPreview) {
					files.shift();
					setFile([...files, newFiles[i]]);
				} else {
					setFile([...files, newFiles[i]]);
				}
			} else {
				setMessage("Please upload either an image or text file.");
			}
		}

		while (files.length >= props.maxPreview) {
			setFile([files.pop()]);
		}
	};

	const removeImage = (i) => {
		setFile(files.filter((x) => x.name !== i));
	};

	const upload = async () => {
		setIsLoading(true);
		console.log("uploading to-->", bundlerAddresses[0]);
		// for now set to 0'th address, but still need to check which one is cheaper
		const newProvider = new ethers.providers.Web3Provider(window.ethereum);
		const bundlr = new WebBundlr(bundlerAddresses[0], "matic", newProvider);
		await bundlr.ready();

		const uploader = bundlr.uploader.chunkedUploader;
		uploader.setBatchSize(2);
		uploader.setChunkSize(2_000_000);
		uploader.on("chunkUpload", (e) => {});
		console.log("uploader=", uploader);
		for (let i = 0; i < files.length; i++) {
			const imgStream = fileReaderStream(files[i]);

			console.log("file data=", imgStream);
			await uploader
				.uploadData(imgStream, {
					tags: [{ name: "Content-Type", value: files[i].type }],
				})
				.then((res) => {
					setIsLoading(false);
					files[i].bundlrURL = `https://arweave.net/${res.data.id}`;
					setMessage("Upload success");
				})
				.catch((e) => {
					setIsLoading(false);
					setMessage("Upload error ", e.message);
					console.log("error on upload, ", e);
				});
		}
	};

	return (
		<div className="flex flex-col bg-primary  drop-shadow-lg">
			<div>
				<div className="flex flex-row justify-start items-start px-2 py-2  bg-primary">
					<div className="rounded-md">
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
									{!isLoading && (
										<img
											className="h-20 w-20 rounded-md"
											src={URL.createObjectURL(file)}
											alt="preview"
											onClick={() => {
												removeImage(file.name);
											}}
										/>
									)}
									{isLoading && <CircleLoader size={80} color="#FFFFFF" />}
									<div className="flex flex-col">
										<span className="pl-2 text-sm">{file.name}</span>
										<span className="pl-2 text-sm">{file.size} bytes</span>
										<span className="pl-2 text-sm">${file.price}</span>
										<span className="pl-2 text-sm">{file.bundlrURL}</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				{props.showUpload && (
					<div className="flex flex-row justify-end mb-1 mr-1">
						{files.length == 0 && (
							<button
								type="button"
								className="bg-secondary hover:text text-text py-1 px-5 rounded drop-shadow-lg disabled:opacity-100"
								disabled
							>
								Upload
							</button>
						)}
						{files.length > 0 && (
							<button
								type="button"
								className="bg-secondary hover:text text-text py-1 px-5 rounded drop-shadow-lg"
								onClick={upload}
							>
								Upload
							</button>
						)}
					</div>
				)}
			</div>
			<div>
				<div className="text-sm flex flex-row justify-start">
					<span className="text-errorText">{message}</span>
				</div>
			</div>
		</div>
	);
};

export default BundlrUpload;
