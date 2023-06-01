import { useContext, useState } from "react";
import styled from "styled-components";

import { HabitsContext } from "../../components/LoggedUser/HabitsWrapper";
import BodyWrapper from "../../assets/BodyWrapper";
import Header from "../../components/LoggedUser/Header";
import Footer from "../../components/LoggedUser/Footer";

const SCWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    width: 80%;
    height: 200px;
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
        gap: 20px;

        width: 90%;
    }

    .option {
        display: inline-block;

        width: 32px;
        height: 30px;

        margin: 5px 2px;
        border: 1px solid #DBDBDB;
        border-radius: 5px;
        text-align: center;  
        
        font-size: 20px;
        color: #DBDBDB;

        cursor: pointer;
    }

    .selected {
        background: #CFCFCF;
        color: #FFF;
    }

    .actions {
        justify-content: flex-end;
    }

    .actions>button {        
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

const days = Array(7).fill().map((_, i) => i === 0 ? 7 : i);

const Habits = () => {
    const [showForm, setShowForm] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);

    const { habits, setHabits } = useContext(HabitsContext);

    const handleSubmit = ev => {
        ev.preventDefault();
        console.log({
            name: habitName,
            days: selectedDays.sort((a, b) => a - b)
        })
    }

    return (
        <BodyWrapper>
            <Header />
            <div className="my-habits">
                <h2>Meus hábitos</h2>
                <button onClick={() => setShowForm(true)}>+</button>
            </div>
            {showForm && <SCWrapper>
                <input
                    type="text"
                    placeholder="Nome do hábito"
                    value={habitName}
                    onChange={(ev) => setHabitName(ev.target.value)}
                />
                <div className="days">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                        <button
                            className={`option ${selectedDays.includes(days[index]) && "selected"}`}
                            onClick={() => {
                                setSelectedDays(prevState => prevState.includes(days[index])
                                    ? prevState.filter(day => day !== days[index])
                                    : [...prevState, days[index]]);
                            }}
                            key={`${day}-${index}`}
                            type="checkbox"
                        >{day}</button>
                    ))}
                </div>
                <div className="actions">
                    <button id="cancel">Cancelar</button>
                    <button id="save" onClick={handleSubmit}>Salvar</button>
                </div>
            </SCWrapper>}
            {habits.length === 0 && <p style={{
                fontSize: "18px",
                color: "#666666",
            }}>
                Você não tem nenhum hábito cadastrado ainda.
                Adicione um hábito para começar a trackear!
            </p>}
            <Footer />
        </BodyWrapper>
    )
}

export default Habits