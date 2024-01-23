export interface IDashboardResponse {
	totalProductCount: number;
	totalStoragesCount: number;
	topFiveStorages: TopFiveStorages[];
	quantitiesByBrand: QuantitiesByBrand[];
	itemsWithLowStock: IItemsWithLowStock[];
	recentEntriesExits: RecentEntriesExit[];
	transactionHistory: TransactionHistory[];
	productsCountByQuantityType: ProductsCountByQuantityType[];
}

export interface IItemsWithLowStock {
	product_id: string;
	product_name: string;
	product_quantity: string;
	product_type_of_quantity: string;
}

export interface ProductsCountByQuantityType {
	quantity_type: string;
	product_count: string;
}

export interface QuantitiesByBrand {
	brand: string;
	quantity: string;
}

export interface RecentEntriesExit {
	quantity: string;
	product_name: string;
	entry_exit_date: Date;
	quantity_type: string;
}

export interface TopFiveStorages {
	storage_id: string;
	product_count: string;
	storage_identifier: string;
}

export interface TransactionHistory {
	transfer_id: string;
	to_product: Product;
	from_product: Product;
	transaction_date: Date;
	transfer_quantity: string;
}

export interface Product {
	id: string;
	name: string;
}
