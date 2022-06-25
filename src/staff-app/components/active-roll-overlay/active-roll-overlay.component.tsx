import Button from "@material-ui/core/Button"
import React, { useContext, useEffect, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { getRollCountFromRollStates, getRollInputFromRollStatesMap, RollInput } from "shared/models/roll"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { StaffAppContext } from "staff-app/store/StaffAppContext"
import styled from "styled-components"

export type ActiveRollAction = "filter" | "exit" | "complete"
interface Props {
  isActive: boolean;
  onItemClick: (action: ActiveRollAction, value?: string) => void;
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {

  const { isActive, onItemClick } = props
  const { state: { rollStateIdMap } } = useContext(StaffAppContext);
  const [stateList, setStateList] = useState<ReturnType<typeof getRollCountFromRollStates>>([]);
  const [saveRoll, data, loadState] = useApi({ url: "save-roll" })

  const handleComplete = async () => {
    const responseRollState = await saveRoll(getRollInputFromRollStatesMap(rollStateIdMap));
    onItemClick("complete");
  }

  useEffect(() => {
    setStateList(getRollCountFromRollStates(Object.values(rollStateIdMap)))
  }, [rollStateIdMap])


  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={stateList}
            onItemClick={(item) => onItemClick('filter', item)}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={handleComplete}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
