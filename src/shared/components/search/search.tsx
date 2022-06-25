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
                <svg height={20} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
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