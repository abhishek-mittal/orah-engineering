import { Button, Paper } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import { BorderRadius, Spacing } from "shared/styles/styles"

interface Props {
    selected?: boolean;
    value?: any;
}

export const MenuItem: React.FC<Props> = ({
    selected, value, children
}) => {
  return (
    <S.Wrapper isActive={selected} >
        {children}
    </S.Wrapper>
  )
}


const S = {
    Wrapper: styled.div<{ isActive: boolean }>`
        width: 100%;
        background-color: ${({ isActive }) => (isActive ? "#bcbcbc" : "#fff")};
        color: #343f64;
        cursor: pointer;
        height: 32px;
        display: flex;
        align-items: center;
        padding: ${Spacing.u2};
        &:hover {
            background-color: #bcbcbc;
        }
    `
}