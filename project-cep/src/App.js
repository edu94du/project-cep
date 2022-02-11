import { useState } from "react";
import React from "react";
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

export default function App() {

    const [input, setInput] = useState('');
    const [zipCode, setZipCode] = useState({});

    async function handleSearch() {
        if (input === '') {
            alert('Please insert an zipcode')
            return;
        }

        try {
            const response = await api.get(`${input}/json`)
            console.log(response)
            setZipCode(response.data);
            setInput('');
        } catch {
            alert('Error to find your zipcode :(');
            setInput('');
        }
    }

    return (
        <div className="container">

            <h1 className="title"> Search Zip Code </h1>

            <div className="container-input">
                <input type="text"
                    placeholder="Inset your zipcode here!"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button className="button-search" onClick={handleSearch}>
                    <FiSearch size={25} color="black" />
                </button>

            </div>

            { // Condition bring the info if has data //
                Object.keys(zipCode).length > 0 && (

                    <main className="main">
                        <h2>ZIPCODE: {zipCode.cep}</h2>
                        <span>Adress: {zipCode.logradouro}</span>
                        <span>Complement: {zipCode.complemento}</span>
                        <span>City: {zipCode.localidade}-{zipCode.uf}</span>
                    </main>

                )}
        </div>
    )
}