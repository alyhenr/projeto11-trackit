import { useContext } from 'react';
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
    padding: 10px 20px;

    img {
        cursor: pointer;
    }

    #logo {
        width: 100px;
    }

    #profile-pic {
        width: 55px;
        height: 55px;
        border-radius: 50%;
    }
`;

const Header = () => {
    const { userInfo } = useContext(DataContext);

    return (
        <SCWrapper>
            <img src={TrackIt} alt="Logo" id="logo" onClick={() => window.location.reload()} />
            <img src={userInfo.image} alt="user-picture" id="profile-pic" />
        </SCWrapper>
    )
};

export default Header;