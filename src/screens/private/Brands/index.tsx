import React, { FC } from "react";
import { Button } from "@nextui-org/react";

import { Container, ContainerHeader } from "./styles";
import plusIcon from "../../../assets/icons/plus.svg";
import { RegisterIcon, Title, AddBrand } from "../../../components";

interface IBrands {}

export const Brands: FC<IBrands> = () => {
	const [showModalAddBrand, setShowModalAddBrand] =
		React.useState<boolean>(false);

	const onShowBrandModal = () => setShowModalAddBrand(true);

	const onCloseBrandModal = () => setShowModalAddBrand(false);

	return (
		<>
			<Container className="bg-content3">
				<ContainerHeader>
					<Title className="text-content2">Marcas registradas</Title>
					<Button
						color="primary"
						onClick={onShowBrandModal}
						startContent={<RegisterIcon src={plusIcon} alt="Cadastrar marca" />}
					>
						Cadastrar marca
					</Button>
				</ContainerHeader>
			</Container>
			{showModalAddBrand && <AddBrand onClose={onCloseBrandModal} />}
		</>
	);
};
