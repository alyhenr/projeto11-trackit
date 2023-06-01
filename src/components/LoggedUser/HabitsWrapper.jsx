import { createContext, useState } from "react";
import { PropTypes } from 'prop-types';

export const HabitsContext = createContext(null);

const HabitsWrapper = ({ children }) => {
    const [habits, setHabits] = useState([]);

    return <HabitsContext.Provider value={{ habits, setHabits }}>
        {children}
    </HabitsContext.Provider>
};

HabitsWrapper.propTypes = {
    children: PropTypes.object,
}

export default HabitsWrapper;