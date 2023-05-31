import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import { BASE_URL } from '../../assets/apiURL';

const SCForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    input {        
        width: 310px;
        height: 45px;

        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 10px;
        font-size: 20px;
    }

    button {       
        width: 310px;
        height: 45px;       

        background: #52B6FF;
        border-radius: 7px;
        border: none;
        font-size: 22px;
        text-align: center;

        color: #FFFFFF;
        cursor: pointer;
    }
`;

const loginData = {
    email: "",
    password: "",
};

const Form = ({ islogin }) => {
    const [userData, setUserData] = useState({ ...loginData });
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setUserData((islogin ? {
            ...loginData
        } : {
            ...loginData,
            name: "",
            image: "",
        }));
    }, [islogin]);

    const handleChange = (ev) => {
        setUserData(prevState => ({
            ...prevState,
            [ev.target.name]: ev.target.value,
        }))
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setSubmitted(true);

        axios.post(BASE_URL + `${islogin ? "login" : "sign-up"}`, userData)
            .then(() => {
                if (islogin) { navigate("/hoje") } else {
                    navigate("/");
                    setSubmitted(false);
                }
            })
            .catch(err => {
                alert(`Ocorreu um problema no seu ${islogin ? "login" : "cadastro"}. Verifique o(s) seguinte(s) campo(s): ${err.response.data.details.map(detail => detail
                    .match(/(email|password|name|image)/)[0])
                    .join(", ")
                    }`)
                setSubmitted(false);
            });

    };

    return (
        <SCForm onSubmit={handleSubmit}>
            <input
                type="email" name="email"
                placeholder='email'
                value={userData.email}
                onChange={handleChange}
                disabled={submitted}
            />
            <input
                type="password" name="password"
                placeholder='senha'
                value={userData.password}
                onChange={handleChange}
                disabled={submitted}
            />
            {!islogin &&
                <>
                    <input
                        type="text" name="name"
                        placeholder='nome'
                        value={userData.name || ""}
                        onChange={handleChange}
                        disabled={submitted}
                    />
                    <input
                        type="text" name="image"
                        placeholder='foto'
                        value={userData.image || ""}
                        onChange={handleChange}
                        disabled={submitted}
                    />
                </>
            }
            <button>{islogin ? "Entrar" : "Cadastrar"}</button>
        </SCForm>
    )
}

Form.propTypes = {
    islogin: PropTypes.bool,
};

export default Form