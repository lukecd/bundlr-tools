import React from "react";
import classnames from "classnames";

const ColorPalette = (props) => {
	// converts bg-[#937DC2] to #937DC2
	const trimVar = (toBeTrimmed) => {
		return toBeTrimmed.substring(4, toBeTrimmed.length - 1);
	};

	const usePalette = () => {
		var r = document.querySelector(":root");
		r.style.setProperty("--background", trimVar(props.bgColor));
		r.style.setProperty("--primary", trimVar(props.primaryColor));
		r.style.setProperty("--secondary", trimVar(props.secondaryColor));
		r.style.setProperty("--tertiary", trimVar(props.tertiaryColor));
		r.style.setProperty("--text", trimVar(props.textColor));
		r.style.setProperty("--errorText", trimVar(props.errorTextColor));
	};

	return (
		<div className="w-28">
			<div className={classnames(props.bgColor, "h-7")}></div>
			<div className={classnames(props.primaryColor, "h-7")}></div>
			<div className={classnames(props.secondaryColor, "h-7")}></div>
			<div className={classnames(props.tertiaryColor, "h-7")}></div>
			<div className={classnames(props.textColor, "h-7")}></div>
			<div className={classnames(props.errorTextColor, "h-7")}></div>
			<div className="pt-1">
				<button
					type="button"
					className="bg-secondary hover:text text-text w-full py-1 px-5 rounded drop-shadow-lg"
					onClick={usePalette}
				>
					Use
				</button>
			</div>
		</div>
	);
};

export default ColorPalette;
