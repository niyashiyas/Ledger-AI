"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import PagePdf from "../../components/pagepdf/PagePdf.js"

import { supabase } from "../../components/supabse/supabase";

export default function MRDform() {

  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [codenumber, setCodeNumber] = useState('');
  const [bincardno, setBincardno] = useState('');
  const [storeledgerfolio, setStoreledgerfolio] = useState('');
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState('');
  const [formid, setFormid] = useState('');
  const [showPdf, setShowPdf] = useState(false)

  // Update formData whenever any state changes
  const formData = {
    quantity: quantity,
    description: description,
    codenumber: codenumber,
    bincardno: bincardno,
    storeledgerfolio: storeledgerfolio,
    rate: rate,
    amount: amount,
    formid: formid,
  };

  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Update individual state based on the field
    switch (id) {
      case 'quantity':
        setQuantity(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'codenumber':
        setCodeNumber(value);
        break;
      case 'bincardno':
        setBincardno(value);
        break;
      case 'storeledgerfolio':
        setStoreledgerfolio(value);
        break;
      case 'rate':
        setRate(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'formid':
        setFormid(value);
        break;
      default:
        break;
    }
  };

  async function handleSubmit() {
    try {
      const { error } = await supabase
        .from('formdata')
        .insert([formData]);
      console.log(formData);
      setShowPdf(true)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='bg-white h-screen text-black flex flex-col justify-center items-center'>
      {showPdf &&
      <div className="h-[screen*0.8]">
        <PagePdf title={"Material Requisition"}/>
        <button className='p-2 flex flex-col justify-center border mx-auto  border-black rounded-md' onClick={()=> router.push('./purchase-order')}>Submit For Approval</button>
      </div>
      }
      {!showPdf &&
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
              value={formid}
              onChange={(event) => { handleChange(event); }}
            />
            <TextField
              required
              id="quantity"
              label="Quantity"
              value={quantity}
              onChange={(event) => { handleChange(event); }}
            />
            <TextField
              required
              id="description"
              label="Description"
              value={description}
              onChange={(event) => { handleChange(event); }}
              />
            <TextField
              required
              id="codenumber"
              label="Code Number"
              value={codenumber}
              onChange={(event) => { handleChange(event); }}
              />
            <TextField
              required
              id="bincardno"
              label="Bin Card No"
              value={bincardno}
              onChange={(event) => { handleChange(event); }}
              />
            <TextField
              required
              id="storeledgerfolio"
              label="Store Ledger Folio"
              value={storeledgerfolio}
              onChange={(event) => { handleChange(event); }}
              />
            <TextField
              required
              id="rate"
              label="Rate"
              value={rate}
              onChange={(event) => { handleChange(event); }}
              />
            <TextField
              required
              id="amount"
              label="Amount"
              value={amount}
              onChange={(event) => { handleChange(event); }}
              />
            <Button variant="contained" onClick={handleSubmit} >NEXT</Button>
          </div>
          {/* select authorizers */}
          {/* send to */}
        </Box>
      </div>
  }
    </div>
  );
}

