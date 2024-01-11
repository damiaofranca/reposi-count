export interface IGetAllRequest {
	filters: {
		cep?: string;
		city?: string;
		page?: number;
		limit?: number;
		state?: string;
		street?: string;
		identifier?: string;
		numberStorage?: number;
	};
}

export type IFilteredParams =
	| { label: "CEP"; value: "cep"; search: string }
	| { label: "Rua"; value: "street"; search: string }
	| { label: "Cidade"; value: "city"; search: string }
	| { label: "Estado"; value: "state"; search: string }
	| { label: "Numéro"; value: "numberStorage"; search: string }
	| { label: "Identificação"; value: "identifier"; search: string };
