import { Person } from "shared/models/person";
import { RolllStateType } from "shared/models/roll";
import { createAction } from "../createAction";
import { FilterCofigs } from "../reducers/state";

export const setStudentProfileList = (value: Person[]) =>
    createAction("SET_RENDERING_PROFILES", value);

export const appendStudentRoleState = (studentId: number, rollState: RolllStateType) =>
    createAction("APPEND_STUDENTS_ROLL", { studentId, rollState });

export const clearStudentRoleState = () =>
    createAction("CLEAR_STUDENTS_ROLL", true);

export const updateFilterConfigs = (filterConfigs: Partial<FilterCofigs>) =>
    createAction("UPDATE_FILTERS", filterConfigs);

export const clearFilterConfigs = () =>
    createAction("CLEAR_FILTERS", true);