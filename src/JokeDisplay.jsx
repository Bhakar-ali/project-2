import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function JokeDisplay() {
    const [joke, setJoke] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRandomJoke = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/public/randomjokes/joke/random');
                if (!response.ok) {
                    throw new Error('Failed to fetch joke');
                }
                const data = await response.json();
                console.log('Response data:', data); // Log response data to console
                setJoke(data.joke);
                setLoading(false);
            } catch (error) {
                setError('Error fetching joke: ' + error.message);
                setLoading(false);
            }
        };

        fetchRandomJoke();
    }, []);

    return (
        <div className="container">
            <h1>Random Joke</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Joke</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{joke}</td>
                        </tr>
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default JokeDisplay;
