import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;

    width: 90%;
    min-height: 200px;
    padding: 20px;
    background-color: white;
    border-radius: 20px;
    margin: 0 auto;

    input {
        max-width: 700px;
        width: 90%;
        height: 45px;

        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding-left: 10px;
        color: #000;
        font-size: 20px;

        &::placeholder {
            color: #DBDBDB;
            font-size: 15px;
        }
    }

    div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;

        width: 90%;
    }

    .actions {
        justify-content: flex-end;
    }

    .actions>button {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 90px;
        height: 35px;
        border-radius: 5px;
        border: none;
        text-align: center;
        font-size: 18px;

        cursor: pointer;

        &:hover {
            scale: 1.005;
            opacity: 0.8;
            transform: translateY(-1px);
        }
    }

    #cancel {
        color: #52B6FF;
        background-color: #FFF;
    }

    #save {
        color: #FFF;
        background-color: #52B6FF;
    }
`;