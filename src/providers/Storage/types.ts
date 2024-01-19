import { ChangeEvent } from "react";
import { Meta } from "../../interfacers/common/iBaseList";
import { IFilteredParams, IStorage } from "../../interfacers/storage";

export interface IStorageContext {
	isLoading: boolean;
	searchInput: string;
	debounceValue: string;
	invalidFilter: boolean;
	searchType: IFilteredParams;
	currentMeta: Meta | undefined;
	storageToEdit: IStorage | null;

	onClearFilter: () => void;
	onSetMeta: (page: Meta) => void;
	onLoad: (isLoad: boolean) => void;
	onChangePage: (page: number) => void;
	onSearchInput: (search: string) => void;
	onUpdateToEdit: (val: IStorage | null) => void;
	onSetInvalidFilter: (isInvalid: boolean) => void;
	onChangeFilterSearch: (searchFor: string) => void;
	onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeFilter: (_filter: { label: string; value: string }) => void;
}
