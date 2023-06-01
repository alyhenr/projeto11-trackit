import { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { DataContext } from '../../App';
import { HabitsContext } from '../../components/LoggedUser/HabitsWrapper';
import { CHECK_HABIT_URL, UNCHECK_HABIT_URL } from '../../assets/apiURL';
import BodyWrapper from '../../assets/BodyWrapper';
import Header from '../../components/LoggedUser/Header';
import Footer from '../../components/LoggedUser/Footer';
import checkIcon from '../../assets/check.png';

const SCToday = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    width: 90%;
    margin: 0 auto;

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
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;
        
        margin-top: 30px;
        width: 100%;
        
        li {
            width: 100%;
            height: 100px;
            
            position: relative;

            padding: 10px 10px;
            background-color: #FFF;
            border-radius: 10px;
        }

        h3,h5 {
            color: #666666;
        }

        h3 {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 10px;
        }

        h5 {            
            font-size: 16px;
        }

        div {
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;
            right: 20px;

            width: 70px;
            height: 70px;
            
            border-radius: 10px;
            background-color: #EBEBEB;

            cursor: pointer;
        }

        .done {
            background: #8FC549;
        }
        
        h1 {
            margin-top: 100px;
            font-size: 26px;
            text-align: center;
            color: #126BA5;
        }
    }
`;

const date = new Date;

const Today = () => {
    const { todayHabits } = useContext(HabitsContext);
    const { userInfo, setUserInfo } = useContext(DataContext);
    const [doneHabits] = useState(todayHabits.filter(habit => habit.done));

    const checkHabit = habit => {
        const url = !habit.done
            ? CHECK_HABIT_URL(habit.id)
            : UNCHECK_HABIT_URL(habit.id);

        axios.post(url, {}, {
            headers:
                { "Authorization": `Bearer ${userInfo.token}` }
        }).then(() => {
            setUserInfo(prevState => ({ ...prevState, "updateAppState": {} }));
        }).catch(err => console.log(err));
    };

    return (
        <>
            <BodyWrapper>
                <Header />
                <SCToday>
                    <div className="info">
                        <h2>{date.getDay()}</h2>
                        <h4 style={{
                            color: `${doneHabits.length && "#8FC549"}`
                        }}>{todayHabits && doneHabits.length > 0 ?
                            `${((doneHabits.length / todayHabits.length) * 100).toFixed(0)}% dos hábitos concluídos`
                            : "Nenhum hábito concluído ainda"}
                        </h4>
                    </div>
                    <ul className="habits__list">
                        {todayHabits.length > 0 ? todayHabits.map(habit => (
                            <li key={habit.id}>
                                <h3>{habit.name}</h3>
                                <h5>
                                    Sequência atual: {habit.currentSequence}
                                </h5>
                                <h5>
                                    Seu recorde: {habit.highestSequence}
                                </h5>
                                <div
                                    className=
                                    {`${habit.done ? "done" : ""}`}
                                    onClick={() => checkHabit(habit)}
                                >
                                    <img src={checkIcon} alt="check icon" />
                                </div>
                            </li>
                        )) : <h1>Você não adicionou nenhum hábito ainda...</h1>}
                    </ul>
                </SCToday>
                <Footer />
            </BodyWrapper>
        </>
    )
}

export default Today