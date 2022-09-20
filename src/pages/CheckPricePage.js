import React from "react";
import BundlrUpload from "../components/BundlrUpload";

const CheckPricePage = () => {
	return (
		<div
			name="check-price"
			className="w-full h-full md:h-screen overflow-visible bg-background text-text"
		>
			<div className="flex flex-col justify-center items-start w-full h-full">
				<div className="md:pl-20 md:pr-20 w-full">
					<div className="text-left pb-8">
						<p className="text-2xl md:text-4xl font-bold inline border-b-4 border-primary">
							check upload price ...
						</p>
					</div>
				</div>

				<div className="pl-20 pr-20">
					<div>
						<BundlrUpload maxPreview={2} showUpload={false} />
					</div>
					<p className="pl-1 pt-3 text-sm">Check the current price to upload files.</p>
					<p className="pl-1 text-sm">
						You can restrict the types of files allowed to be uploaded. Currently image and text
						only.
						<blockquote className="mt-1">
							<pre>
								<code>{"<BundlrUpload \n\tmaxPreview=2 \n\tshowUpload=false />"}</code>
							</pre>
						</blockquote>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckPricePage;
