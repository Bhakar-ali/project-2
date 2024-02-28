import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function JolesTable() {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        fetchJokes();
    }, []);

    const fetchJokes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/public/randomjokes?limit=10&query=science&inc=categories%2Cid%2Ccontent&page=1');
            if (!response.ok) {
                throw new Error('Failed to fetch jokes');
            }
            const data = await response.json();
            setJokes(data.data.data);
        } catch (error) {
            console.error('Error fetching jokes:', error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Categories</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jokes.map(joke => (
                        <TableRow key={joke.id}>
                            <TableCell>{joke.id}</TableCell>
                            <TableCell>{joke.content}</TableCell>
                            <TableCell>{joke.categories.join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default JolesTable;
