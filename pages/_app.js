import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');

  :root {
    --red: #FF452B;
    --white: #fff;
    --black: #263238
  }

  html{
      margin:0 auto;
      padding: 0;
  }

  body{
      background-color:var(--white);
      min-height:100vh;
      margin:0;
      font-family: 'Roboto Condensed', sans-serif;
      color: var(--black);
  }
`;

function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default App;
