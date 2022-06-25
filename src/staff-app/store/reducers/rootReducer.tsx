import { ToolBarSortBy, ToolBarSortByKey } from 'shared/enums/ui';
import AppState, { ExportActions } from './state';

export const initialState: AppState = {
    renderingPersonList: [],
    rollStateIdMap: {},
    filterConfigs: {
        filters: [],
        searchKey: "",
        sort: ToolBarSortBy.ASC,
        sortByKey: ToolBarSortByKey.FIRST_NAME
    },
}

export default function rootReducer(state: AppState = initialState, action: ExportActions): AppState {
    switch (action.type) {
        case 'SET_RENDERING_PROFILES':
            return {
                ...state,
                renderingPersonList: action.payload
            };
        case 'APPEND_STUDENTS_ROLL':

            const _rollStateIdMap = { ...state.rollStateIdMap };
            _rollStateIdMap[action.payload.studentId] = action.payload.rollState;

            return {
                ...state,
                rollStateIdMap: _rollStateIdMap
            };
        case 'CLEAR_STUDENTS_ROLL':
            return {
                ...state,
                rollStateIdMap: {}
            };
        case 'CLEAR_FILTERS':
            return {
                ...state,
                filterConfigs: { ...initialState.filterConfigs }
            };
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filterConfigs: {
                    ...state.filterConfigs,
                    ...action.payload
                }
            };
        default:
            return state;
    }
};