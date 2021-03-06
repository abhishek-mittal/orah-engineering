import { Images } from "assets/images"
import React, { useContext } from "react"
import { Person, PersonHelper } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"
import { Colors } from "shared/styles/colors"
import { BorderRadius, FontWeight, Spacing } from "shared/styles/styles"
import { RollStateSwitcher } from "staff-app/components/roll-state/roll-state-switcher.component"
import { appendStudentRoleState } from "staff-app/store/actions"
import { StaffAppContext } from "staff-app/store/StaffAppContext"
import styled from "styled-components"

interface Props {
  isRollMode?: boolean
  student: Person
}
export const StudentListTile: React.FC<Props> = ({ isRollMode, student }) => {

  const { dispatch, state: { rollStateIdMap } } = useContext(StaffAppContext);

  const handleRollChange = async (newRollState: RolllStateType) => {
    dispatch(appendStudentRoleState(student.id, newRollState))
  }


  return (
    <S.Container>
      <S.Avatar url={Images.avatar}></S.Avatar>
      <S.Content>
        <div>{PersonHelper.getFullName(student)}</div>
      </S.Content>
      {isRollMode && (
        <S.Roll>
          <RollStateSwitcher initialState={rollStateIdMap[student.id]} onStateChange={handleRollChange} />
        </S.Roll>
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    margin-top: ${Spacing.u3};
    padding-right: ${Spacing.u2};
    display: flex;
    height: 60px;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Avatar: styled.div<{ url: string }>`
    width: 60px;
    background-image: url(${({ url }) => url});
    border-top-left-radius: ${BorderRadius.default};
    border-bottom-left-radius: ${BorderRadius.default};
    background-size: cover;
    background-position: 50%;
    align-self: stretch;
  `,
  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,
  Roll: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u4};
  `,
}
