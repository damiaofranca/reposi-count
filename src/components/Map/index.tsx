import React from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useGetStores } from "../../hooks";

import MarkerIcon from "../../assets/icons/marker.svg";
import { contentInfoWindow } from "../../utils/contentInfoWindow";

const Map: React.FC = () => {
	const { stores } = useGetStores();
	const [map, setMap] = React.useState<google.maps.Map | null>(null);

	React.useEffect(() => {
		if (map && stores.length) {
			stores.map((store) => {
				const infoWindow = new google.maps.InfoWindow({
					ariaLabel: "Open Sans",
					content: contentInfoWindow(store),
				});

				const marker = new window.google.maps.Marker({
					map,
					icon: MarkerIcon,
					position: { lat: store.lat, lng: store.lng },
				});

				marker.addListener("click", () => {
					infoWindow.open({
						map,
						anchor: marker,
					});
				});
			});
		}
	}, [stores]);

	React.useEffect(() => {
		const _map = new window.google.maps.Map(document.getElementById("map")!, {
			zoom: 12,
			mapTypeId: "terrain",
			streetViewControl: false,
			center: { lat: -6.2091486, lng: -38.4988093 },
		});

		setMap(_map);
	}, []);

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<div
				id="map"
				key={"map-stores"}
				style={{
					width: "100%",
					height: "100%",
					borderRadius: 10,
				}}
			></div>
		</div>
	);
};

export const MapPartners: React.FC = () => {
	const apiKey = process.env.REACT_APP_GOOGLE_API || "";

	const renderMap = (status: Status) => {
		switch (status) {
			case Status.LOADING:
				return <div>Carregando...</div>;

			case Status.FAILURE:
				return <div>Erro</div>;

			case Status.SUCCESS:
				return <Map />;
		}
	};

	return (
		<Wrapper
			apiKey={apiKey}
			render={renderMap}
			key={"wrapper-criation"}
			libraries={["marker", "maps"]}
		></Wrapper>
	);
};
