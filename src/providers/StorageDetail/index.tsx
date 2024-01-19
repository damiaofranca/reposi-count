/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, createContext, useState } from "react";

import { IStorageDetailContext } from "./types";
import { useDelayQuery } from "../../hooks/useDelayQuery";
import { Meta } from "../../interfacers/common/iBaseList";
import { validDate } from "../../utils/regexs";
import { useParams } from "react-router-dom";
import { useGetOneStorage } from "../../api/storages";
import { IFilteredParams } from "../../interfacers/product/request/IGetAll";
export const StorageDetailContext = createContext({} as IStorageDetailContext);

export const StorageDetailProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [searchInput, setSearchInput] = useState<string>("");
	const [isLoadingData, setLoadingData] = useState<boolean>(false);
	const [invalidFilter, setInvalidFilter] = useState<boolean>(false);
	const [currentMeta, setCurrentMeta] = useState<Meta | undefined>(undefined);
	const [searchType, setSearchType] = useState<IFilteredParams>({
		search: "",
		value: "name",
		label: "Nome",
	});

	const { id } = useParams();

	const { isLoading, data: storage } = useGetOneStorage({ id: id || "" });

	const debounceValue = useDelayQuery({ delay: 800, query: searchType.search });

	const onLoadData = (isLoad: boolean) => {
		setLoadingData(isLoad);
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

	const onSearchInput = (search: string) => {
		setSearchInput(search);
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

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		onSearchInput(inputValue);

		if (searchType.value === "date_selected") {
			if (validDate.test(inputValue)) {
				onChangeFilterSearch(inputValue);
				if (!(invalidFilter === false)) {
					onSetInvalidFilter(false);
				}
			} else {
				if (!(invalidFilter === true)) {
					onSetInvalidFilter(false);
				}
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
		<StorageDetailContext.Provider
			value={{
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
			}}
		>
			{children}
		</StorageDetailContext.Provider>
	);
};
