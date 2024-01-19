import React, { FC, memo, useMemo } from "react";
import {
	Input,
	Button,
	Spinner,
	Dropdown,
	Pagination,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

import {
	Title,
	AddStorage,
	EditStorage,
	RegisterIcon,
	StoragesTable,
} from "../../../components";

import { useAuth } from "../../../hooks";
import { formatField } from "../../../utils/formats";
import plusIcon from "../../../assets/icons/plus.svg";
import { useStorage } from "../../../hooks/useStorage";
import { AddStorageBtn, Container, ContainerHeader } from "./styles";
import { FilterChangeIcon } from "../../../assets/icons/FilterChange";

interface IStorages {}

const filterOps = [
	{ label: "CEP", value: "cep", search: "" },
	{ label: "Estado", value: "uf", search: "" },
	{ label: "Rua", value: "street", search: "" },
	{ label: "Cidade", value: "city", search: "" },
	{ label: "Bairro", value: "district", search: "" },
	{ label: "Numéro", value: "local_number", search: "" },
	{ label: "Identificação", value: "identifier", search: "" },
];

export const Storages: FC<IStorages> = () => {
	const { profile_data } = useAuth();

	const {
		isLoading,
		searchType,
		currentMeta,
		searchInput,
		invalidFilter,
		storageToEdit,
		debounceValue,

		onLoad,
		onSearch,
		onSetMeta,
		onChangePage,
		onUpdateToEdit,
		onChangeFilter,
	} = useStorage();

	const [showModalAddStorage, setShowModalAddStorage] =
		React.useState<boolean>(false);

	const onCloseUpdateModal = () => onUpdateToEdit(null);

	const onShowStorageModal = () => setShowModalAddStorage(true);

	const onCloseStorageModal = () => setShowModalAddStorage(false);

	const TableMemo = useMemo(
		() =>
			memo(() => (
				<StoragesTable
					onUpdate={onUpdateToEdit}
					filter={{
						[searchType.value]: debounceValue,
						page: currentMeta?.currentPage,
					}}
					onLoading={(val) => onLoad(val)}
					metaPage={(val) => onSetMeta(val)}
				/>
			)),
		[debounceValue],
	);

	return (
		<>
			<Container className="bg-content3">
				<ContainerHeader>
					<Title className="text-content2">Estoque registrados</Title>
					<div className="flex">
						<Input
							size="sm"
							variant="bordered"
							value={searchInput}
							onChange={onSearch}
							placeholder={`Filtrar por ${searchType.label}`}
							errorMessage={invalidFilter ? formatField[searchType.value] : ""}
							endContent={
								<Dropdown>
									<DropdownTrigger>
										<Button
											size="sm"
											isIconOnly
											variant="shadow"
											aria-label="Like"
										>
											<FilterChangeIcon />
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label="Static Actions"
										disabledKeys={["first"]}
									>
										<DropdownItem key="first">Filtrar por:</DropdownItem>
										{
											filterOps.map((filter) => (
												<DropdownItem
													key={filter.value}
													onClick={() => onChangeFilter(filter)}
												>
													{filter.label}
												</DropdownItem>
											)) as any
										}
									</DropdownMenu>
								</Dropdown>
							}
						/>

						{profile_data && profile_data.profile_data_type === "ADMIN" ? (
							<div>
								<AddStorageBtn
									color="primary"
									variant="shadow"
									onClick={onShowStorageModal}
									startContent={
										<RegisterIcon src={plusIcon} alt="Cadastrar estoque" />
									}
								>
									Cadastrar estoque
								</AddStorageBtn>
							</div>
						) : (
							<></>
						)}
					</div>
				</ContainerHeader>
				<div className="flex flex-col">
					<TableMemo />
					{!isLoading ? (
						<div className="flex mt-4 justify-end">
							<Pagination
								showShadow
								color="primary"
								onChange={(e) => onChangePage(e)}
								page={currentMeta?.currentPage || 1}
								total={currentMeta?.totalPages || 1}
							/>
						</div>
					) : (
						<div className="h-full flex items-center justify-center">
							<Spinner color="primary" label="Carregando..." />
						</div>
					)}
				</div>
			</Container>

			{showModalAddStorage && <AddStorage onClose={onCloseStorageModal} />}

			{storageToEdit && (
				<EditStorage onClose={onCloseUpdateModal} storage={storageToEdit} />
			)}
		</>
	);
};
