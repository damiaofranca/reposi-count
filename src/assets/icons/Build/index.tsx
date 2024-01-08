import * as React from "react";

interface IBuildIcon {
	theme: "light" | "dark";
}

const BuildIcon: React.FC<IBuildIcon> = ({ theme, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		fill="none"
		{...props}
	>
		<g clipPath="url(#a)">
			<path
				fill={theme === "light" ? "#739072" : "#ffff"}
				d="M12.5 2.5h1.25v1.25H12.5V2.5Zm2.5 0h1.25v1.25H15V2.5ZM12.5 5h1.25v1.25H12.5V5ZM15 5h1.25v1.25H15V5Zm-2.5 2.5h1.25v1.25H12.5V7.5Zm2.5 0h1.25v1.25H15V7.5ZM12.5 10h1.25v1.25H12.5V10Zm2.5 0h1.25v1.25H15V10Zm-2.5 2.5h1.25v1.25H12.5V12.5Zm2.5 0h1.25v1.25H15V12.5ZM17.5 0h-6.25A1.25 1.25 0 0 0 10 1.25V5H3.75A1.25 1.25 0 0 0 2.5 6.25v12.5A1.25 1.25 0 0 0 3.75 20H17.5a1.25 1.25 0 0 0 1.25-1.25V1.25A1.25 1.25 0 0 0 17.5 0Zm-10 18.75H6.25v-2.5H7.5v2.5Zm1.25 0V15H5v3.75H3.75V6.25H10v12.5H8.75Zm6.25 0h-1.25v-2.5H15v2.5Zm2.5 0h-1.25V15H12.5v3.75h-1.25V1.25h6.25v17.5ZM5 7.5h1.25v1.25H5V7.5Zm2.5 0h1.25v1.25H7.5V7.5ZM5 10h1.25v1.25H5V10Zm2.5 0h1.25v1.25H7.5V10ZM5 12.5h1.25v1.25H5V12.5Zm2.5 0h1.25v1.25H7.5V12.5Z"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h20v20H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default BuildIcon;
