import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from "../../assets/Logo.png";
import Form from '../../components/Auth/Form';

const SCWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin: 100px auto;

    img {
        width: 180px;
        height: 180px;
    }
`;

const Auth = () => {
    const page = window.location.pathname;
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        setIsLogin(page === "/");
    }, [page]);

    return (
        <SCWrapper>
            <img src={logo} alt="logo" />
            <Form islogin={isLogin} setIsLogin={setIsLogin} />
            <Link
                data-test={isLogin ? "signup-link" : "login-link"}
                to={isLogin ? '/cadastro' : '/'}
                onClick={() => setIsLogin(prevState => !prevState)}
            >{isLogin ? "Não tem uma conta? Cadastre-se!" : "Já tem uma conta? Faça login!"}</Link>
        </SCWrapper>
    );
};

export default Auth;