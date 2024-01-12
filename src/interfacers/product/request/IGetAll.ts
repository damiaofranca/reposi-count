export interface IGetAllRequest {
	filters: {
		name?: string;
		brand?: string;
		date_selected?: string;
	};
}

export type IFilteredParams =
	| { label: "Nome"; value: "name"; search: string }
	| { label: "Marca"; value: "brand"; search: string }
	| { label: "Data"; value: "date_selected"; search: string };
