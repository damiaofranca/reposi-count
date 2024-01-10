export interface IGetAllRequest {
	filters: {
		name?: string;
		page?: number;
		limit?: number;
	};
}
