import { useContext, useState } from 'react';
import { AuthContext } from '../../App';
import styled from 'styled-components'

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

const Form = () => {
    const { isLogin } = useContext(AuthContext);
    const [userData, setUserData] = useState({})
    console.log(userData);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log(isLogin);
    };

    const handleChange = (ev) => {
        setUserData(prevState => ({
            ...prevState,
            [ev.target.name]: ev.target.value,
        }))
    };

    return (
        <SCForm onSubmit={handleSubmit}>
            <input
                type="email" name="email"
                placeholder='email'
                value={userData.email || ""}
                onChange={handleChange}
            />
            <input
                type="password" name="password"
                placeholder='senha'
                value={userData.password || ""}
                onChange={handleChange}
            />
            {!isLogin &&
                <>
                    <input
                        type="text" name="name"
                        placeholder='nome'
                        value={userData.name || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text" name="image"
                        placeholder='foto'
                        value={userData.image || ""}
                        onChange={handleChange}
                    />
                </>
            }
            <button>{isLogin ? "Entrar" : "Cadastrar"}</button>
        </SCForm>
    )
}

export default Form