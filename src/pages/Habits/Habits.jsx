import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

import { DataContext } from "../../App";
import { HabitsContext } from "../../components/LoggedUser/HabitsWrapper";
import { CREATE_URL } from "../../assets/apiURL";
import { DELETE_URL } from "../../assets/apiURL";
import { HABITS_LIST_URL } from "../../assets/apiURL";
import BodyWrapper from "../../assets/BodyWrapper";
import Header from "../../components/LoggedUser/Header";
import Footer from "../../components/LoggedUser/Footer";
import HabitsForm from "./HabitsForm";
import HabitDay from "./HabitDay";
import HabitsList from "./HabitsList";
import trashIcon from "../../assets/trash-icon.png";

const days = Array(7).fill().map((_, i) => i);
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const Habits = () => {
    const [showForm, setShowForm] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const { habits, setHabits } = useContext(HabitsContext);
    const { userInfo, setUserInfo } = useContext(DataContext);

    const handleSubmit = ev => {
        ev.preventDefault();
        setSubmitted(true);

        if (!habitName) {
            alert("O seu novo hábito deve conter um nome!");
            setSubmitted(false);
            return;
        }

        axios.post(CREATE_URL, {
            name: habitName,
            days: selectedDays.sort((a, b) => a - b)
        }, { headers: { "Authorization": `Bearer ${userInfo.token}` } })
            .then(res => {
                setHabits(prevState => [...prevState, res.data]);
                setShowForm(false);
                setHabitName("");
                setSelectedDays([]);
                setUserInfo(prevState => ({
                    ...prevState,
                    "updateNewHabit": {},
                }));
                setSubmitted(false);
            })
            .catch(err => console.log(err));
    };

    const handleDeletion = (id) => {
        const confirmation =
            confirm("Tem certeza que deseja deletar esse hábito da sua lista?");

        if (confirmation) {
            axios.delete(DELETE_URL(id), {
                headers:
                    { "Authorization": `Bearer ${userInfo.token}` }
            })
                .then(() => axios.get(HABITS_LIST_URL, {
                    headers:
                        { "Authorization": `Bearer ${userInfo.token}` }
                })
                    .then(res => {
                        setHabits(res.data);
                        setUserInfo(prevState => ({
                            ...prevState,
                            "updateAppState": {},
                        }));
                    })
                    .catch(err => console.log(err))
                )
                .catch(err => console.log(err));
        } else { return; }
    };

    return (
        <BodyWrapper>
            <Header />
            <div className="my-habits">
                <h2>Meus hábitos</h2>
                <button data-test="habit-create-btn"
                    onClick={() => setShowForm(true)}>+</button>
            </div>
            {showForm && <HabitsForm data-test="habit-create-container">
                <input
                    disabled={submitted}
                    data-test="habit-name-input"
                    type="text"
                    placeholder="nome do hábito"
                    value={habitName}
                    onChange={(ev) => setHabitName(ev.target.value)}
                />
                <div className="days">
                    {weekDays.map((day, index) => (
                        <HabitDay
                            disabled={submitted}
                            data-test="habit-day"
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
                    <button data-test="habit-create-cancel-btn"
                        disabled={submitted}
                        id="cancel" type="button"
                        onClick={() => setShowForm(false)}>Cancelar</button>
                    <button data-test="habit-create-save-btn"
                        disabled={submitted}
                        id="save" type="submit"
                        onClick={(ev) => { handleSubmit(ev); }}
                    >{submitted
                        ? <ThreeDots
                            height="35"
                            width="80"
                            radius="9"
                            color="#FFF"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                        : "Salvar"}</button>
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
                    <HabitsList data-test="habit-container" key={habit.id}>
                        <h3 data-test="habit-name"
                        >{habit.name}</h3>
                        <div className="days">
                            {weekDays.map((day, i) => (
                                <HabitDay
                                    data-test="habit-day"
                                    key={days[i]}
                                    selected={habit.days && habit.days.includes(days[i])}
                                >
                                    {day}
                                </HabitDay>
                            ))}
                        </div>
                        <img
                            data-test="habit-delete-btn"
                            src={trashIcon}
                            alt="trash icon"
                            onClick={() => handleDeletion(habit.id)}
                        />
                    </HabitsList>
                ))}
            <Footer />
        </BodyWrapper>
    );
};

export default Habits;