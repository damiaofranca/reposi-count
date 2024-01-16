import React from "react";
import { Input as InputNext, InputProps } from "@nextui-org/react";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../index";

export const InputNew: React.FC<InputProps> = ({ ...props }) => {
	const [showPassword, setShowPassword] = React.useState<boolean>(true);

	const toggleVisibility = () => setShowPassword(!showPassword);

	return (
		<InputNext
			{...props}
			{...(props.type === "password"
				? {
						endContent: (
							<button
								type="button"
								onClick={toggleVisibility}
								className="focus:outline-none"
							>
								{showPassword ? <EyeFilledIcon /> : <EyeSlashFilledIcon />}
							</button>
						),
				  }
				: {})}
			type={props.type === "password" && showPassword ? "password" : props.type}
			variant="bordered"
		/>
	);
};
