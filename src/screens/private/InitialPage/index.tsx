import { useTheme } from "../../../hooks";
import { RankingCities, Graphic, CardDashboard } from "../../../components";

import ChipIcon from "../../../assets/icons/Chip";
import BuildIcon from "../../../assets/icons/Build";
import PeopleIcon from "../../../assets/icons/People";
import MapDashboardIcon from "../../../assets/icons/MapDashboardIcon";

import { Container, WrapperCards, WrapperGraphics } from "./styles";

interface InitialPageProps {}

export const InitialPage: React.FC<InitialPageProps> = () => {
	const { theme } = useTheme();
	return (
		<Container>
			<WrapperCards>
				<CardDashboard
					value="+45mil"
					metric="growth"
					valueMetric={10}
					icon={<PeopleIcon theme={theme} />}
					subtitle="Crescimento"
					title="Total de clientes"
				/>
				<CardDashboard
					metric="middle"
					valueMetric={10}
					subtitle="Constância"
					icon={<MapDashboardIcon theme={theme} />}
					title="Total de cidades"
					value={`1000`}
				/>
				<CardDashboard
					value="+45mil"
					metric="growth"
					icon={<ChipIcon theme={theme} />}
					valueMetric={10}
					subtitle="Crescimento"
					title="Total de assinaturas"
				/>
				<CardDashboard
					metric="down"
					valueMetric={28}
					icon={<BuildIcon theme={theme} />}
					subtitle="Declinação"
					title="Total de lojas"
					value={`11000`}
				/>
			</WrapperCards>
			<WrapperGraphics>
				<Graphic />
				<RankingCities />
			</WrapperGraphics>
		</Container>
	);
};
