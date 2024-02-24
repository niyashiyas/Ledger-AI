import React from 'react';
import PdfPage from './PdfPage';

export default function DisplayPdf({ formData }) {
  return (
    <div>
      <PdfPage formData={formData} />
    </div>
  );
}