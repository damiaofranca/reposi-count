import * as React from "react";

interface IStorageIcon {
	theme: "light" | "dark";
}

const StorageIcon: React.FC<IStorageIcon> = ({ theme, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		fill="none"
		{...props}
	>
		<path
			fill={theme === "light" ? "#739072" : "#ffff"}
			d="M10.428 15.09h-5v-3.334h5m7.5 0V10.09l-.834-4.166H3.761l-.834 4.166v1.667h.834v5h8.333v-5h3.334v5h1.666v-5m0-8.333H3.761V5.09h13.333V3.423Z"
		/>
	</svg>
);
export default StorageIcon;
