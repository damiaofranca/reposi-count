import React, { FC } from "react";
import { Button, Input, Pagination, Spinner } from "@nextui-org/react";

import {
	Title,
	AddBrand,
	BrandsTable,
	RegisterIcon,
	EditBrand,
} from "../../../components";

import { formatCNPJ } from "../../../utils/cnpj";
import plusIcon from "../../../assets/icons/plus.svg";
import { Meta } from "../../../interfacers/common/iBaseList";
import { useDelayQuery } from "../../../hooks/useDelayQuery";
import { isValidCnpj } from "../../../components/AddBrand/schema";
import { AddBrandBtn, Container, ContainerHeader } from "./styles";
import { FilterChangeIcon } from "../../../assets/icons/FilterChange";
import { IBrand } from "../../../interfacers/brand";
import { useAuth } from "../../../hooks";

interface IBrands {}

export const Brands: FC<IBrands> = () => {
	const { profile_data } = useAuth();
	const [showModalAddBrand, setShowModalAddBrand] =
		React.useState<boolean>(false);
	const [search, setSearch] = React.useState<string>("");
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [searchInput, setSearchInput] = React.useState<string>("");
	const debounceValue = useDelayQuery({ delay: 800, query: search });
	const [invalidCnpj, setInvalidCnpj] = React.useState<boolean>(false);
	const [searchType, setSearchType] = React.useState<"name" | "cnpj">("name");
	const [currentMeta, setCurrentMeta] = React.useState<Meta | undefined>(
		undefined,
	);
	const [brandToEdit, setBrandToEdit] = React.useState<IBrand | undefined>(
		undefined,
	);

	const onShowBrandModal = () => setShowModalAddBrand(true);

	const onCloseBrandModal = () => setShowModalAddBrand(false);

	const onUpdateToEdit = (val: IBrand) => setBrandToEdit(val);

	const onCloseUpdateModal = () => setBrandToEdit(undefined);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setSearchInput(inputValue);
		if (searchType === "cnpj") {
			const formattedCNPJ = formatCNPJ(inputValue);

			if (isValidCnpj(formattedCNPJ)) {
				setSearch(formattedCNPJ);
				setInvalidCnpj(false);
			} else {
				setInvalidCnpj(true);

				if (inputValue.length === 0) {
					setInvalidCnpj(false);
					setSearch(formattedCNPJ);
				}
			}
		} else {
			setSearch(inputValue);
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

	const onChangeFilter = () => {
		setSearchType((val) => (val === "name" ? "cnpj" : "name"));
		setSearchInput("");
		setSearch("");
	};

	return (
		<>
			<Container className="bg-content3">
				<ContainerHeader>
					<Title className="text-content2">Marcas registradas</Title>
					<div className="flex">
						<Input
							size="sm"
							variant="bordered"
							value={searchInput}
							onChange={onSearch}
							placeholder={`Filtrar por ${
								searchType === "name" ? "nome" : "cnpj"
							}`}
							errorMessage={
								searchType === "cnpj" && invalidCnpj ? "Formato inválido." : ""
							}
							endContent={
								<Button
									size="sm"
									isIconOnly
									variant="shadow"
									onClick={onChangeFilter}
								>
									<FilterChangeIcon />
								</Button>
							}
						/>
						{profile_data && profile_data.profile_data_type === "ADMIN" ? (
							<div>
								<AddBrandBtn
									color="primary"
									variant="shadow"
									onClick={onShowBrandModal}
									startContent={
										<RegisterIcon src={plusIcon} alt="Cadastrar marca" />
									}
								>
									Cadastrar marca
								</AddBrandBtn>
							</div>
						) : (
							<></>
						)}
					</div>
				</ContainerHeader>
				<div className="flex flex-col">
					<BrandsTable
						onUpdate={onUpdateToEdit}
						filter={{
							page: currentMeta?.currentPage,
							...(searchType === "name"
								? { name: debounceValue }
								: { cnpj: debounceValue }),
						}}
						onLoading={(val) => setIsLoading(val)}
						metaPage={(val) => setCurrentMeta(val)}
					/>
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
						<Spinner color="primary" label="Carregando..." />
					)}
				</div>
			</Container>

			{showModalAddBrand && <AddBrand onClose={onCloseBrandModal} />}

			{brandToEdit && (
				<EditBrand onClose={onCloseUpdateModal} brand={brandToEdit} />
			)}
		</>
	);
};
