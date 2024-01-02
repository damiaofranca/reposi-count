import { useGetStores } from "../../hooks";

import {
	Title,
	ListItem,
	TitleList,
	LabelList,
	Container,
	ContainerList,
	NoRegisteredStores,
} from "./styles";

interface RankingCitiesProps {}

export const RankingCities: React.FC<RankingCitiesProps> = () => {
	const { topEightCities } = useGetStores();

	return (
		<Container className="bg-content3">
			<Title className="text-content2">Ranking de cidades</Title>

			{topEightCities && topEightCities.length ? (
				<ContainerList>
					<ListItem>
						<TitleList className="text-content2">Cidade</TitleList>
						<TitleList className="text-content2">Montante</TitleList>
					</ListItem>
					{topEightCities.map((city) => (
						<ListItem key={city.name}>
							<LabelList className="text-content2">{city.name}</LabelList>
							<LabelList className="text-content2">
								R${city.totalMount}
							</LabelList>
						</ListItem>
					))}
				</ContainerList>
			) : (
				<NoRegisteredStores>Sem lojas cadastradas</NoRegisteredStores>
			)}
		</Container>
	);
};
