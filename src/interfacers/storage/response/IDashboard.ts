export interface IDashboardResponse {
	topFiveStorages: TopFiveStorage[];
	quantitiesByBrand: QuantitiesByBrand[];
	itemsWithLowStock: ItemsWithLowStock[];
	recentEntriesExits: RecentEntriesExit[];
	transactionHistory: TransactionHistory[];
}

export interface ItemsWithLowStock {
	product_id: string;
	product_name: string;
	product_quantity: string;
	product_type_of_quantity: string;
}

export interface QuantitiesByBrand {
	brand: string;
	quantity: string;
}

export interface RecentEntriesExit {
	quantity: string;
	product_name: string;
	quantity_type: string;
	entry_exit_date: Date;
}

export interface TopFiveStorage {
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
