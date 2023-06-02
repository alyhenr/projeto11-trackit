import { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import styled from 'styled-components';

import { DataContext } from '../../App';
import { HISTORY_URL } from '../../assets/apiURL';
import BodyWrapper from '../../assets/BodyWrapper';
import Header from '../../components/LoggedUser/Header';
import Footer from '../../components/LoggedUser/Footer';
import '../../../node_modules/react-calendar/dist/Calendar.css';

const SCHistory = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    margin: 0 auto;

    h2 {
        font-size: 24px;
        color: #126BA5;
    }

    .react-calendar {
        border-radius: 15px;
    }

    button {   
        border-radius: 50%;      
        font-size: 20px;        
    }

    .all-done {
        background: #8FC549;    
    }

    .not-all-done {
        background: #ea5766;
    }

    .day-details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 40px;

        width: 500px;
        height: fit-content;

        padding: 20px;
        background-color: #FFF;
        border-radius: 15px;
    }
`;

const CurrDate = new Date;

const History = () => {
    const { userInfo } = useContext(DataContext);
    const [habitsHistory, setHabitsHistory] = useState([]);
    const [days, setDays] = useState([]);
    const [showDetails, setShowDetails] = useState({
        display: false,
        details: {},
    });

    useEffect(() => {
        if (userInfo.token) {
            axios.get(HISTORY_URL, {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`,
                }
            }).then(res => { setHabitsHistory(res.data); setDays(res.data.map(data => data.day)) })
                .catch(err => console.log(err));
        }
    }, [userInfo]);

    const getMonthNumberFromName = monthName => {
        return new Date(`${monthName} 1, 2022`).getMonth() + 1;
    }

    const formatedDate = date => {
        const day = date.toString().split(' ')[2];
        const month = getMonthNumberFromName(date.toString().slice(4, 7));
        const year = CurrDate.getFullYear();

        return `${day}/${month > 9 ? month : `0${month}`}/${year}`;
    }

    const styleDays = ({ date }) => {
        const day = formatedDate(date);

        if (days.includes(day)) {
            const index = days.indexOf(day);
            const dayInfo = habitsHistory.find(info => info.day === days[index]);
            if (dayInfo.habits.length
                === dayInfo.habits.filter(habit => habit.done).length) {
                return "all-done";
            } else { return "not-all-done" }
        }
    };

    const showDayInfo = day => {
        const clickedDay = formatedDate(day);
        const dayInfo = habitsHistory.find(habit => habit.day === clickedDay);

        if (dayInfo) {
            setShowDetails({
                display: true,
                details: dayInfo
            });

        } else { return; }

    };

    return (
        <BodyWrapper>
            <Header />
            <SCHistory>
                <h2>Histórico</h2>
                <div data-test="calendar">
                    {habitsHistory.length > 0 && <Calendar
                        locale='pt-BR'
                        tileClassName={styleDays}
                        onClickDay={showDayInfo}
                    />}
                </div>
                {showDetails.display && <div className='day-details'>
                    {showDetails.details.habits.map(habit => (
                        <div className="habit" key={habit.id}>
                            <div>
                                <h1>{habit.name}</h1>
                                <h3>{habit.done ? "Feito!" : "Não feito!"}</h3>
                            </div>
                        </div>
                    ))}
                </div>}
            </SCHistory>
            <Footer />
        </BodyWrapper>
    )
}

export default History