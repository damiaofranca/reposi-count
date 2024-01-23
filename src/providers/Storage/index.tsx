/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FC, ReactNode, createContext, useState } from "react";

import { cep } from "@utils/regexs";
import { IStorageContext } from "./types";
import { IStorage } from "@interfacers/storage";
import { Meta } from "@interfacers/common/iBaseList";
import { useDelayQuery } from "@hooks/useDelayQuery";
import { IFilteredParams } from "@interfacers/storage";

export const StorageContext = createContext({} as IStorageContext);

export const StorageProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [searchType, setSearchType] = useState<IFilteredParams>({
		search: "",
		value: "identifier",
		label: "Identificação",
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchInput, setSearchInput] = useState<string>("");
	const [invalidFilter, setInvalidFilter] = useState<boolean>(false);
	const [storageToEdit, setStorageToEdit] = useState<IStorage | null>(null);
	const [currentMeta, setCurrentMeta] = useState<Meta | undefined>(undefined);
	const debounceValue = useDelayQuery({ delay: 800, query: searchType.search });

	const onUpdateToEdit = (val: IStorage | null) => setStorageToEdit(val);

	const onLoad = (isLoad: boolean) => {
		setIsLoading(isLoad);
	};

	const onSearchInput = (search: string) => {
		setSearchInput(search);
	};
	const onChangeFilterSearch = (searchFor: string) => {
		setSearchType((_type) => ({ ..._type, search: searchFor }));
	};

	const onClearFilter = () => {
		setSearchType((_type) => ({ ..._type, search: "" }));
	};

	const onSetInvalidFilter = (isInvalid: boolean) => {
		setInvalidFilter(isInvalid);
	};

	const onSetMeta = (page: Meta) => {
		setCurrentMeta((_currentMeta) =>
			_currentMeta
				? ({
						..._currentMeta,
						currentPage: page.currentPage,
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
		onSearchInput("");
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

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		onSearchInput(inputValue);
		if (searchType.value === "cep") {
			if (cep.test(inputValue)) {
				onChangeFilterSearch(inputValue);
				onSetInvalidFilter(false);
			} else {
				setInvalidFilter(true);

				if (inputValue.length === 0) {
					onSetInvalidFilter(false);
					onClearFilter();
				}
			}
		} else {
			onChangeFilterSearch(inputValue);
		}
	};

	return (
		<StorageContext.Provider
			value={{
				isLoading,
				searchType,
				searchInput,
				currentMeta,
				invalidFilter,
				storageToEdit,
				debounceValue,

				onLoad,
				onSearch,
				onSetMeta,
				onChangePage,
				onClearFilter,
				onSearchInput,
				onUpdateToEdit,
				onChangeFilter,
				onSetInvalidFilter,
				onChangeFilterSearch,
			}}
		>
			{children}
		</StorageContext.Provider>
	);
};
