import { createContext, useContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import axios from "axios";

import { DataContext } from "../../App";
import { HABITS_LIST_URL, TODAY_URL } from "../../assets/apiURL";

export const HabitsContext = createContext(null);

const HabitsWrapper = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [todayHabits, setTodayHabits] = useState([]);
    const { userInfo } = useContext(DataContext);

    useEffect(() => {
        if (userInfo.token) {

            // All habits list
            axios.get(HABITS_LIST_URL, {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`,
                }
            }).then(res => { setHabits(res.data) })
                .catch(err => console.log(err));

            //Today habits list
            axios.get(TODAY_URL, {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`,
                }
            }).then(res => { setTodayHabits(res.data) })
                .catch(err => console.log(err));
        }
    }, [userInfo]);

    return <HabitsContext.Provider value={{ habits, setHabits, todayHabits }}>
        {children}
    </HabitsContext.Provider>
};

HabitsWrapper.propTypes = {
    children: PropTypes.object,
}

export default HabitsWrapper;