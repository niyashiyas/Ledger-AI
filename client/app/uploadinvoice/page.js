"use client"
import { useState } from 'react';
import { supabase } from "../../components/supabse/supabase";

export default function UploadInvoicePDF() {
    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(false); // State to track loading state
    const [generatedText, setGeneratedText] = useState(''); // State to store generated text from OpenAI

    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/pdf') {
            setPdf(file);
            await uploadInvoice(file);
            await fetchGeneratedText(); 
           // Fetch generated text after uploading invoice
        } else {
            alert('Please drop a PDF file.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const uploadInvoice = async (file) => {
        setLoading(true); // Set loading to true when starting upload
        try {
            const { data, error } = await supabase.storage.from('invoices').upload(file.name, file);
            if (error) {
                console.error('Error uploading invoice:', error.message);
            } else {
                console.log('Invoice uploaded successfully:', data);
            }
        } catch (error) {
            console.error('Error uploading invoice:', error.message);
        } finally {
            setLoading(false); // Set loading to false when upload completes
        }
    };

    const fetchGeneratedText = async () => {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    "model": "gpt-4-vision-preview",
                    "messages": [{
                        "role": "user",
                        "content": [{
                                "type": "text",
                                "text": "You are a financial accountant and need to extract the data from the given invoice (not from the example given in the text). Format the data as JSON file and should contain the fields shippedfrom, billedto, deliveredto, deliveryid, deliverydate, poid, duedate, quantity, productdescription, unitprice, amount, subtotal, and total. An example of the output format is as follows: {'shippedfrom': 'Location A', 'billedto': 'Customer X', 'deliveredto': 'Customer X', 'deliveryid': 1234, 'deliverydate': '2024-02-25', 'poid': 5678, 'duedate': '2024-03-10', 'quantity': 5, 'productdescription': 'Product A', 'unitprice': 10.00, 'amount': 50.00, 'subtotal': 100.00, 'total': 154.06}. Use the same field names as the example. Return only JSON format strictly."
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": "https://templates.invoicehome.com/delivery-note-template-us-classic-white-750px.png"
                                }
                            }
                        ]
                    }],
                    "max_tokens": 300
                })
            });
            
            if (!response.ok) {
                setGeneratedText(`Error fetching generated text: ${response.statusText}`);
            } else {
                const data = await response.json();
                if (data.choices[0].message.content) {
                    let jsonData = data.choices[0].message.content.replace(/^```json\s+|\s+```$/g, ''); // Remove leading and trailing ```json
                    jsonData = JSON.parse(jsonData); // Parse the JSON string into an object
                    console.log(jsonData);
                    setGeneratedText(jsonData)
                    await uploadInvoiceData(jsonData)
                    ; // Set the generated text state
                } else {
                    console.log('Generated text is null or empty');
                    setGeneratedText('Generated text is null or empty');
                }
            }
        } catch (error) {
            console.error('Error fetching generated text:', error.message);
            setGeneratedText('Error fetching generated text:', error.message);
        }
        console.log(generatedText);
        await uploadInvoiceData(generatedText)
    };

    const convertDate = (dateString) => {
        // Split the date string by '/'
        const parts = dateString.split('/');
        // Rearrange the parts and join them with '-' to form 'YYYY-MM-DD' format
        return parts[2] + '-' + parts[1] + '-' + parts[0];
    };
    
    const uploadInvoiceData = async (invoiceData) => {
        try {
            // Convert the date format before uploading
            const convertedDeliveryDate = convertDate(invoiceData.deliverydate);
            const convertedDueDate = convertDate(invoiceData.duedate);
    
            // Iterate over the items in the arrays and create a new row for each item
            for (let i = 0; i < invoiceData.amount.length; i++) {
                // Convert dates before creating the new item
                const newItem = {
                    shippedfrom: invoiceData.shippedfrom,
                    billedto: invoiceData.billedto,
                    deliveredto: invoiceData.deliveredto,
                    deliveryid: invoiceData.deliveryid,
                    deliverydate: convertedDeliveryDate,
                    poid: invoiceData.poid,
                    duedate: convertedDueDate,
                    quantity: invoiceData.quantity[i].item1, // Adjust according to the specific item
                    productdescription: invoiceData.productdescription[i].item1,
                    unitprice: invoiceData.unitprice[i].item1,
                    amount: invoiceData.amount[i].item1,
                    subtotal: invoiceData.subtotal,
                    total: invoiceData.total
                };
    
                // Insert the new row into the 'delivery_invoice' table
                const { data, error } = await supabase.from('delivery_invoice').insert(newItem);
    
                if (error) {
                    console.error('Error inserting data:', error.message);
                    // Handle the error if insertion fails
                } else {
                    console.log('Data inserted successfully:', data);
                    // Insertion succeeded
                }
            }
        } catch (error) {
            console.error('Error uploading invoice data:', error.message);
        }
    };
    


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div
                className="border-4 border-dashed border-gray-400 rounded-lg p-8"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {loading ? ( // Show loading message when loading is true
                    <p className="text-gray-500">Uploading PDF...</p>
                ) : pdf ? (
                    <div>
                        <p className="mb-4">PDF file selected: {pdf.name}</p>
                        <p className="text-sm text-gray-500">Drag and drop another PDF to replace it.</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Drag and drop a PDF file here, or click to select one.</p>
                )}
            </div>
        </div>
    )
}
