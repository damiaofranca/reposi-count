import * as React from "react";

interface IHomeIcon {
	theme: "light" | "dark";
}

const HomeIcon: React.FC<IHomeIcon> = ({ theme, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		fill="none"
		{...props}
	>
		<path
			fill={theme === "light" ? "#739072" : "#ffff"}
			d="M16.428 11.071v5.357c0 .194-.07.361-.212.503a.687.687 0 0 1-.502.212h-4.286v-4.286H8.572v4.286H4.286a.687.687 0 0 1-.503-.212.687.687 0 0 1-.212-.503v-5.357c0-.007.002-.018.006-.033a.152.152 0 0 0 .006-.034L10 5.714l6.417 5.29a.156.156 0 0 1 .011.067Zm2.49-.77-.693.826a.38.38 0 0 1-.234.123h-.034a.343.343 0 0 1-.234-.078L10 4.732l-7.723 6.44a.415.415 0 0 1-.268.078.38.38 0 0 1-.234-.123l-.692-.826a.362.362 0 0 1-.079-.262c.008-.1.049-.18.123-.24l8.025-6.685c.238-.194.52-.29.848-.29.327 0 .61.096.848.29l2.723 2.277V3.214c0-.104.034-.19.1-.256a.348.348 0 0 1 .258-.1h2.142c.104 0 .19.033.257.1s.1.152.1.256v4.554l2.445 2.031c.074.06.115.14.122.24a.362.362 0 0 1-.078.262Z"
		/>
	</svg>
);
export default HomeIcon;
