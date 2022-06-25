import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "@material-ui/core"
import Button from "@material-ui/core/ButtonBase"
import React, { useContext, useEffect, useState } from "react"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"

import { MenuItem } from "shared/components/menu/menu-item.component"
import { Menu } from "shared/components/menu/menu.component"
import Search from "shared/components/search/search"
import { ToolBarSortBy, ToolBarSortByKey } from "shared/enums/ui"
import { useApi } from "shared/hooks/use-api"
import useDebounce from "shared/hooks/use-debounce"
import useToggle from "shared/hooks/use-toggle"
import { Person } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"
import { Colors } from "shared/styles/colors"
import { BorderRadius, FontWeight, Spacing } from "shared/styles/styles"
import { ActiveRollAction, ActiveRollOverlay } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { clearFilterConfigs, clearStudentRoleState, setStudentProfileList, updateFilterConfigs } from "staff-app/store/actions"
import { StaffAppContext } from "staff-app/store/StaffAppContext"
import styled from "styled-components"
import { DailyCarePresent } from "./daily-care.presets"


export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [filterItemType, setFilterItemType] = useState<RolllStateType | 'all'>('all');
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const { state: { renderingPersonList, filterConfigs, rollStateIdMap }, dispatch } = useContext(StaffAppContext);

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const onToolbarAction = (action: ToolbarAction, meta?: ToolbarActionMeta) => {
    if (action === "roll") {
      setIsRollMode(true)
    }

    if (action === 'sort' && meta?.sortMeta) {
      const { sortBy, sortByAscDesc } = meta?.sortMeta;
      dispatch(updateFilterConfigs({
        sortByKey: sortBy,
        sort: sortByAscDesc
      }))

    }
  }

  const resetRenderList = () => {
    const { searchKey, sort, sortByKey } = filterConfigs;
    let _renderList = [...(data?.students || [])];

    if (searchKey.length) {
      const regex = new RegExp(`([${searchKey}]+)`, "mig");

      const renderPersonList = data?.students.filter(
        (person) => {
          const check = `${person.first_name} ${person.last_name}`.match(regex);
          return !check ? false : check.length;
        }
      );

      const closestMatch = function (arr: Person[]) {
        return arr.sort((a, b) => {
          return (
            (`${b.first_name} ${b.last_name}`.match(regex) || [])?.join("").length -
            (`${a.first_name} ${a.last_name}`.match(regex) || [])?.join("").length
          );
        });
      };

      _renderList = closestMatch(
        renderPersonList || []
      ).slice(0, 5);

    }


    _renderList = _renderList.sort((a, b) => {
      return sort === ToolBarSortBy.ASC ? sortByKey === ToolBarSortByKey.LAST_NAME ? a.last_name.localeCompare(b.last_name) : a.first_name.localeCompare(b.first_name)
        : sortByKey === ToolBarSortByKey.LAST_NAME ? b.last_name.localeCompare(a.last_name) : b.first_name.localeCompare(a.first_name)
    })

    if (filterItemType !== 'all') {
      _renderList = _renderList.filter(person => rollStateIdMap[person.id] === filterItemType);
    }

    dispatch(setStudentProfileList(_renderList));
  }

  const onActiveRollAction = (action: ActiveRollAction, value?: string) => {
    if (action === "exit") {
      setIsRollMode(false)
    }

    if (action === 'filter') {
      setFilterItemType(value as typeof filterItemType)
    }

    if (action === 'complete') {

      setIsRollMode(false)
      dispatch(clearFilterConfigs());
    }
  }
  const handleSearch = (searchKey: string) => dispatch(updateFilterConfigs({ searchKey }))

  useEffect(() => {
    dispatch(setStudentProfileList(data?.students || []));
  }, [data?.students])

  useEffect(() => {
    if (!isRollMode) {
      dispatch(clearStudentRoleState())
      setFilterItemType('all')
    }
  }, [isRollMode])

  useDebounce(resetRenderList, 200, [filterConfigs, filterItemType]);

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} onSearch={handleSearch} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && renderingPersonList && (
          <>
            {renderingPersonList.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
type ToolbarActionMeta = {
  sortMeta?: {
    sortBy: ToolBarSortByKey;
    sortByAscDesc?: ToolBarSortBy;
  }
}
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, meta?: ToolbarActionMeta) => void
  onSearch: (searchKey: string) => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {

  const { state: { filterConfigs: { searchKey, sort, sortByKey } } } = useContext(StaffAppContext);
  const { onItemClick, onSearch } = props
  const [selectedMenuItem, setSelectedMenuItem] = useState<ToolBarSortByKey>(ToolBarSortByKey.FIRST_NAME);
  const [isAsc, toggleSortAsc] = useToggle(true);

  useEffect(() => {
    toggleSortAsc(sort === ToolBarSortBy.ASC);
    sortByKey && setSelectedMenuItem(sortByKey)
  }, [sort, sortByKey])

  const handleSort = () => {
    toggleSortAsc();
    onItemClick("sort", {
      sortMeta: {
        sortByAscDesc: !isAsc ? ToolBarSortBy.ASC : ToolBarSortBy.DESC,
        sortBy: selectedMenuItem
      }
    })
  }

  return (
    <S.ToolbarContainer>
      <div>{DailyCarePresent.toolbarDisplayNameMap[selectedMenuItem].displayName}

        <Tooltip title={`sorted by ${isAsc ? 'asc' : 'desc'}`}>
          <S.Button data-sort-asc={isAsc} onClick={handleSort}>
            ↓
          </S.Button>
        </Tooltip>
        <Menu
          value={selectedMenuItem} renderLabel={<S.Button>
            <svg height={18} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </S.Button>} useSwitch
          onSelectionChange={(v) => setSelectedMenuItem(v)}
        >
          <MenuItem value={ToolBarSortByKey.FIRST_NAME} >Sort By First Name</MenuItem>
          <MenuItem value={ToolBarSortByKey.LAST_NAME}>Sort By Last Name</MenuItem>
        </Menu>
      </div>
      <div>
        <Search value={searchKey} onChange={onSearch} />
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    &[data-sort-asc="true"] {
      transform: rotate(180deg);
    }
    && {
      margin-left: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
