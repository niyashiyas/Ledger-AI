"use client"
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useRouter } from 'next/router';
import {supabase }from "../../components/supabse/supabase"




const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
});

const PdfDocument = ({ formData }) => (

  
  <Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <Text  style={styles.title}>Invoice</Text>
      <View style={styles.table}>
        {Object.entries(formData).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.header}>{key}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  </Page>
</Document>

);



const PdfPage = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('formdata')
          .select('*')
          .limit(1); // Limit to one row

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setFormData(data[0]); // Assuming you want the first row
          console.log(formData)
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);

  

  return (
    <div style={{ height: '100vh' }}>
      {/* Rendering the PDF with formData */}
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        {formData && <PdfDocument formData={formData} />}
      </PDFViewer>
    </div>
  );
};

export default PdfPage;