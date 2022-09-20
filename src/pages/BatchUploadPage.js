import React from "react";
import BundlrUpload from "../components/BundlrUpload";

const BatchUploadPage = () => {
	return (
		<div
			name="batch-upload"
			className="w-full h-full md:h-screen overflow-visible bg-background text-text"
		>
			<div className="flex flex-col justify-center items-start  h-full">
				<div className="md:pl-20 md:pr-20 w-full">
					<div className="text-left pb-8 pl-4">
						<p className="text-2xl md:text-4xl font-bold inline border-b-4 border-primary">
							upload ...
						</p>
					</div>
				</div>

				<div className="pl-20 pr-20">
					<div className="">
						<BundlrUpload maxPreview={1} showUpload={true} />
					</div>
					<p className="pl-1 pt-3 text-sm">Upload files to Bundlr.</p>
					<p className="pl-1 text-sm">
						This component is the same as used for checking upload price. By setting
						"showUpload" <br />
						to true an upload button is added.
						<blockquote className="mt-1">
							<pre>
								<code>{"<BundlrUpload \n\tmaxPreview=1 \n\tshowUpload=true />"}</code>
							</pre>
						</blockquote>
					</p>
				</div>
			</div>
		</div>
	);
};
export default BatchUploadPage;
