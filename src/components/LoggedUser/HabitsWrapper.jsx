import { createContext, useContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import axios from "axios";

import { DataContext } from "../../App";
import { HABITS_LIST_URL, TODAY_URL } from "../../assets/apiURL";

export const HabitsContext = createContext(null);

const HabitsWrapper = ({ children }) => {
    const { userInfo } = useContext(DataContext);
    const [habits, setHabits] = useState([]);
    const [todayHabits, setTodayHabits] = useState([]);
    const [doneHabits, setDoneHabits] = useState([]);

    useEffect(() => {
        if (userInfo.token) {

            // All habits list
            axios.get(HABITS_LIST_URL, {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`,
                }
            }).then(res => { setHabits(res.data); })
                .catch(err => console.log(err));

            //Today habits list
            axios.get(TODAY_URL, {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`,
                }
            }).then(res => {
                setTodayHabits(res.data);
                setDoneHabits(res.data.filter(habit => habit.done));
            })
                .catch(err => console.log(err));
        }
    }, [userInfo]);

    return <HabitsContext.Provider value={{ habits, setHabits, todayHabits, doneHabits }}>
        {children}
    </HabitsContext.Provider>;
};

HabitsWrapper.propTypes = {
    children: PropTypes.object,
};

export default HabitsWrapper;