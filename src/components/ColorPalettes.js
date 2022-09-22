import React from "react";
import ColorPalette from "./ColorPalette";
const ColorPalettes = () => {
	return (
		<div className="flex flex-col border-2 border-primary rounded-lg px-2 py-3 max-w-3xl">
			<div className="mb-2">
				<span className="text-base">Preview components using different colors</span>{" "}
			</div>

			<div className="flex flex-row">
				<div className="px-1">
					<ColorPalette
						bgColor="bg-[#05386b]"
						primaryColor="bg-[#379683]"
						secondaryColor="bg-[#5cdb95]"
						tertiaryColor="bg-[#8ee4af]"
						textColor="bg-[#FFFFFF]"
						errorTextColor="bg-[#ff0000]"
					/>
				</div>
				<div className="px-1">
					<ColorPalette
						bgColor="bg-[#937DC2]"
						primaryColor="bg-[#C689C6]"
						secondaryColor="bg-[#FFABE1]"
						tertiaryColor="bg-[#FFE6F7]"
						textColor="bg-[#FFFFFF]"
						errorTextColor="bg-[#CD104D]"
					/>
				</div>
				<div className="px-1">
					<ColorPalette
						bgColor="bg-[#850E35]"
						primaryColor="bg-[#EE6983]"
						secondaryColor="bg-[#FFC4C4]"
						tertiaryColor="bg-[#FFF5E4]"
						textColor="bg-[#FFF5E4]"
						errorTextColor="bg-[#FFF5E4]"
					/>
				</div>
				<div className="px-1">
					<ColorPalette
						bgColor="bg-[#3330E4]"
						primaryColor="bg-[#F637EC]"
						secondaryColor="bg-[#FBB454]"
						tertiaryColor="bg-[#FAEA48]"
						textColor="bg-[#FFFFFF]"
						errorTextColor="bg-[#FAEA48]"
					/>
				</div>
				<div className="px-1">
					<ColorPalette
						bgColor="bg-[#37E2D5]"
						primaryColor="bg-[#C70A80]"
						secondaryColor="bg-[#590696]"
						tertiaryColor="bg-[#FBCB0A]"
						textColor="bg-[#FFFFFF]"
						errorTextColor="bg-[#FBCB0A]"
					/>
				</div>
				<div className="px-1">
					<ColorPalette
						bgColor="bg-[#16213E]"
						primaryColor="bg-[#533483]"
						secondaryColor="bg-[#0F3460]"
						tertiaryColor="bg-[#E94560]"
						textColor="bg-[#FFFFFF]"
						errorTextColor="bg-[#E94560]"
					/>
				</div>
			</div>
		</div>
	);
};

export default ColorPalettes;
