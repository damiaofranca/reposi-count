export interface IGetAllRequest {
	filters: {
		cep?: string;
		city?: string;
		page?: number;
		limit?: number;
		state?: string;
		street?: string;
		identifier?: string;
		local_number?: number;
	};
}

export type IFilteredParams =
	| { label: "CEP"; value: "cep"; search: string }
	| { label: "Rua"; value: "street"; search: string }
	| { label: "Cidade"; value: "city"; search: string }
	| { label: "Estado"; value: "state"; search: string }
	| { label: "Numéro"; value: "local_number"; search: string }
	| { label: "Identificação"; value: "identifier"; search: string };
