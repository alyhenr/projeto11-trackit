import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;

    position: relative;

    width: 90%;
    min-height: 95px;
    background-color: #FFF;
    border-radius: 7px;
    box-shadow: 2px 2px 5px;
    padding: 10px 15px;

    img {
        position: absolute;
        top: 15px;
        right: 12px;

        cursor: pointer;
    }
`;