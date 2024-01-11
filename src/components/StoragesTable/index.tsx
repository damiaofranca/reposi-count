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
import { useGetAllStorage } from "../../api/storages";
import { EditIcon } from "../../assets/icons/Edit";
import { DeleteIcon } from "../../assets/icons/Delete";
import { Meta } from "../../interfacers/common/iBaseList";
import { ConfirmModal } from "../ConfirmModal";
import { IStorage } from "../../interfacers/storage";

interface IStoragesTable {
	filter: {
		cep?: string;
		city?: string;
		page?: number;
		limit?: number;
		state?: string;
		street?: string;
		identifier?: string;
		numberStorage?: number;
	};
	metaPage: (value: Meta) => void;
	onUpdate: (value: IStorage) => void;
	onLoading: (value: boolean) => void;
}

interface IColumnStorage extends IStorage {
	actions?: string;
}

const columns = [
	{
		key: "identifier",
		label: "Identificador",
	},
	{
		key: "cep",
		label: "CEP",
	},
	{
		key: "state",
		label: "Estado",
	},
	{
		key: "city",
		label: "Cidade",
	},
	{
		key: "street",
		label: "Rua",
	},
	{
		key: "numberStorage",
		label: "Numéro",
	},
	{
		key: "actions",
		label: "Ações",
	},
];

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
			...(filter.cep ? { cep: filter.cep } : {}),
			...(filter.city ? { city: filter.city } : {}),
			...(filter.page ? { page: filter.page } : {}),
			...(filter.state ? { state: filter.state } : {}),
			...(filter.street ? { street: filter.street } : {}),
			...(filter.identifier ? { identifier: filter.identifier } : {}),
			...(filter.numberStorage ? { numberStorage: filter.numberStorage } : {}),
		},
	});

	const onDeleteStorage = (storage: IStorage) => {
		setStorageSelected(storage);
		confirmModalRef?.current?.onOpen();
	};

	useEffect(() => {}, [filter]);

	const renderCell = useCallback((storage: any, columnKey: string) => {
		const cellValue = storage[columnKey];

		switch (true) {
			case columnKey === "identifier":
				return <p className="text-bold text-sm capitalize">{cellValue}</p>;
			case columnKey === "cep":
				return <p className="text-bold text-sm capitalize">{cellValue}</p>;
			case columnKey === "state":
				return <p className="text-bold text-sm capitalize">{cellValue}</p>;
			case columnKey === "city":
				return <p className="text-bold text-sm capitalize">{cellValue}</p>;
			case columnKey === "street":
				return <p className="text-bold text-sm capitalize">{cellValue}</p>;
			case columnKey === "numberStorage":
				return <p className="text-bold text-sm capitalize">{cellValue}</p>;

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
	return (
		<>
			{data ? (
				<Table aria-label="Storages list" isStriped>
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
				submitFn={() => console.log(storageSelected)}
				content={
					<span className="text-sm text-default-400">
						Têm certeza que deseja remover essa estoque ?
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
