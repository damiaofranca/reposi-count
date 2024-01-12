import { Button } from "@nextui-org/react";
import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 40px;
	display: flex;
	border-radius: 12px;
	flex-direction: column;
`;

export const ContainerHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 32px;
	justify-content: space-between;
`;

export const ContainerTitle = styled.div`
	display: flex;
	flex-direction: column;
`;

export const AddProductBtn = styled(Button)`
	height: 48px;
	min-width: 180px;
	margin-left: 18px;
`;
