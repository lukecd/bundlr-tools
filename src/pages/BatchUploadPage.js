import React from "react";
import BundlrUpload from "../components/BundlrUpload";
import ColorPalettes from "../components/ColorPalettes";

const BatchUploadPage = () => {
	return (
		<div name="upload" className="w-full h-full h-screen overflow-visible bg-background text-text">
			<div className="flex flex-col justify-center items-start  h-full">
				<div className="pl-5 md:pl-20 md:pr-20 w-full">
					<div className="text-left pb-8">
						<p className="text-2xl md:text-4xl font-bold inline border-b-4 border-primary">
							upload ...
						</p>
					</div>
				</div>

				<div className="pl-5 pr-5 md:pl-20 md:pr-20 w-full">
					<div className="max-w-lg">
						<BundlrUpload maxPreview={1} showUpload={true} useDevnet={true} />
					</div>
					<p className="pl-1 pt-3 text-sm">Upload files to Bundlr.</p>
					<p className="pl-1 text-sm">
						This component is the same as used for checking upload price. By setting
						"showUpload" <br />
						to true an upload button is added.
						<blockquote className="mt-1">
							<pre>
								<code>
									{
										"<BundlrUpload \n\tmaxPreview=1 \n\tshowUpload=true \n\tuseDevnet=true/>"
									}
								</code>
							</pre>
						</blockquote>
					</p>
				</div>
				<div className="pl-5 pr-5 pt-20 md:pl-20 md:pr-20 w-full">
					<ColorPalettes />
				</div>
			</div>
		</div>
	);
};
export default BatchUploadPage;
