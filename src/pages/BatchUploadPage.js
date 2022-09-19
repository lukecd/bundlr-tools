import React from "react";

const BatchUploadPage = () => {
	return (
		<div
			name="batch-upload"
			className="w-full h-full md:h-screen overflow-visible bg-background text-text"
		>
			<div className="flex flex-col justify-center items-start w-full h-full">
				<div className="md:pl-20 md:pr-20 w-full">
					<div className="text-left pb-8 pl-4">
						<p className="text-2xl md:text-4xl font-bold inline border-b-4 border-primary">
							batch upload ...
						</p>
					</div>
				</div>

				<div className="px-5 w-full">
					<div>
						<p className="pl-20 pr-20 leading-7"></p>
						<p className="ml-10 mt-5 pl-20 pr-20 leading-7"></p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default BatchUploadPage;
