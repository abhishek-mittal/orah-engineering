import React, { useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"
import { Activity } from "shared/models/activity"
import { Chip } from "@material-ui/core"

export const ActivityPage: React.FC = () => {

  const [saveRoll, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })

  useEffect(() => {
    void saveRoll()
  }, [])

  return <S.Container>
    {
      loadState === 'loading' ? 'loading...' :
        <>
          {
            data?.activity.map((activity, index) => {
              return <S.Card key={"__activity_" + activity.entity.id}>
                <S.CardHeader>
                  {activity.entity.name}
                  <Chip label={activity.date} />
                  <Chip label={activity.type} />
                </S.CardHeader>
                <S.CardBody>
                  {
                    activity?.entity?.student_roll_states?.map(state => {
                      return <S.ActivityLogWrapper key={state.student_id}>
                        <S.ActivityLog><b>Student Id:</b> <Chip size="small" variant="outlined" color="primary" label={state.student_id} /> </S.ActivityLog>
                        <S.ActivityLog><b>Roll state:</b> <Chip size="small" variant="outlined" color="secondary" label={state.roll_state} /> </S.ActivityLog>
                      </S.ActivityLogWrapper>
                    }) || 'no activities'
                  }
                </S.CardBody>
              </S.Card>
            })
          }
        </>
    }
  </S.Container>
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
  Card: styled.div`
    display: flex;
    flex-flow: column;
    background-color:  white;
    margin: ${Spacing.u4} 0;
    border-top: 2px solid #2726263b;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  `,
  CardHeader: styled.div`
    display: flex;
    justify-content: space-between;
    background-color: whitesmoke;
    padding: ${Spacing.u4};
    flex-shrink: 0;
  `,
  CardBody: styled.div`
    display: flex;
    justify-content: start;
    padding: ${Spacing.u4};
    background-color: white;
    flex-flow: column;
    & > div :not(:last-child) {
      margin-right: ${Spacing.u4};
    }
  `,
  ActivityLog: styled.div`
    padding: ${Spacing.u2} 0;
    display: table-cell;
    width: 50%;
  `,
  ActivityLogWrapper: styled.div`
    display: table;
  `
}
