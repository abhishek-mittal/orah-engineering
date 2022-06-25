import { ToolBarSortByKey } from "shared/enums/ui";

export const DailyCarePresent = {
    toolbarDisplayNameMap: {
        [ToolBarSortByKey.FIRST_NAME]: {
            displayName: "First Name",
            sortKey: 'first_name'
        },
        [ToolBarSortByKey.LAST_NAME]: {
            displayName: "Last Name",
            sortKey: 'last_name'
        }
    }
}