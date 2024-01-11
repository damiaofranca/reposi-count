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
import { useDeleteStorage, useGetAllStorage } from "../../api/storages";
import { EditIcon } from "../../assets/icons/Edit";
import { DeleteIcon } from "../../assets/icons/Delete";
import { Meta } from "../../interfacers/common/iBaseList";
import { ConfirmModal } from "../ConfirmModal";
import { IStorage } from "../../interfacers/storage";
import { toast } from "react-toastify";
import { queryClient } from "../../api";
import { columnsStorage, columnsStorageAdmin } from "../../utils/tables";

interface IStoragesTable {
	filter: {
		cep?: string;
		city?: string;
		page?: number;
		limit?: number;
		uf?: string;
		street?: string;
		district?: string;
		identifier?: string;
		localNumber?: number;
	};
	metaPage: (value: Meta) => void;
	onUpdate: (value: IStorage) => void;
	onLoading: (value: boolean) => void;
}

interface IColumnStorage extends IStorage {
	actions?: string;
}

export const StoragesTable: FC<IStoragesTable> = ({
	filter,
	onUpdate,
	metaPage,
	onLoading,
}) => {
	const { user } = useAuth();
	const confirmModalRef = useRef<any>(null);
	const [storageSelected, setStorageSelected] = useState<IStorage | null>(null);
	const { data, isLoading } = useGetAllStorage({
		filters: {
			limit: 10,
			...(filter.uf ? { uf: filter.uf } : {}),
			...(filter.cep ? { cep: filter.cep } : {}),
			...(filter.city ? { city: filter.city } : {}),
			...(filter.page ? { page: filter.page } : {}),
			...(filter.street ? { street: filter.street } : {}),
			...(filter.district ? { street: filter.district } : {}),
			...(filter.identifier ? { identifier: filter.identifier } : {}),
			...(filter.localNumber ? { localNumber: filter.localNumber } : {}),
		},
	});

	const { mutateAsync: onDelete } = useDeleteStorage({
		onSuccess: () => {
			toast.success("Estoque deletado com sucesso.", { autoClose: 700 });
			queryClient.invalidateQueries("storages");
		},
	});

	const onDeleteStorageFn = async () => {
		if (storageSelected) {
			try {
				await onDelete({ id: storageSelected.id });
			} catch {}
		}
	};

	const onDeleteStorage = (storage: IStorage) => {
		setStorageSelected(storage);
		confirmModalRef?.current?.onOpen();
	};

	const renderCell = useCallback((storage: any, columnKey: string) => {
		const cellValue = storage[columnKey];

		switch (true) {
			case columnKey === "identifier":
				return (
					<p className="text-bold text-sm capitalize dark:text-gray-400">
						{cellValue}
					</p>
				);
			case columnKey === "cep":
				return (
					<p className="text-bold text-sm capitalize dark:text-gray-400">
						{cellValue}
					</p>
				);
			case columnKey === "uf":
				return (
					<p className="text-bold text-sm capitalize dark:text-gray-400">
						{cellValue}
					</p>
				);
			case columnKey === "city":
				return (
					<p className="text-bold text-sm capitalize dark:text-gray-400">
						{cellValue}
					</p>
				);
			case columnKey === "district":
				return (
					<p className="text-bold text-sm capitalize dark:text-gray-400">
						{cellValue}
					</p>
				);
			case columnKey === "street":
				return (
					<p className="text-bold text-sm capitalize dark:text-gray-400">
						{cellValue}
					</p>
				);
			case columnKey === "localNumber":
				return (
					<p className="text-bold text-sm capitalize dark:text-gray-400">
						{cellValue}
					</p>
				);

			case columnKey === "actions" && user && user.user_type === "ADMIN":
				return (
					<div className="relative flex items-center gap-2 justify-end">
						<Tooltip content="Editar estoque">
							<span
								className="text-lg text-default-400 cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50"
								onClick={() => onUpdate(storage)}
							>
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Deletar estoque">
							<span
								className="text-lg text-danger cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50"
								onClick={() => onDeleteStorage(storage)}
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

	useEffect(() => {}, [filter]); // DONT REMOVE THIS!!!

	return (
		<>
			{data ? (
				<Table aria-label="Storages list" isStriped>
					<TableHeader
						columns={
							user && user.user_type === "ADMIN"
								? columnsStorageAdmin
								: columnsStorage
						}
					>
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
						emptyContent={"Sem estoques cadastrados."}
					>
						{(item: IColumnStorage) => (
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

			<ConfirmModal
				submitText="Remover"
				submitColor="danger"
				ref={confirmModalRef}
				submitFn={onDeleteStorageFn}
				content={
					<span className="text-sm text-default-400">
						Têm certeza que deseja remover esse estoque ?
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
