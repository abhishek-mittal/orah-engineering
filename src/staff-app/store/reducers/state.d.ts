import { ToolBarSortBy, ToolBarSortByKey } from "shared/enums/ui";
import { Filter, Filters } from "shared/models/globel";
import { Person } from "shared/models/person"
import { RollInput, RolllStateType } from "shared/models/roll";
import * as RootActions from "./../actions"

export type FilterCofigs = {
    sort?: ToolBarSortBy,
    sortByKey?: ToolBarSortByKey,
    searchKey: string;
    filters: Filter[]
}

type AppState = {
    renderingPersonList: Person[];
    rollStateIdMap: Record<string, RolllStateType>;
    filterConfigs: FilterCofigs;
}

export default AppState;

export type ActionCreator<T> = {
    [x: string]: (...args: any) => ReturnType<Action>;
};

export type ActionType<T extends ActionCreator<T>> = ReturnType<T[keyof T]>;

export type ExportActions = ActionType<typeof RootActions>;