import { useEffect, useState } from "react";
import { QuantitiesByBrand } from "../../interfacers/storage/response/IDashboard";
import {
	Title,
	ListItem,
	TitleList,
	LabelList,
	Container,
	ContainerList,
	NoRegisteredProducts,
	ContainerFilter,
} from "./styles";
import { Input } from "@nextui-org/react";
import { MagnifyIcon } from "../../assets/icons/Magnify";

interface QuantityByBrandsProps {
	brands: QuantitiesByBrand[];
}

export const QuantityByBrands: React.FC<QuantityByBrandsProps> = ({
	brands,
}) => {
	const [searchFilter, setFilter] = useState<string>("");
	const [brandsFiltred, setBrandsFiltred] = useState<QuantitiesByBrand[]>([]);

	const onFilter = () => {
		setBrandsFiltred(() =>
			brands.filter(
				(brand) =>
					brand.brand
						.normalize("NFD")
						.toLowerCase()
						.includes(searchFilter.toLowerCase()) || searchFilter.length === 0,
			),
		);
	};

	const onChangeFilter = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
		setFilter(target.value);

	useEffect(() => {
		onFilter();
	}, [searchFilter]);

	return (
		<Container className="bg-content3">
			<Title className="text-content2">Quantidades por marca</Title>
			<ContainerFilter>
				<Input
					size="sm"
					variant="bordered"
					value={searchFilter}
					onChange={onChangeFilter}
					placeholder="Buscar Marca"
					startContent={<MagnifyIcon />}
				/>
			</ContainerFilter>
			{brandsFiltred && brandsFiltred.length ? (
				<ContainerList>
					<ListItem>
						<TitleList className="text-content2">Marca</TitleList>
						<TitleList className="text-content2">Total de itens</TitleList>
					</ListItem>
					{brandsFiltred.map((brandsFiltred, idx) => (
						<ListItem key={idx}>
							<LabelList className="text-content2">
								{brandsFiltred.brand}
							</LabelList>
							<LabelList className="text-content2">
								{brandsFiltred.quantity}
							</LabelList>
						</ListItem>
					))}
				</ContainerList>
			) : (
				<NoRegisteredProducts className="bg-content4">
					Sem produto cadastrados
				</NoRegisteredProducts>
			)}
		</Container>
	);
};
