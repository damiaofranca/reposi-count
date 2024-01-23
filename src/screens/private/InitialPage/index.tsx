import { useDashboardData } from "../../../api/storages";
import { FilterChangeIcon } from "../../../assets/icons/FilterChange";
import {
	Title,
	CardDashboard,
	RecentOutputs,
	RankingTopFive,
	QuantityByBrands,
	Graphic,
	ItemsWithLowStock,
} from "../../../components";
import {
	Center,
	Container,
	WrapperCards,
	ContainerHeader,
	WrapperGraphics,
} from "./styles";
import { Button, Spinner } from "@nextui-org/react";
import { StyleSheetManager } from "styled-components";
import { useTransactionHistoric } from "../../../api/storages/hooks/TransactionHistoric";

export interface InitialPageProps {}

export const InitialPage: React.FC<InitialPageProps> = () => {
	const { data, isLoading } = useDashboardData({});
	const { data: dataTransaction, isLoading: isLoadingTransaction } =
		useTransactionHistoric({});

	return (
		<Container>
			<ContainerHeader>
				<Title className="text-content2">Dashboard</Title>

				<Button
					color="primary"
					variant="shadow"
					endContent={<FilterChangeIcon />}
				>
					Filtros
				</Button>
			</ContainerHeader>
			{!isLoading && data ? (
				<>
					<StyleSheetManager
						shouldForwardProp={(prop) => prop !== "totalTypeUnit"}
					>
						<WrapperCards
							totalTypeUnit={data.productsCountByQuantityType.length || 0}
						>
							<CardDashboard
								title="Total De Produtos"
								value={`${data.totalProductCount ? data.totalProductCount : 0}`}
							/>
							<CardDashboard
								title="Total De Estoques"
								value={`${
									data.totalStoragesCount ? data.totalStoragesCount : 0
								}`}
							/>

							{data.productsCountByQuantityType.map((productByType, idx) => (
								<CardDashboard
									key={idx}
									title={`Total de ${productByType.quantity_type}`}
									value={`${
										productByType.product_count
											? productByType.product_count
											: 0
									}`}
								/>
							))}
						</WrapperCards>
					</StyleSheetManager>
					{dataTransaction && !isLoadingTransaction ? (
						<Graphic data={dataTransaction} />
					) : (
						<Center>
							<Spinner color="primary" label="Carregando..." />
						</Center>
					)}
					<WrapperGraphics>
						<RankingTopFive storages={data.topFiveStorages || []} />
						<QuantityByBrands brands={data.quantitiesByBrand || []} />
						<ItemsWithLowStock products={data.itemsWithLowStock || []} />
						<RecentOutputs entries={data.recentEntriesExits || []} />
					</WrapperGraphics>
				</>
			) : (
				<Center>
					<Spinner color="primary" label="Carregando..." />
				</Center>
			)}
		</Container>
	);
};
