import { StateList } from "staff-app/components/roll-state/roll-state-list.component";

export interface Roll {
  id: number
  name: string
  completed_at: Date
  student_roll_states: { student_id: number; roll_state: RolllStateType }[]
}

export interface RollInput {
  student_roll_states: { student_id: number; roll_state: RolllStateType }[]
}

export type RolllStateType = "unmark" | "present" | "absent" | "late"


export const getRollCountFromRollStates = (rollStates: RolllStateType[] = []): StateList[] => {

  const { absent, late, present, unmark } = rollStates.reduce((acc, rollState) => {
    acc[rollState]++
    return acc;
  }, {
    late: 0, absent: 0, present: 0, unmark: 0
  } as Record<RolllStateType, number>)

  return [
    { type: "all", count: absent + late + present + unmark },
    { type: "present", count: present },
    { type: "late", count: late },
    { type: "absent", count: absent },
  ]
}

export const getRollInputFromRollStatesMap = (rollStatesMap: Record<number, RolllStateType> = {}): RollInput => {

  const rollItem = Object.entries(rollStatesMap).reduce((acc, [key, rollState]) => {
    acc.push({
      roll_state: rollState,
      student_id: +key
    })
    return acc;
  }, [] as { student_id: number; roll_state: RolllStateType }[])

  return {
    student_roll_states: rollItem
  }
}
