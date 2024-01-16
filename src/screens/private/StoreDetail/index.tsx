import { FC, Key, memo, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Input,
	Button,
	Spinner,
	Dropdown,
	Pagination,
	Breadcrumbs,
	DropdownItem,
	DropdownMenu,
	BreadcrumbItem,
	DropdownTrigger,
} from "@nextui-org/react";
import {
	Container,
	AddProductBtn,
	ContainerTitle,
	ContainerHeader,
} from "./styles";

import { validDate } from "../../../utils/regexs";
import { formatField } from "../../../utils/formats";
import plusIcon from "../../../assets/icons/plus.svg";
import { useGetOneStorage } from "../../../api/storages";
import { Meta } from "../../../interfacers/common/iBaseList";
import { useDelayQuery } from "../../../hooks/useDelayQuery";
import { IFilteredParams } from "../../../interfacers/product";
import { ProductsTable } from "../../../components/productsTable";
import { AddProduct, RegisterIcon, Title } from "../../../components";
import { FilterChangeIcon } from "../../../assets/icons/FilterChange";

interface IStoreDetail {}

const filterOps = [
	{ label: "Nome", value: "name", search: "" },
	{ label: "Marca", value: "brand", search: "" },
	{ label: "Data inicial", value: "date_selected", search: "" },
	{ label: "Tipo do produto", value: "type_of_product", search: "" },
];

export const StoreDetail: FC<IStoreDetail> = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState<string>("");
	const [isLoadingData, setLoadingData] = useState<boolean>(false);
	const [invalidFilter, setInvalidFilter] = useState<boolean>(false);
	const { isLoading, data: storage } = useGetOneStorage({ id: id || "" });
	const [showProductModal, setShowProductModal] = useState<boolean>(false);
	const [currentMeta, setCurrentMeta] = useState<Meta | undefined>(undefined);
	const [searchType, setSearchType] = useState<IFilteredParams>({
		search: "",
		value: "name",
		label: "Nome",
	});
	const debounceValue = useDelayQuery({ delay: 800, query: searchType.search });

	const onCloseModalRegisterProduct = () => {
		setShowProductModal(false);
	};

	const onShowModalRegisterProduct = () => {
		setShowProductModal(true);
	};

	const onBack = (key: Key) => {
		navigate(`/${key}`);
	};

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setSearchInput(inputValue);

		if (searchType.value === "date_selected") {
			if (validDate.test(inputValue)) {
				setSearchType((_searchInput) => ({
					..._searchInput,
					search: inputValue,
				}));
				if (!(invalidFilter === false)) {
					setInvalidFilter(false);
				}
			} else {
				if (!(invalidFilter === true)) {
					setInvalidFilter(true);
				}
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
			search: "",
			value: _filter.value as any,
			label: _filter.label as any,
		}));
		setSearchInput("");
	};

	const TableMemo = useMemo(
		() =>
			memo(() => (
				<ProductsTable
					filter={{
						[searchType.value]: debounceValue,
						page: currentMeta?.currentPage,
					}}
					metaPage={(val) => setCurrentMeta(val)}
					onLoading={(val) => setLoadingData(val)}
				/>
			)),
		[debounceValue],
	);

	return (
		<Container className="bg-content3">
			{storage && !isLoading ? (
				<>
					<ContainerHeader>
						<ContainerTitle>
							<Title className="text-content2">Detalhes Do Estoque</Title>
							<Breadcrumbs onAction={onBack}>
								<BreadcrumbItem key="storages">Estoques</BreadcrumbItem>
								<BreadcrumbItem key="detail">
									{storage.identifier}
								</BreadcrumbItem>
							</Breadcrumbs>
						</ContainerTitle>
						<div className="flex">
							<Input
								size="sm"
								variant="bordered"
								value={searchInput}
								onChange={onSearch}
								placeholder={`Filtrar por ${searchType.label}`}
								errorMessage={
									invalidFilter ? formatField[searchType.value] : ""
								}
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
							<div>
								<AddProductBtn
									color="primary"
									variant="shadow"
									onClick={onShowModalRegisterProduct}
									startContent={
										<RegisterIcon src={plusIcon} alt="Cadastrar produto" />
									}
								>
									Cadastrar produto
								</AddProductBtn>
							</div>
						</div>
					</ContainerHeader>
					<div className="flex flex-col">
						<TableMemo />
						{!isLoadingData ? (
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
				</>
			) : (
				<div className="h-full flex items-center justify-center">
					<Spinner color="primary" label="Carregando..." />
				</div>
			)}

			{id && showProductModal ? (
				<AddProduct onClose={onCloseModalRegisterProduct} storage={id} />
			) : (
				<></>
			)}
		</Container>
	);
};
