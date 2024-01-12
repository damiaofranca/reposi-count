import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

import { EyeFilledIcon } from "..";
import { useAuth } from "../../hooks";
import { queryClient } from "../../api";
import { ConfirmModal } from "../ConfirmModal";
import { EditIcon } from "../../assets/icons/Edit";
import { columnsStorage } from "../../utils/tables";
import { IStorage } from "../../interfacers/storage";
import { DeleteIcon } from "../../assets/icons/Delete";
import { Meta } from "../../interfacers/common/iBaseList";
import { useDeleteStorage, useGetAllStorage } from "../../api/storages";

interface IStoragesTable {
	filter: {
		uf?: string;
		cep?: string;
		city?: string;
		page?: number;
		limit?: number;
		street?: string;
		district?: string;
		identifier?: string;
		local_number?: number;
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
	const navigate = useNavigate();
	const { profile_data } = useAuth();
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
			...(filter.local_number ? { local_number: filter.local_number } : {}),
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

	const onSeeDetail = (storage: IStorage) => {
		navigate(`/storages/${storage.id}`);
	};

	const renderCell = useCallback(
		(storage: any, columnKey: string) => {
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
				case columnKey === "local_number":
					return (
						<p className="text-bold text-sm capitalize dark:text-gray-400">
							{cellValue}
						</p>
					);

				case columnKey === "actions":
					return (
						<div className="relative flex items-center gap-2 justify-end">
							<Tooltip color="primary" content="Ver detalhes">
								<span
									onClick={() => onSeeDetail(storage)}
									className="text-lg text-primary cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50"
								>
									<EyeFilledIcon />
								</span>
							</Tooltip>
							{profile_data && profile_data.profile_data_type === "ADMIN" ? (
								<>
									<Tooltip content="Editar estoque" color="warning">
										<span
											onClick={() => onUpdate(storage)}
											className="text-lg text-warning-400 cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50"
										>
											<EditIcon />
										</span>
									</Tooltip>
									<Tooltip color="danger" content="Deletar estoque">
										<span
											onClick={() => onDeleteStorage(storage)}
											className="text-lg text-danger cursor-pointer rounded-full p-2 bg-gray-200 dark:bg-zinc-600 active:opacity-50"
										>
											<DeleteIcon />
										</span>
									</Tooltip>
								</>
							) : (
								<></>
							)}
						</div>
					);
				default:
					return cellValue;
			}
		},
		[profile_data],
	);

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
					<TableHeader columns={columnsStorage}>
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
