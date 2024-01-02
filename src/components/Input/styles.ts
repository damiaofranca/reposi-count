import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	position: relative;
`;

export const InputClusterer = styled.input`
	width: 100%;
	color: #333;
	padding: 16px;
	font-size: 16px;
	background: #fff;
	line-height: 24px;
	border-radius: 4px;
	border: 1px solid #bdbdbd;
	&::placeholder {
		color: #bdbdbd;
		font-size: 16px;
		line-height: 24px;
	}

	&:focus {
		outline: none;
		border-color: #9f9f9f;
	}
`;

export const ContainerIcon = styled.div`
	top: 50%;
	right: 18px;
	cursor: pointer;
	position: absolute;
	transform: translateY(-50%);
`;

export const Icon = styled.img`
	width: 24px;
	height: 24px;
`;
