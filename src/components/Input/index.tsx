import React from "react";

import EyeOffIcon from "../../assets/icons/show-password.svg";
import EyeShowIcon from "../../assets/icons/hide-password.svg";

import { Container, ContainerIcon, Icon, InputClusterer } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	isToPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({ ...props }) => {
	const propsCustom = { ...props };
	delete propsCustom.isToPassword;
	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	return (
		<Container>
			<InputClusterer
				{...propsCustom}
				type={props.isToPassword && showPassword ? "password" : "text"}
			/>
			{props.isToPassword && (
				<ContainerIcon onClick={() => setShowPassword(!showPassword)}>
					<Icon src={showPassword ? EyeShowIcon : EyeOffIcon} />
				</ContainerIcon>
			)}
		</Container>
	);
};
