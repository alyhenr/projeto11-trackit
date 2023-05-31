import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;    

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;    
    }
    
    a {
        text-decoration: none;
    }
`;