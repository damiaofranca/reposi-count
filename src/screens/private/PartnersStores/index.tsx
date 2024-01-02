import React from "react";
import { Button } from "@nextui-org/react";

import { Title, RegisterIcon } from "../../../components";
import plusIcon from "../../../assets/icons/plus.svg";

import { Container, ContainerHeader } from "./styles";

interface PartnersStoresProps {}

export const PartnersStores: React.FC<PartnersStoresProps> = () => {
	// const [showModalCreateStore, setShowModalCreateStore] =
	// 	React.useState<boolean>(false);

	// const onAddStore = () => setShowModalCreateStore(true);

	// const onCloseStore = () => setShowModalCreateStore(false);

	return (
		<>
			<Container className="bg-content3">
				<ContainerHeader>
					<Title className="text-content2">Mapa de lojas</Title>
					<Button
						color="primary"
						// onClick={onAddStore}
						startContent={<RegisterIcon src={plusIcon} alt="Cadastrar loja" />}
					>
						Cadastrar loja
					</Button>
				</ContainerHeader>
				{/* <MapPartners /> */}
			</Container>
			{/* {showModalCreateStore && <CreateStore onClose={onCloseStore} />} */}
		</>
	);
};
