import styled from "styled-components";

export default styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;

    width: 100%;
    height: 100vh;

    margin-top: 80px;
    margin-bottom: 70px;

    background-color: #F2F2F2;
    padding: 20px 30px;

    my-habits {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            position: absolute;
            width: 40px;
            height: 35px;            

            background: #52B6FF;
            border-radius: 4.63636px;
        }

        h2 {
            width: 150px;
            height: 30px;
            font-size: 24px;

            color: #126BA5;
        }
    }
    
`;