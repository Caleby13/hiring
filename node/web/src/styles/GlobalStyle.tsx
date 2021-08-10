import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`

html, body, #root {
  height: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 14px 'Roboto', sans-serif;
}
`
