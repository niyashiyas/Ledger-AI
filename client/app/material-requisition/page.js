"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createClient } from '@supabase/supabase-js'


export default function MRDform() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [formData, setFormData] = useState({
    quantity: '10',
    description: 'hi',
    codenumber: '1',
    bincardno: '1',
    storeledgerfolio: '1',
    rate: '1.00',
    amount: '1.00',
    formid: '1'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  async function handleSubmit() {
    // Handle form submission, you can access form data from formData state
    try {
      const { error } = await supabase
        .from('formdata')
        .insert(formData)
      console.log(formData)

    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className='bg-white h-screen text-black flex flex-col justify-center items-center'>
      <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className='flex flex-col'>
          <TextField
              required
              id="formid"
              label="formid"
              value={formData.formid}
              onChange={handleChange}
            />
            <TextField
              required
              id="quantity"
              label="Quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <TextField
              required
              id="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              required
              id="codenumber"
              label="Code Number"
              value={formData.codenumber}
              onChange={handleChange}
            />
            <TextField
              required
              id="bincardno"
              label="Bin Card No"
              value={formData.bincardno}
              onChange={handleChange}
            />
            <TextField
              required
              id="storeledgerfolio"
              label="Store Ledger Folio"
              value={formData.storeledgerfolio}
              onChange={handleChange}
            />
            <TextField
              required
              id="rate"
              label="Rate"
              value={formData.rate}
              onChange={handleChange}
            />
            <TextField
              required
              id="amount"
              label="Amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleSubmit} >NEXT</Button>
          </div>
          {/* select authorizers */}
          {/* send to */}
        </Box>
      </div>
    </div>
  );
}

