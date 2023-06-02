import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import { BASE_URL } from '../../assets/apiURL';
import { DataContext } from '../../App';

const SCForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
        display: flex;
        justify-content: center;
        align-items: center;
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
    const { setUserInfo } = useContext(DataContext);

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
            .then(res => {
                if (islogin) {
                    navigate("/hoje");
                    setUserInfo(res.data);
                    // Saving the data locally, so the user stay logged in
                    Object.keys(res.data).forEach(userData => {
                        localStorage.setItem(`${userData}-trackIt`, res.data[userData]);
                    })
                } else {
                    navigate("/");
                    setSubmitted(false);
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    alert(err.response.data.message);
                } else if (err.response.status === 422) {
                    alert(`Ocorreu um problema no seu ${islogin ? "login" : "cadastro"}. Verifique o(s) seguinte(s) campo(s): ${err.response.data.details.map(detail => detail
                        .match(/(email|password|name|image)/)[0])
                        .join(", ")
                        }`)
                } else if (err.response.status === 409) {
                    alert(err.response.data.message);
                } else {
                    alert("Ocorreu um erro ao realizar seu cadastro, tente novamente em alguns instantes");
                }
                setSubmitted(false);
            });

    };

    return (
        <SCForm onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input
                data-test="email-input"
                type="email" name="email"
                id="email"
                placeholder='email'
                value={userData.email}
                onChange={handleChange}
                disabled={submitted}
            />
            <label htmlFor="password">Senha: </label>
            <input
                data-test="password-input"
                type="password" name="password"
                id="password"
                placeholder='senha'
                value={userData.password}
                onChange={handleChange}
                disabled={submitted}
            />
            {!islogin &&
                <>
                    <label htmlFor="name">Nome: </label>
                    <input
                        data-test="user-name-input"
                        type="text" name="name"
                        id="name"
                        placeholder='nome'
                        value={userData.name || ""}
                        onChange={handleChange}
                        disabled={submitted}
                    />
                    <label htmlFor="image">Foto de perfil: </label>
                    <input
                        data-test="user-image-input"
                        type="text" name="image"
                        id="image"
                        placeholder='foto'
                        value={userData.image || ""}
                        onChange={handleChange}
                        disabled={submitted}
                    />
                </>
            }
            <button data-test={islogin ? "login-btn" : "signup-btn"}
                disabled={submitted} type='submit'
            >
                {submitted ? <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#FFF"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                /> :
                    islogin ? "Entrar" : "Cadastrar"}
            </button>
        </SCForm>
    )
}

Form.propTypes = {
    islogin: PropTypes.bool,
};

export default Form;