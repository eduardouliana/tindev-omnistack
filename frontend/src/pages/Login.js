import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login( { history } ) {
    const [userName, setUsername] = useState('');

    async function handleSubmit(e) {
        //tira o evento padrão de um submit de um form que é enviar para outra página
        e.preventDefault();

        const response = await api.post('/devs',{
            username: userName
        });

        const { _id } = response.data;

        //Navega para aba main
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"></img>
                <input type="text"
                    placeholder="Digite seu usuário do github"
                    value={userName}
                    onChange={e => setUsername(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
            </form>
        </div>
    );
}