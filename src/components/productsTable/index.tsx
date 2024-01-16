import { FC, useCallback, useEffect } from "react";
import {
	Table,
	Tooltip,
	TableRow,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
} from "@nextui-org/react";

import { useGetAllProduct } from "../../api/products";
import { EditIcon } from "../../assets/icons/Edit";
import { Meta } from "../../interfacers/common/iBaseList";
import { IProduct } from "../../interfacers/product";
import { columnsProducts } from "../../utils/tables";

interface IProductsTable {
	filter: {
		page?: number;
		name?: string;
		brand?: string;
		date_selected?: string;
		type_of_product?: string;
	};
	metaPage: (value: Meta) => void;
	onLoading: (value: boolean) => void;
}

interface IColumnProduct
	extends Pick<
		IProduct,
		| "name"
		| "quantity"
		| "type_of_product"
		| "type_of_quantity"
		| "brand"
		| "id"
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

export const ProductsTable: FC<IProductsTable> = ({
	filter,
	metaPage,
	onLoading,
}) => {
	// const confirmModalRef = useRef<any>(null);
	// const [productSelected, setProductSelected] = useState<IProduct | null>(null);
	const { data, isLoading } = useGetAllProduct({
		filters: {
			limit: 10,
			...(filter.page ? { page: filter.page } : {}),
			...(filter.name ? { name: filter.name } : {}),
			...(filter.brand ? { brand: filter.brand } : {}),
			...(filter.date_selected ? { date_selected: filter.date_selected } : {}),
			...(filter.type_of_product
				? { type_of_product: filter.type_of_product }
				: {}),
		},
	});
	// const { mutateAsync: onDelete } = useDeleteProduct({
	// 	onSuccess: () => {
	// 		toast.success("Produto deletado com sucesso.", { autoClose: 700 });
	// 		queryClient.invalidateQueries("products");
	// 	},
	// });

	// const onDeleteProductFn = async () => {
	// 	if (productSelected) {
	// 		try {
	// 			await onDelete({ id: productSelected.id });
	// 		} catch {}
	// 	}
	// };

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
						<Tooltip content="Transferência para envio">
							<span className="text-lg text-default-400 cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50">
								<EditIcon />
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

	return (
		<>
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

			{/* <ConfirmModal
				submitText="Remover"
				submitColor="danger"
				ref={confirmModalRef}
				submitFn={onDeleteProductFn}
				content={
					<span className="text-sm text-default-400">
						Têm certeza que deseja remover essa marca ?
					</span>
				}
			>
				<span className="text-lg text-danger cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50">
					<DeleteIcon />
				</span>
			</ConfirmModal> */}
		</>
	);
};
