import { useContext, useEffect, useState } from 'react';
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

        button {
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
            border: none;

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
const BRdays = {
    'Sun': 'Domingo',
    'Mon': 'Segunda',
    'Tue': 'Terça',
    'Wed': 'Quarta',
    'Thu': 'Quinta',
    'Fri': 'Sexta',
    'Sat': 'Sábado',
};

const day = date.getDate() > 9 ? String(date.getDate()) : `0${date.getDate()}`;
const month = date.getMonth() + 1 > 9 ? String(date.getMonth() + 1) : `0${date.getMonth() + 1}`;

const Today = () => {
    const { todayHabits, doneHabits } = useContext(HabitsContext);
    const { userInfo, setUserInfo } = useContext(DataContext);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const perc = (doneHabits.length / todayHabits.length) * 100;
        setPercentage(Number(perc.toFixed(0)));
    }, [todayHabits, doneHabits]);

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
                        <h2 data-test="today"
                        >{`${BRdays[String(date).slice(0, 3)]}, ${day}/${month}`}</h2>
                        <h4 data-test="today-counter"
                            style={{
                                color: `${percentage > 0 ? "#8FC549" : "#BABABA"}`
                            }}>{percentage > 0
                                ? `${percentage}% dos hábitos concluídos`
                                : "Nenhum hábito concluído ainda"}
                        </h4>
                    </div>
                    <ul className="habits__list">
                        {todayHabits.length > 0 ? todayHabits.map(habit => (
                            <li data-test="today-habit-container" key={habit.id}>
                                <h3 data-test="today-habit-name">{habit.name}</h3>
                                <h5 data-test="today-habit-sequence">
                                    Sequência atual: <span
                                        style={{
                                            color: `${habit.currentSequence > 0 ? "#8FC549" : "#666666"}`
                                        }}>{habit.currentSequence} {habit.currentSequence > 1 ? "dias" : "dia"}</span>
                                </h5>
                                <h5 data-test="today-habit-record">
                                    Seu recorde: <span
                                        style={{
                                            color: `${habit.highestSequence > 0
                                                && habit.highestSequence === habit.currentSequence
                                                ? "#8FC549" : "#grey"}`
                                        }}>{habit.highestSequence} {habit.highestSequence > 1 ? "dias" : "dia"}</span>
                                </h5>
                                <button
                                    data-test="today-habit-check-btn"
                                    className=
                                    {`${habit.done ? "done" : ""}`}
                                    onClick={() => checkHabit(habit)}
                                >
                                    <img src={checkIcon} alt="check icon" />
                                </button>
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