import { ClickAwayListener, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useToggle from 'shared/hooks/use-toggle';
import styled from 'styled-components';

interface Props {
    renderLabel: React.ReactElement;
    useSwitch?: boolean; // use single selected menu at a time
    value?: any;
    onSelectionChange?: (value: any) => void;
}

export const Menu: React.FC<Props> = ({
    renderLabel,
    useSwitch, value,
    children, onSelectionChange
}) => {

    const [menuOpen, toggleMenu] = useToggle(false);

    const handleSelectionValue = (v: any) => {
        onSelectionChange && onSelectionChange(v)
    }

    return (
        <ClickAwayListener onClickAway={() => toggleMenu(false)}>
            <S.MenuWrapper>
                <span onClick={toggleMenu}>
                    {renderLabel}
                </span>
                <S.PopOver isActive={menuOpen} >
                    {
                        React.Children.map(children, (child: any, index) => {
                            const [isSelected, setSelected] = useState(false);
                            const toggleSelected = () => setSelected(!isSelected);
                            const _value = child?.props?.value || "";

                            useEffect(() => {
                                setSelected(value === _value);
                            }, [value])

                            return <div key={"__menu_" + index} onClick={() => handleSelectionValue(_value)} >
                                {React.cloneElement(child as any, {
                                    selected: isSelected
                                })}
                            </div>
                        })
                    }
                </S.PopOver>
            </S.MenuWrapper>
        </ClickAwayListener>
    )
}

const S = {
    MenuWrapper: styled.div`
        position: relative;
        display: inline;
    `,
    PopOver: styled.div<{ isActive: boolean }> `
        position: absolute;
        top: 20px;
        right: 0;
        z-index: 100;   
        display: flex;
        flex-flow: column;
        max-width: 300px;
        width: 600px;
        overflow: hidden;
        height: ${({ isActive }) => (isActive ? "auto" : 0)};
        background-color: rgba(34, 43, 74, 0.92);
        color: #fff;

        & > div:not(:last-child) {
            margin-bottom: 1px;
        }
    `
}