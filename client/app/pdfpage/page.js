import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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
        <Text style={styles.title}>Form Data</Text>
        {Object.entries(formData).map(([key, value]) => (
          <View key={key}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function PdfPage({ formData }) {
    return (
      <div style={{ height: '100vh' }}>
        
      </div>
    );
  }