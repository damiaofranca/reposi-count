import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
	Table,
	Tooltip,
	TableRow,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
} from "@nextui-org/react";

import { useAuth } from "../../hooks";
import { useGetAllBrand } from "../../api/brands";
import { EditIcon } from "../../assets/icons/Edit";
import { DeleteIcon } from "../../assets/icons/Delete";
import { Meta } from "../../interfacers/common/iBaseList";
import { ConfirmModal } from "../ConfirmModal";
import { IBrand } from "../../interfacers/brand";

interface IBrandsTable {
	filter: {
		name?: string;
		cnpj?: string;
		page?: number;
	};
	metaPage: (value: Meta) => void;
	onUpdate: (value: IBrand) => void;
	onLoading: (value: boolean) => void;
}

interface IColumnBrand {
	name: string;
	cnpj: string;
	actions?: string;
}

type ColumnKey = "name" | "cnpj" | "actions";

const columns = [
	{
		key: "name",
		label: "Nome",
	},
	{
		key: "cnpj",
		label: "CNPJ",
	},
	{
		key: "actions",
		label: "Ações",
	},
];

export const BrandsTable: FC<IBrandsTable> = ({
	filter,
	onUpdate,
	metaPage,
	onLoading,
}) => {
	const { user } = useAuth();
	const confirmModalRef = useRef<any>(null);
	const [brandSelected, setBrandSelected] = useState<IBrand | null>(null);
	const { data, isLoading } = useGetAllBrand({
		filters: {
			limit: 10,
			...(filter.name ? { name: filter.name } : {}),
			...(filter.cnpj ? { cnpj: filter.cnpj } : {}),
			...(filter.page ? { page: filter.page } : {}),
		},
	});

	const onDeleteBrand = (brand: IBrand) => {
		setBrandSelected(brand);
		confirmModalRef?.current?.onOpen();
	};

	const renderCell = useCallback((brand: any, columnKey: ColumnKey) => {
		const cellValue = brand[columnKey];

		switch (true) {
			case columnKey === "name":
				return <p className="text-bold text-sm capitalize">{cellValue}</p>;
			case columnKey === "cnpj":
				return <p className="text-bold text-sm capitalize">{cellValue}</p>;
			case columnKey === "actions" && user && user.user_type === "ADMIN":
				return (
					<div className="relative flex items-center gap-2 justify-end">
						<Tooltip content="Editar marca">
							<span
								className="text-lg text-default-400 cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50"
								onClick={() => onUpdate(brand)}
							>
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Deletar marca">
							<span
								className="text-lg text-danger cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50"
								onClick={() => onDeleteBrand(brand)}
							>
								<DeleteIcon />
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
				<Table aria-label="Brands list" isStriped>
					<TableHeader columns={columns}>
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
						{(item: IColumnBrand) => (
							<TableRow key={item.cnpj}>
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

			<ConfirmModal
				submitText="Remover"
				submitColor="danger"
				ref={confirmModalRef}
				submitFn={() => console.log(brandSelected)}
				content={
					<span className="text-sm text-default-400">
						Têm certeza que deseja remover essa marca ?
					</span>
				}
			>
				<span className="text-lg text-danger cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50">
					<DeleteIcon />
				</span>
			</ConfirmModal>
		</>
	);
};
