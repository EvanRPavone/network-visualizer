// src/components/AddNodeForm.js

import React, { useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddNodeForm = ({ onAddNode }) => {
  const [label, setLabel] = useState('');
  const [ip, setIp] = useState('');
  const [vulnerabilityLevel, setVulnerabilityLevel] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNode = { label, ip, vulnerabilityLevel };
    onAddNode(newNode);
    setLabel('');
    setIp('');
    setVulnerabilityLevel('Low');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />
      <TextField
        label="IP Address"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        required
      />
      <FormControl>
        <InputLabel>Vulnerability Level</InputLabel>
        <Select
          value={vulnerabilityLevel}
          onChange={(e) => setVulnerabilityLevel(e.target.value)}
          label="Vulnerability Level"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">Add Node</Button>
    </Box>
  );
};

export default AddNodeForm;
