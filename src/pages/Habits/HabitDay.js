import styled from "styled-components";

export default styled.button`

    display: inline-block;

    width: 32px;
    height: 30px;

    margin: 5px 2px;
    border: 1px solid #DBDBDB;
    border-radius: 5px;
    text-align: center;

    font-size: 20px;
    background-color: ${({ selected }) => selected ? "#CFCFCF" : "#FFF"};
    color: ${({ selected }) => selected ? "#FFF" : "#DBDBDB"};
    cursor: pointer;

    .selected {
        background: #CFCFCF;
        color: #FFF;
    }
`;