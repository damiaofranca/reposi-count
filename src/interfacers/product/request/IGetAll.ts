export interface IGetAllRequest {
	filters: {
		name?: string;
		page?: number;
		limit?: number;
		brand?: string;
		date_selected?: string;
		type_of_product?: string;
	};
}

export type IFilteredParams =
	| { label: "Nome"; value: "name"; search: string }
	| { label: "Marca"; value: "brand"; search: string }
	| { label: "Data"; value: "date_selected"; search: string }
	| { label: "Tipo do produto"; value: "type_of_product"; search: string };
