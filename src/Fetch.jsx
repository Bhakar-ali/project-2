import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Collapse } from 'react-bootstrap';
import { type } from '@testing-library/user-event/dist/type';
import 'bootstrap/dist/css/bootstrap.min.css';

const padng={
    padding:'3px'
}


function Fetch() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/public/randomusers?page=${page}&limit=10`);
            setData(response.data.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container'>
            <div className='mt-3'>
                <h3>Fetch Data from Api in React with Axios</h3>
                {/* <Table striped bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => {
                            const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.location.city}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table> */}
                <table border="1" style={{borderCollapse: "collapse",  padding:"2px"}} >
    <thead>
        <tr style={{backgroundColor:"blue"}}>
            <th className={padng} >ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
        </tr>
    </thead>
    <tbody>
        {data.map((user, index) => {
            const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.location.city}</td>
                </tr>
            );
        })}
    </tbody>
</table>

                <Pagination>
                    <Pagination.Prev
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Next onClick={() => setCurrentPage((prev) => prev + 1)} />
                </Pagination>
            </div>
        </div>
    );
}

export default Fetch;
