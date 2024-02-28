import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

function ProductRan() {
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true); // Set isSearching to true when search starts
    try {
      const response = await fetch('http://localhost:8080/api/v1/public/randomproducts/product/random');
      if (!response.ok) {
        throw new Error('Failed to fetch random product');
      }
      const data = await response.json();
      setSearchResult(data); // Assuming 'name' is the property of the product you want to display
      console.log(data);
    } catch (error) {
      console.error('Error fetching random product:', error);
      setSearchResult('Failed to fetch random product');
    } finally {
      setIsSearching(false); // Set isSearching to false when search completes (whether successful or not)
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center">
            Random Product Search
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search for Random Product"
            value={searchResult}
            disabled={isSearching} // Disable the TextField during search
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={isSearching} // Disable the search button during search
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductRan;
