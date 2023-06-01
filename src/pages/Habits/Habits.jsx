import { useContext, useState } from "react";
import axios from "axios";

import { CREATE_URL } from "../../assets/apiURL";
import { DataContext } from "../../App";
import { HabitsContext } from "../../components/LoggedUser/HabitsWrapper";
import BodyWrapper from "../../assets/BodyWrapper";
import Header from "../../components/LoggedUser/Header";
import Footer from "../../components/LoggedUser/Footer";
import HabitsForm from "./HabitsForm";
import HabitDay from "./HabitDay";
import HabitsList from "./HabitsList";
import trashIcon from "../../assets/trash-icon.png";

const days = Array(7).fill().map((_, i) => i === 0 ? 7 : i);
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const Habits = () => {
    const [showForm, setShowForm] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);

    const { habits, setHabits } = useContext(HabitsContext);
    const { userInfo } = useContext(DataContext);

    const handleSubmit = ev => {
        ev.preventDefault();

        axios.post(CREATE_URL, {
            name: habitName,
            days: selectedDays.sort((a, b) => a - b)
        }, { headers: { "Authorization": `Bearer ${userInfo.token}` } })
            .then(res => {
                setHabits(prevState => [...prevState, res.data]);
                setShowForm(false);
                setHabitName("");
                setSelectedDays([]);
            })
            .catch(err => console.log(err));
    }
    console.log(habits);
    return (
        <BodyWrapper>
            <Header />
            <div className="my-habits">
                <h2>Meus hábitos</h2>
                <button onClick={() => setShowForm(true)}>+</button>
            </div>
            {showForm && <HabitsForm>
                <input
                    type="text"
                    placeholder="Nome do hábito"
                    value={habitName}
                    onChange={(ev) => setHabitName(ev.target.value)}
                />
                <div className="days">
                    {weekDays.map((day, index) => (
                        <HabitDay
                            selected={selectedDays.includes(days[index])}
                            onClick={() => {
                                setSelectedDays(prevState => prevState.includes(days[index])
                                    ? prevState.filter(day => day !== days[index])
                                    : [...prevState, days[index]]);
                            }}
                            key={`${day}-${index}`}
                            type="checkbox"
                        >{day}</HabitDay>
                    ))}
                </div>
                <div className="actions">
                    <button id="cancel">Cancelar</button>
                    <button id="save" type="submit"
                        onClick={handleSubmit}
                    >Salvar</button>
                </div>
            </HabitsForm>}
            {habits.length === 0 ? <p style={{
                fontSize: "18px",
                color: "#666666",
            }}>
                Você não tem nenhum hábito cadastrado ainda.
                Adicione um hábito para começar a trackear!
            </p>
                : habits.map(habit => (
                    <HabitsList key={habit.id}>
                        <h3>{habit.name}</h3>
                        <div className="days">
                            {weekDays.map((day, i) => (
                                <HabitDay
                                    key={days[i]}
                                    selected={habit.days && habit.days.includes(days[i])}
                                >
                                    {day}
                                </HabitDay>
                            ))}
                        </div>
                        <img src={trashIcon} alt="trash icon" />
                    </HabitsList>
                ))}
            <Footer />
        </BodyWrapper>
    )
}

export default Habits