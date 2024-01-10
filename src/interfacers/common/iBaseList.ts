export interface IBaseList<T = unknown> {
	items: T[];
	meta: Meta;
}

export interface Meta {
	itemCount: number;
	totalItems: number;
	totalPages: number;
	currentPage: number;
	itemsPerPage: number;
}
