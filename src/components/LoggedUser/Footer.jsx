import styled from "styled-components";

const SCWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;

    width: 100%;
    height: 75px;

    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);;
    padding: 10px 50px;

    h3 {
        font-size: 18px;
        color: #52B6FF;
    }

    button {
        width: 100px;
        height: 100px;
        
        border-radius: 50%;
        background: #52B6FF;
        border: none;
        margin-top: -50px;

        color: white;
        font-size: 20px;
        font-weight: 500;
    }
`;

const Footer = () => {
    return (
        <SCWrapper>
            <h3>Hábitos</h3>
            <button>Hoje</button>
            <h3>Histórico</h3>
        </SCWrapper>
    )
}

export default Footer