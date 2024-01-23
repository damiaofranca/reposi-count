export interface ITransitionResponse {
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
