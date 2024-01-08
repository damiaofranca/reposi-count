import * as React from "react";

interface IMapDashboardIcon {
	theme: "light" | "dark";
}

const MapDashboardIcon: React.FC<IMapDashboardIcon> = ({ theme, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		fill="none"
		{...props}
	>
		<path
			fill={theme === "light" ? "#739072" : "#ffff"}
			d="M6.32 8.56h2.6c-.08-.2-.2-.36-.28-.52l-1.76.28-1.56-.24-.12.28h.16c.4-.04.72.04.96.2Zm4.44.6 2.32 1.88c-.04-.12-.04-.2-.04-.28 0-1 .8-1.84 1.84-1.84 1 0 1.84.8 1.84 1.84 0 .12-.04.32-.08.48l1.24-.44-1.76-2.76a.492.492 0 0 0-.4-.2l-2.64.44L11.36 8c-.16.4-.36.76-.6 1.16Z"
		/>
		<path
			fill={theme === "light" ? "#739072" : "#ffff"}
			d="m19.52 13.4-1.44-2.24-1.64.6c-.32.84-.88 1.92-1.24 2.56-.16.28-.52.28-.68 0-.36-.64-.92-1.72-1.24-2.56l-2.8-2.24c-.12.12-.32.16-.52.16-.28 0-.56-.16-.72-.4-.04-.08-.12-.2-.16-.28H6.76c.28.32.44.76.44 1.2v.08c.44.04.76.12 1 .48.48.72-.16 1.16.16 1.64.24.4.64.28 1.52.44l1.64.24c.56.08.92.56.88 1.12v.76l3.04 1.52 4-2.48c.16-.16.2-.4.08-.6Z"
		/>
		<path
			fill={theme === "light" ? "#739072" : "#ffff"}
			d="M11.52 13.48c-2.32-.44-3.04-.2-3.44-.88-.48-.72.24-1.08-.12-1.64-.16-.24-.36-.28-.76-.28-.24.92-1 2.32-1.44 3.16-.16.28-.56.28-.72 0-.56-1-1.52-2.92-1.52-3.64 0-.8.48-1.48 1.2-1.76l.24-.48-.68-.12c-.16-.04-.32.04-.4.2L.48 13.4c-.12.2-.08.44.12.56l3.96 2.48L10 13.76l2 1 .08-.6c0-.36-.2-.64-.56-.68Zm-1.16-4.4c.56-1 1.52-2.92 1.52-3.64 0-1.04-.84-1.88-1.88-1.88s-1.88.84-1.88 1.88c0 .76 1 2.64 1.52 3.64.2.28.6.28.72 0ZM9 5.4c0-.56.44-1 1.04-1 .56 0 1 .44 1 1s-.44 1-1 1C9.48 6.44 9 5.96 9 5.4ZM14.88 11.76a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
		/>
		<path
			fill={theme === "light" ? "#739072" : "#ffff"}
			d="M5.4 11.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
		/>
	</svg>
);
export default MapDashboardIcon;
