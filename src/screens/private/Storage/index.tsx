import React, { FC, memo, useMemo } from "react";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Pagination,
	Spinner,
} from "@nextui-org/react";

import {
	Title,
	AddStorage,
	EditStorage,
	RegisterIcon,
	StoragesTable,
} from "../../../components";

import { cep } from "../../../utils/regexs";
import { formatField } from "../../../utils/formats";
import plusIcon from "../../../assets/icons/plus.svg";
import { Meta } from "../../../interfacers/common/iBaseList";
import { useDelayQuery } from "../../../hooks/useDelayQuery";
import { AddStorageBtn, Container, ContainerHeader } from "./styles";
import { FilterChangeIcon } from "../../../assets/icons/FilterChange";
import { IFilteredParams, IStorage } from "../../../interfacers/storage";
import { useAuth } from "../../../hooks";

interface IStorages {}

const filterOps = [
	{ label: "CEP", value: "cep", search: "" },
	{ label: "Estado", value: "uf", search: "" },
	{ label: "Rua", value: "street", search: "" },
	{ label: "Cidade", value: "city", search: "" },
	{ label: "Bairro", value: "district", search: "" },
	{ label: "Numéro", value: "localNumber", search: "" },
	{ label: "Identificação", value: "identifier", search: "" },
];

export const Storages: FC<IStorages> = () => {
	const { user } = useAuth();
	const [showModalAddStorage, setShowModalAddStorage] =
		React.useState<boolean>(false);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [searchInput, setSearchInput] = React.useState<string>("");
	const [invalidFilter, setInvalidFilter] = React.useState<boolean>(false);
	const [searchType, setSearchType] = React.useState<IFilteredParams>({
		search: "",
		value: "identifier",
		label: "Identificação",
	});
	const debounceValue = useDelayQuery({ delay: 800, query: searchType.search });
	const [currentMeta, setCurrentMeta] = React.useState<Meta | undefined>(
		undefined,
	);
	const [storageToEdit, setStorageToEdit] = React.useState<
		IStorage | undefined
	>(undefined);

	const onShowStorageModal = () => setShowModalAddStorage(true);

	const onCloseStorageModal = () => setShowModalAddStorage(false);

	const onUpdateToEdit = (val: IStorage) => setStorageToEdit(val);

	const onCloseUpdateModal = () => setStorageToEdit(undefined);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setSearchInput(inputValue);
		if (searchType.value === "cep") {
			if (cep.test(inputValue)) {
				setSearchType((_searchInput) => ({
					..._searchInput,
					search: inputValue,
				}));
				setInvalidFilter(false);
			} else {
				setInvalidFilter(true);

				if (inputValue.length === 0) {
					setInvalidFilter(false);
					setSearchType((_searchInput) => ({ ..._searchInput, search: "" }));
				}
			}
		} else {
			setSearchType((_searchInput) => ({
				..._searchInput,
				search: inputValue,
			}));
		}
	};

	const onChangePage = (page: number) => {
		setCurrentMeta((val) =>
			val
				? ({
						...val,
						currentPage: page,
				  } as Meta)
				: undefined,
		);
	};

	const onChangeFilter = (_filter: { label: string; value: string }) => {
		setSearchType(() => ({
			search: ``,
			value: _filter.value as any,
			label: _filter.label as any,
		}));
		setSearchInput("");
	};

	const TableMemo = useMemo(
		() =>
			memo(() => (
				<StoragesTable
					onUpdate={onUpdateToEdit}
					filter={{
						[searchType.value]: debounceValue,
						page: currentMeta?.currentPage,
					}}
					onLoading={(val) => setIsLoading(val)}
					metaPage={(val) => setCurrentMeta(val)}
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
											variant="light"
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

						{user && user.user_type === "ADMIN" ? (
							<div>
								<AddStorageBtn
									color="primary"
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
								color="secondary"
								onChange={(e) => onChangePage(e)}
								page={currentMeta?.currentPage || 1}
								total={currentMeta?.totalPages || 1}
							/>
						</div>
					) : (
						<Spinner color="primary" label="Carregando..." />
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
