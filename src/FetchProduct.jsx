import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import axios from 'axios';

const FetchProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/public/randomproducts?page=${currentPage}&limit=5&inc=category%2Cprice%2Cthumbnail%2Cimages%2Ctitle%2Cid&query=mens-watches`);
      setProducts(response.data.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Product Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td><img src={product.thumbnail} alt={product.title} style={{width: '50px', height: '50px'}} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default FetchProduct;
