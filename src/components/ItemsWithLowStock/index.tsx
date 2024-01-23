import { useEffect, useState } from "react";
import { IItemsWithLowStock } from "../../interfacers/storage/response/IDashboard";
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

interface ItemsWithLowStockProps {
	products: IItemsWithLowStock[];
}

export const ItemsWithLowStock: React.FC<ItemsWithLowStockProps> = ({
	products,
}) => {
	const [searchFilter, setFilter] = useState<string>("");
	const [entriesFiltred, setEntriesFiltred] = useState<IItemsWithLowStock[]>(
		[],
	);

	const onFilter = () => {
		setEntriesFiltred(() =>
			products.filter(
				(product) =>
					product.product_name
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
			<Title className="text-content2">Itens Com Baixo Estoque</Title>
			<ContainerFilter>
				<Input
					size="sm"
					variant="bordered"
					value={searchFilter}
					onChange={onChangeFilter}
					placeholder="Buscar Produto"
					startContent={<MagnifyIcon />}
				/>
			</ContainerFilter>
			{entriesFiltred && entriesFiltred.length ? (
				<ContainerList>
					<ListItem>
						<TitleList className="text-content2">Produto</TitleList>
						<TitleList className="text-content2">Total de itens</TitleList>
					</ListItem>
					{entriesFiltred.map((entrie, idx) => (
						<ListItem key={idx}>
							<LabelList className="text-content2">
								{entrie.product_name}
							</LabelList>
							<LabelList className="text-content2">
								{entrie.product_quantity}&nbsp;
								{entrie.product_type_of_quantity}
							</LabelList>
						</ListItem>
					))}
				</ContainerList>
			) : (
				<NoRegisteredProducts className="bg-content4">
					Sem atualizações no momento.
				</NoRegisteredProducts>
			)}
		</Container>
	);
};
