import { IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react'
import useDebounce from 'shared/hooks/use-debounce';
import styled from 'styled-components';

interface Props {
    value?: string;
    onChange?: (searchKey: string) => void;
}

const Search: React.FC<Props> = ({
    value = "",
    onChange
}) => {

    const handleSearch = (searchKey: string) => {
        onChange && onChange(searchKey)
    }

    return (
        <S.SearchWrapper>
            <S.Input
                value={value}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search"
            />
            <S.Button type="submit" aria-label="search">
                &#128270;
            </S.Button>
        </S.SearchWrapper>
    )
}

const S = {
    SearchWrapper: styled.div`
        display: inline-block;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
    `,
    Input: styled.input`
        display: inline-flex;
        box-sizing: border-box;
        border: none;
        height: 40px;
        padding-right: 40px;
        padding-left: 8px;
        &:focus {
            outline: none;
        }
    `,
    Button: styled.button`
        position: absolute;
        right: 0%;
        /* box-sizing: border-box; */
        font-size: 18px;
        height: 100%;
        background-color: white;
        border: none;
    `
}

export default Search;