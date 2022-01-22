import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  position: sticky;
  top: -25px;
  z-index: 5;
  padding: 30px 10% 0;
  background: var(--white);
`;

const SearchInput = styled.input`
  font-size: 25px;
  width: 100%;
  padding: 10px 15px;
  border-radius: 50px;
  outline: none;
  text-align: center;
  background-color: #f5f5f5;
  border: none;
`;

const Filters = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const Filter = styled.li`
  padding: 2px;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.5s ease;
  color: var(--red);
  font-weight: bold;
  margin: 2px;
  &:hover,
  &.active {
    background-color: var(--red);
    color: white;
    text-transform: uppercase;
  }
`;

const Search = ({ value, setter, filters }) => {
  const router = useRouter();

  const handleOnChange = ({ target: { value } }) => setter(value);

  const debouncedSearchHandler = useCallback(
    debounce((newQuery) => {
      const query = newQuery?.length && { comic: newQuery };
      router.push({ pathname: "/", query });
    }, 500),
    []
  );

  const handleFilter = (name) => () => setter(name);

  useEffect(() => {
    debouncedSearchHandler(value);
  }, [value]);

  return (
    <Wrapper>
      <SearchInput
        type="search"
        onChange={handleOnChange}
        placeholder="🔍 Search"
        value={value}
      />

      <Filters>
        {filters?.map((filter) => (
          <Filter
            className={value === filter ? "active" : ""}
            key={filter}
            onClick={handleFilter(filter)}
          >
            {filter}
          </Filter>
        ))}
      </Filters>
    </Wrapper>
  );
};

export default Search;
