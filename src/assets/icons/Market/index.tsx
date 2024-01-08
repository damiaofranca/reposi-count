import * as React from "react";

interface IMarketIcon {
	theme: "light" | "dark";
}

const MarketIcon: React.FC<IMarketIcon> = ({ theme, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		fill="none"
		{...props}
	>
		<path
			fill={theme === "light" ? "#739072" : "#ffff"}
			d="M10.19 10.412a4 4 0 0 1-4-4h1.6a2.4 2.4 0 1 0 4.8 0h1.6a4 4 0 0 1-4 4Zm0-8a2.4 2.4 0 0 1 2.4 2.4h-4.8a2.4 2.4 0 0 1 2.4-2.4Zm5.6 2.4h-1.6a4 4 0 0 0-8 0h-1.6c-.888 0-1.6.712-1.6 1.6v9.6a1.6 1.6 0 0 0 1.6 1.6h11.2a1.6 1.6 0 0 0 1.6-1.6v-9.6a1.6 1.6 0 0 0-1.6-1.6Z"
		/>
	</svg>
);
export default MarketIcon;
