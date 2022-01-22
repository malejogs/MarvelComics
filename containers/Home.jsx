import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import ComicsList from "../components/ComicsList";
import Search from "../components/Search";
import Loading from "../components/Loading";
import {
  getListComics,
  getListComicsByCharacter,
  apiHandle,
} from "../utils/api";

const FILTERS = [
  "Iron Man",
  "Spider-Man",
  "Deadpool",
  "Guardians of the Galaxy",
  "Loki",
  "Punisher",
];

const Home = () => {
  const router = useRouter();

  const {
    query: { comic = "" },
  } = router;

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(comic);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [comics, setComics] = useState([]);

  const getComics = (page, prevData) =>
    apiHandle(
      () => getListComics(page),
      setComics,
      setIsLoading,
      prevData,
      setHasMore
    );

  const getComicsByCharacter = (name, page, prevData) =>
    apiHandle(
      () => getListComicsByCharacter(name, page),
      setComics,
      setIsLoading,
      prevData,
      setHasMore
    );

  const debouncedApiHandler = useCallback(
    debounce((comic) => {
      comic.length > 2 ? getComicsByCharacter(comic) : getComics();
    }, 300),
    []
  );

  useEffect(() => {
    setSearch(comic);
    debouncedApiHandler(comic);
  }, [comic]);

  const handleInfiniteOnLoad = () => {
    const newPage = page + 1;
    setPage(newPage);
    comic?.length
      ? getComicsByCharacter(comic, newPage, comics)
      : getComics(newPage, comics);
  };

  return (
    <>
      <Search filters={FILTERS} value={search} setter={setSearch} />
      {isLoading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={comics.length}
          next={handleInfiniteOnLoad}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <ComicsList comics={comics} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default Home;
