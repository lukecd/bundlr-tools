import React from "react";
import CheckPrice from "../components/CheckPrice";

const CheckPricePage = () => {
	return (
		<div
			name="check-price"
			className="w-full h-full md:h-screen overflow-visible bg-background text-text"
		>
			<div className="flex flex-col justify-center items-start w-full h-full">
				<div className="pl-20 pr-20">
					<div className="text-left pb-8">
						<p className="text-4xl font-bold inline border-b-4 border-primary">
							check upload price ...
						</p>
					</div>
				</div>

				<div className="pl-20 pr-20">
					<div>
						<CheckPrice />
					</div>
					<p className="pl-1 text-sm">Check the current price to upload files.</p>
					<p className="pl-1 text-sm">
						You can restrict the types of files allowed to be uploaded. Currently image and text
						only.
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckPricePage;
