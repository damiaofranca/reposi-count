import { FC, Key } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import {
	Container,
	AddProductBtn,
	ContainerTitle,
	ContainerHeader,
} from "./styles";

import plusIcon from "../../../assets/icons/plus.svg";
import { useGetOneStorage } from "../../../api/storages";
import { RegisterIcon, Title } from "../../../components";

interface IStoreDetail {}

export const StoreDetail: FC<IStoreDetail> = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { isLoading, data } = useGetOneStorage({ id: id || "" });

	const onBack = (key: Key) => {
		navigate(`/${key}`);
	};

	return (
		<Container className="bg-content3">
			{data && !isLoading ? (
				<ContainerHeader>
					<ContainerTitle>
						<Title className="text-content2">Detalhes Do Estoque</Title>
						<Breadcrumbs onAction={onBack}>
							<BreadcrumbItem key="storages">Estoques</BreadcrumbItem>
							<BreadcrumbItem key="detail">{data.identifier}</BreadcrumbItem>
						</Breadcrumbs>
					</ContainerTitle>
					<div className="flex">
						<div>
							<AddProductBtn
								color="primary"
								variant="shadow"
								startContent={
									<RegisterIcon src={plusIcon} alt="Cadastrar produto" />
								}
							>
								Cadastrar produto
							</AddProductBtn>
						</div>
					</div>
				</ContainerHeader>
			) : (
				<div className="h-full flex items-center justify-center">
					<Spinner color="primary" label="Carregando..." />
				</div>
			)}
		</Container>
	);
};
