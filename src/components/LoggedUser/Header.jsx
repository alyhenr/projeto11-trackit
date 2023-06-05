import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TrackIt from '../../assets/TrackIt.png';
import { DataContext } from '../../App';

const SCWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;

    width: 100%;
    height: 80px;

    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);;
    padding: 10px 50px;

    img {
        cursor: pointer;
    }

    #logo {
        width: 100px;
    }

    .clicked {
        border: 1px solid #FFF;
    }

    #profile-pic {
        width: 55px;
        height: 55px;
        border-radius: 50%;

        &:hover {
            scale: 1.01;
            transform: translateY(-0.5px);
            opacity: 0.8;
        }
    }

    div {
        position: relative;

        .menu {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;

            position: absolute;
            bottom: -40px;
            left: 0;
            right: 0;
            margin: 0 auto;

            width: 100px;

            background-color: #FFF;
            padding: 10px 20px;
            border-radius: 10px;
            margin: 1px solid grey;

            cursor: pointer;
        }

    }
`;

const Header = () => {
    const { userInfo } = useContext(DataContext);
    const [displayMenu, setDisplayMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <SCWrapper data-test="header">
            <img src={TrackIt} alt="Logo" id="logo" onClick={() => navigate('/hoje')} />
            <div>
                <img
                    data-test="avatar"
                    src={userInfo.image}
                    alt="user-picture"
                    id="profile-pic"
                    onClick={() => setDisplayMenu(display => !display)}
                    className={displayMenu ? 'clicked' : ''}
                />
                {displayMenu && <div className='menu'>
                    <h5 onClick={() => {
                        localStorage.clear();
                        navigate('/');
                    }}>Logout</h5>
                </div>}
            </div>
        </SCWrapper>
    );
};

export default Header;