import { useEffect, useState } from "react";
import { TopFiveStorages } from "../../interfacers/storage/response/IDashboard";
import {
	Title,
	ListItem,
	TitleList,
	LabelList,
	Container,
	ContainerList,
	NoRegisteredStorages,
	ContainerFilter,
} from "./styles";
import { Input } from "@nextui-org/react";
import { MagnifyIcon } from "../../assets/icons/Magnify";

interface RankingTopFiveProps {
	storages: TopFiveStorages[];
}

export const RankingTopFive: React.FC<RankingTopFiveProps> = ({ storages }) => {
	const [searchFilter, setFilter] = useState<string>("");
	const [storagesFiltred, setStoragesFiltred] = useState<TopFiveStorages[]>([]);

	const onFilter = () => {
		setStoragesFiltred(() =>
			storages.filter(
				(entrie) =>
					entrie.storage_identifier
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
			<Title className="text-content2">Ranking De Estoques</Title>
			<ContainerFilter>
				<Input
					size="sm"
					variant="bordered"
					value={searchFilter}
					onChange={onChangeFilter}
					placeholder="Buscar Estoque"
					startContent={<MagnifyIcon />}
				/>
			</ContainerFilter>

			{storagesFiltred && storagesFiltred.length ? (
				<ContainerList>
					<ListItem>
						<TitleList className="text-content2">Estoque</TitleList>
						<TitleList className="text-content2">Total de itens</TitleList>
					</ListItem>
					{storagesFiltred.map((storage) => (
						<ListItem key={storage.storage_id}>
							<LabelList className="text-content2">
								{storage.storage_identifier}
							</LabelList>
							<LabelList className="text-content2">
								{storage.product_count}
							</LabelList>
						</ListItem>
					))}
				</ContainerList>
			) : (
				<NoRegisteredStorages className="bg-content4">
					Sem estoques cadastrados
				</NoRegisteredStorages>
			)}
		</Container>
	);
};
