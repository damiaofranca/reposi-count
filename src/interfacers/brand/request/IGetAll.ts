export interface IGetAllRequest {
	filters: {
		name?: string;
		page?: number;
		limit?: number;
		no_pagination?: boolean;
	};
}

export interface IGetAllNoPaginationRequest {
	filters: {
		no_pagination?: boolean;
	};
}
