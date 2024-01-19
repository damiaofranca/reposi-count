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

import { formatField } from "../../../utils/formats";
import plusIcon from "../../../assets/icons/plus.svg";
import { ProductsTable } from "../../../components/productsTable";
import { useStorageDetail } from "../../../hooks/useStorageDetail";
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
	const [showProductModal, setShowProductModal] = useState<boolean>(false);

	const {
		storage,
		isLoading,
		searchType,
		searchInput,
		currentMeta,
		isLoadingData,
		invalidFilter,
		debounceValue,

		onSearch,
		onSetMeta,
		onLoadData,
		onChangePage,
		onChangeFilter,
	} = useStorageDetail();

	const { id } = useParams();

	const navigate = useNavigate();

	const onCloseModalRegisterProduct = () => {
		setShowProductModal(false);
	};

	const onShowModalRegisterProduct = () => {
		setShowProductModal(true);
	};

	const onBack = (key: Key) => {
		navigate(`/${key}`);
	};

	const TableMemo = useMemo(
		() =>
			memo(() => (
				<ProductsTable
					filter={{
						storage: id || "",
						page: currentMeta?.currentPage,
						[searchType.value]: debounceValue,
					}}
					metaPage={(val) => onSetMeta(val)}
					onLoading={(val) => onLoadData(val)}
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
