import {
	Ref,
	useRef,
	useState,
	useEffect,
	forwardRef,
	useCallback,
	useImperativeHandle,
} from "react";
import {
	Table,
	Tooltip,
	TableRow,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
} from "@nextui-org/react";

import { IProduct } from "../../interfacers/product";
import { TransferProduct } from "../TransferProduct";
import { columnsProducts } from "../../utils/tables";
import { useGetAllProduct } from "../../api/products";
import { Meta } from "../../interfacers/common/iBaseList";
import { TransferIcon } from "../../assets/icons/Transfer";

interface IProductsTable {
	filter: {
		page?: number;
		name?: string;
		brand?: string;
		storage: string;
		date_selected?: string;
		type_of_product?: string;
	};
	metaPage: (value: Meta) => void;
	onLoading: (value: boolean) => void;
}

export interface IRefProductsTable {
	onRefetch: () => void;
}

interface IColumnProduct
	extends Pick<
		IProduct,
		| "id"
		| "name"
		| "brand"
		| "quantity"
		| "type_of_product"
		| "type_of_quantity"
	> {
	actions?: string;
}

type ColumnKey =
	| "id"
	| "name"
	| "brand"
	| "quantity"
	| "actions"
	| "type_of_product"
	| "type_of_quantity";

export const ProductsTable = forwardRef(
	(
		{ filter, metaPage, onLoading }: IProductsTable,
		ref: Ref<IRefProductsTable>,
	) => {
		const [productSelected, setProductSelected] = useState<{
			id: string;
			name: string;
			quantity: string;
		} | null>(null);
		const confirmModalRef = useRef<any>(null);
		const { data, isLoading, refetch } = useGetAllProduct({
			filters: {
				limit: 10,
				storage: filter.storage,
				...(filter.page ? { page: filter.page } : {}),
				...(filter.name ? { name: filter.name } : {}),
				...(filter.brand ? { brand: filter.brand } : {}),
				...(filter.date_selected
					? { date_selected: filter.date_selected }
					: {}),
				...(filter.type_of_product
					? { type_of_product: filter.type_of_product }
					: {}),
			},
		});

		const onTransferProduct = (product: {
			id: string;
			name: string;
			quantity: string;
		}) => {
			setProductSelected(product);
			confirmModalRef?.current?.onOpen();
		};

		const renderCell = useCallback((product: any, columnKey: ColumnKey) => {
			const cellValue = product[columnKey];

			switch (true) {
				case columnKey === "name":
					return (
						<p className="text-bold text-sm capitalize dark:text-gray-400">
							{cellValue}
						</p>
					);
				case columnKey === "brand":
					return (
						<p className="text-bold text-sm capitalize dark:text-gray-400">
							{cellValue}
						</p>
					);
				case columnKey === "quantity":
					return (
						<p className="text-bold text-sm capitalize dark:text-gray-400">
							{cellValue}
						</p>
					);
				case columnKey === "type_of_quantity":
					return (
						<p className="text-bold text-sm capitalize dark:text-gray-400">
							{cellValue}
						</p>
					);
				case columnKey === "type_of_product":
					return (
						<p className="text-bold text-sm capitalize dark:text-gray-400">
							{cellValue}
						</p>
					);
				case columnKey === "actions":
					return (
						<div className="relative flex items-center gap-2 justify-end">
							<Tooltip content="Transferência produto">
								<span
									className="text-lg text-default-400 cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50"
									onClick={() =>
										onTransferProduct({
											id: product.id,
											name: product.name,
											quantity: product.quantity,
										})
									}
								>
									<TransferIcon />
								</span>
							</Tooltip>
						</div>
					);
				default:
					return cellValue;
			}
		}, []);

		useEffect(() => {
			onLoading(isLoading);
		}, [isLoading]);

		useEffect(() => {
			if (data) {
				metaPage(data.meta);
			}
		}, [data]);

		useImperativeHandle(
			ref,
			() => {
				return {
					onRefetch: () => {
						refetch();
					},
				};
			},
			[],
		);

		return (
			<div>
				{data ? (
					<Table aria-label="Products list" isStriped>
						<TableHeader columns={columnsProducts}>
							{(column) => (
								<TableColumn
									key={column.key}
									className={column.key === "actions" ? `text-end` : " "}
								>
									{column.label}
								</TableColumn>
							)}
						</TableHeader>
						<TableBody
							items={data.items}
							emptyContent={"Sem marcas cadastradas."}
						>
							{(item: IColumnProduct) => (
								<TableRow key={item.id}>
									{(columnKey: any) => (
										<TableCell>{renderCell(item, columnKey)}</TableCell>
									)}
								</TableRow>
							)}
						</TableBody>
					</Table>
				) : (
					<></>
				)}

				{productSelected ? (
					<TransferProduct
						storage={filter.storage}
						product={productSelected}
						submitFn={() => refetch()}
						onClose={() => setProductSelected(null)}
					/>
				) : (
					<></>
				)}
			</div>
		);
	},
);
