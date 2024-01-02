import React from "react";
import { Button } from "@nextui-org/react";

import { CreateStore } from "../../../components";
import plusIcon from "../../../assets/icons/plus.svg";

import { Title, Container, RegisterIcon, ContainerHeader } from "./styles";

interface PartnersStoresProps {}

export const PartnersStores: React.FC<PartnersStoresProps> = () => {
	const [showModalCreateStore, setShowModalCreateStore] =
		React.useState<boolean>(false);

	const onAddStore = () => setShowModalCreateStore(true);

	const onCloseStore = () => setShowModalCreateStore(false);

	return (
		<>
			<Container className="bg-content3">
				<ContainerHeader>
					<Title className="text-content2">Mapa de lojas</Title>
					<Button
						color="primary"
						endContent={<RegisterIcon src={plusIcon} alt="Cadastrar loja" />}
						onClick={onAddStore}
					>
						Cadastrar loja
					</Button>
				</ContainerHeader>
				{/* <MapPartners /> */}
			</Container>
			{showModalCreateStore && <CreateStore onClose={onCloseStore} />}
		</>
	);
};
