"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import PagePdf from "../../components/pagepdf/PagePdf.js"

import { supabase } from "../../components/supabse/supabase";

export default function MRDform() {

  const [departmentInfo, setDepartmentInfo] = useState('');
  const [materialDescription, setMaterialDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [specification, setSpecification] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [total, setTotal] = useState('');
  const [preferredSupplier, setPreferredSupplier] = useState('');
  const [formid, setFormid] = useState('');
  const [showPdf, setShowPdf] = useState(true);

  // Update formData whenever any state changes
  const formData = {
    departmentInfo: departmentInfo,
    materialDescription: materialDescription,
    quantity: quantity,
    specification: specification,
    unitPrice: unitPrice,
    total: total,
    preferredSupplier: preferredSupplier,
    formid: formid,
  };

  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Update individual state based on the field
    switch (id) {
      case 'departmentInfo':
        setDepartmentInfo(value);
        break;
      case 'materialDescription':
        setMaterialDescription(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'specification':
        setSpecification(value);
        break;
      case 'unitPrice':
        setUnitPrice(value);
        break;
      case 'total':
        setTotal(value);
        break;
      case 'preferredSupplier':
        setPreferredSupplier(value);
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
        .from('mrd') // Adjust the table name as needed
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
              id="departmentInfo"
              label="Department Info"
              value={departmentInfo}
              onChange={(event) => { handleChange(event); }}
            />
            <TextField
              required
              id="materialDescription"
              label="Material Description"
              value={materialDescription}
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
              id="specification"
              label="Specification"
              value={specification}
              onChange={(event) => { handleChange(event); }}
            />
            <TextField
              required
              id="unitPrice"
              label="Unit Price"
              value={unitPrice}
              onChange={(event) => { handleChange(event); }}
            />
            <TextField
              required
              id="total"
              label="Total"
              value={total}
              onChange={(event) => { handleChange(event); }}
            />
            <TextField
              required
              id="preferredSupplier"
              label="Preferred Supplier"
              value={preferredSupplier}
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

