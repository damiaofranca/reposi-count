import styled from "styled-components";

export const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

export const FormItem = styled.div`
	display: flex;
	margin-bottom: 16px;
	flex-direction: column;

	&:last-child {
		margin-bottom: 24px;
	}
`;

export const ContainerSubmit = styled.div`
	width: 100%;
	margin-top: 24px;
	margin-bottom: 35px;
`;
