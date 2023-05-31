import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { DataContext } from '../../App';
import { TODAY_URL } from '../../assets/apiURL';
import BodyWrapper from '../../assets/BodyWrapper';
import Header from '../../components/LoggedUser/Header';
import Footer from '../../components/LoggedUser/Footer';

const SCToday = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;

        h2 {
            font-size: 24px;
            color: #126BA5;
        }

        h4 {
            font-size: 18px;
            color: #BABABA;
        }
    }

    .habits__list {
        list-style-type: none;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        h1 {
            margin-top: 100px;
            font-size: 26px;
            text-align: center;
            color: #126BA5;
        }
    }
`;

const Today = () => {
    const [habits, setHabits] = useState({});
    const { userInfo } = useContext(DataContext);
    useEffect(() => {
        axios.get(TODAY_URL, {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        })
            .then(res => { setHabits(res.data); console.log(res) })
            .catch(err => console.log(err));
    }, [userInfo.token]);

    return (
        <>
            <BodyWrapper>
                <Header />
                <SCToday>
                    <div className="info">
                        <h2>Date</h2>
                        <h4>Mock</h4>
                    </div>
                    <ul className="habits__list">
                        {habits.length > 0 ? habits.map(habit => (
                            <li key={habit.name}>{habit.name}</li>
                        )) : <h1>Você não adicionou nenhum hábito ainda...</h1>}
                    </ul>
                </SCToday>
                <Footer />
            </BodyWrapper>
        </>
    )
}

export default Today