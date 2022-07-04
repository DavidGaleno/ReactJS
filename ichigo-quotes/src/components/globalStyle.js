import { createGlobalStyle } from "styled-components";
import backgroundIMG from '../images/background.jpg';

const GlobalStyle = createGlobalStyle`
    body{
        background-image: url(${backgroundIMG});
        background-position: bottom;
        background-size: cover;
        color:white;
        padding:0;
        margin:0;
    }
`;
export default GlobalStyle