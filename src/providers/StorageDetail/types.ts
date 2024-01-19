import { ChangeEvent } from "react";
import { Meta } from "../../interfacers/common/iBaseList";
import { IFilteredParams } from "../../interfacers/product/request/IGetAll";
import { IGetOneResponse } from "../../interfacers/storage";

export interface IStorageDetailContext {
	isLoading: boolean;
	searchInput: string;
	debounceValue: string;
	isLoadingData: boolean;
	invalidFilter: boolean;
	searchType: IFilteredParams;
	currentMeta: Meta | undefined;
	storage: IGetOneResponse | undefined;

	onSetMeta: (meta: Meta) => void;
	onChangePage: (page: number) => void;
	onLoadData: (isLoad: boolean) => void;
	onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeFilter: (_filter: { label: string; value: string }) => void;
}
