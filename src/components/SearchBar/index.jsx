import React from 'react';
import './index.css';
import { TextField } from '@mui/material';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar">
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Search by name or specialization...'}
        size="small"
      />
    </div>
  );
};

export default SearchBar;
