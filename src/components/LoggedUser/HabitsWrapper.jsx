import { createContext, useContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import axios from "axios";

import { DataContext } from "../../App";
import { HABITS_LIST_URL } from "../../assets/apiURL";

export const HabitsContext = createContext(null);

const HabitsWrapper = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const { userInfo } = useContext(DataContext);

    useEffect(() => {
        if (userInfo.token) {
            axios.get(HABITS_LIST_URL, {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`,
                }
            }).then(res => { setHabits(res.data) }).catch(err => console.log(err));
        }
    }, [userInfo]);

    return <HabitsContext.Provider value={{ habits, setHabits }}>
        {children}
    </HabitsContext.Provider>
};

HabitsWrapper.propTypes = {
    children: PropTypes.object,
}

export default HabitsWrapper;