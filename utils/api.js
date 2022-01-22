import CryptoJS from "crypto-js";

const ITEMS_PER_PAGE = 12;

const getUrl = (parameters) => {
  const PRIV_KEY = process.env.PRIV_KEY;
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=${ITEMS_PER_PAGE}&format=comic&hasDigitalIssue=true${parameters}`;
  return url;
};

export const getListComics = (page = 1) =>
  fetch(getUrl(`&offset=${(page - 1) * ITEMS_PER_PAGE}`));
export const getListComicsByCharacter = (name, page = 1) =>
  fetch(
    getUrl(`&titleStartsWith=${name}&offset=${(page - 1) * ITEMS_PER_PAGE}`)
  );

export const apiHandle = async (
  api,
  setter,
  loading,
  prevData = [],
  setHasMore
) => {
  try {
    !prevData.length && loading(true);
    const getData = await api();
    const {
      data: { results, count },
    } = await getData.json();
    setter([...prevData, ...results]);
    setHasMore(!!count);
    !prevData.length && loading(false);
  } catch ({ message }) {
    console.warn(message);
    !prevData.length && loading(false);
  }
};
