import { useEffect, useState } from "react";
import { RecentEntriesExit } from "../../interfacers/storage/response/IDashboard";
import {
	Title,
	ListItem,
	TitleList,
	LabelList,
	Container,
	ContainerList,
	NoRegisteredOutputs,
	ContainerFilter,
} from "./styles";
import { Input } from "@nextui-org/react";
import { MagnifyIcon } from "../../assets/icons/Magnify";

interface RecentOutputsProps {
	entries: RecentEntriesExit[];
}

export const RecentOutputs: React.FC<RecentOutputsProps> = ({ entries }) => {
	const [searchFilter, setFilter] = useState<string>("");
	const [entriesFiltred, setEntriesFiltred] = useState<RecentEntriesExit[]>([]);

	const onFilter = () => {
		setEntriesFiltred(() =>
			entries.filter(
				(entrie) =>
					entrie.product_name
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
			<Title className="text-content2">Entradas Recentes</Title>
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
								{entrie.quantity}&nbsp;
								{entrie.quantity_type}
							</LabelList>
						</ListItem>
					))}
				</ContainerList>
			) : (
				<NoRegisteredOutputs className="bg-content4">
					Sem atualizações no momento.
				</NoRegisteredOutputs>
			)}
		</Container>
	);
};
