export interface IBaseList<T = unknown> {
	items: T[];
	meta: {
		itemCount: number;
		totalItems: number;
		totalPages: number;
		currentPage: number;
		itemsPerPage: number;
	};
}
