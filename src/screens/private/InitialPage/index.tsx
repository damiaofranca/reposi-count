import { useGetStores } from "../../../hooks";
import CardDashboard from "../../../components/CardDashboard";

//icons
import Graphic from "../../../components/Graphic";
import { RankingCities } from "../../../components";
import ChipIcon from "../../../assets/icons/chip.svg";
import BuildIcon from "../../../assets/icons/build.svg";
import PeopleIcon from "../../../assets/icons/people.svg";
import MapDashboardIcon from "../../../assets/icons/map-dashboard.svg";
//icons

import { Container, WrapperCards, WrapperGraphics } from "./styles";

interface InitialPageProps {}

export const InitialPage: React.FC<InitialPageProps> = () => {
	const { stores } = useGetStores();

	const getTotalCities = () => {
		return stores.filter((value, index, self) => {
			return (
				self.findIndex(
					(v) =>
						v.city.toLowerCase().normalize() ===
						value.city.toLowerCase().normalize(),
				) === index
			);
		}).length;
	};

	return (
		<Container>
			<WrapperCards>
				<CardDashboard
					value="+45mil"
					metric="growth"
					valueMetric={10}
					icon={PeopleIcon}
					subtitle="Crescimento"
					title="Total de clientes"
				/>
				<CardDashboard
					metric="middle"
					valueMetric={10}
					subtitle="Constância"
					icon={MapDashboardIcon}
					title="Total de cidades"
					value={`${getTotalCities() || "0"}`}
				/>
				<CardDashboard
					value="+45mil"
					metric="growth"
					icon={ChipIcon}
					valueMetric={10}
					subtitle="Crescimento"
					title="Total de assinaturas"
				/>
				<CardDashboard
					metric="down"
					valueMetric={28}
					icon={BuildIcon}
					subtitle="Declinação"
					title="Total de lojas"
					value={`${stores.length || "0"}`}
				/>
			</WrapperCards>
			<WrapperGraphics>
				<Graphic />
				<RankingCities />
			</WrapperGraphics>
		</Container>
	);
};
