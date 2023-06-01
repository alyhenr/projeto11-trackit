import { useContext } from 'react';
import Calendar from 'react-calendar';

import BodyWrapper from '../../assets/BodyWrapper';
import Header from '../../components/LoggedUser/Header';
import Footer from '../../components/LoggedUser/Footer';

const History = () => {
    return (
        <BodyWrapper>
            <Header />
            <div className="history">
                <h2>Histórico</h2>
                <Calendar />
            </div>
            <Footer />
        </BodyWrapper>
    )
}

export default History