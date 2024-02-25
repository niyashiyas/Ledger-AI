"use client"
import { useState } from 'react';
import { supabase } from './supabse/supabase';

const OpenAIComponent = () => {
    // set the prompt text and watch for changes
    const [prompt, setPrompt] = useState('');
    // Set the generated text and watch for changes
    const [generatedText, setGeneratedText] = useState('');

    // Send the prompt to the API and set the generated text

    const fetchGeneratedText = async () => {
        console.log(prompt);
        try {
            // fetch the generated text from the Next.js API server
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
                            "text": "You are a financial accountant and need to extract the data from the given invoice (not from the example given in the text). Format the data as JSON file and should contain the fields shippedfrom, billedto, deliveredto, deliveryid, deliverydate, poid, duedate, quantity, productdescription, unitprice, amount, subtotal, and total. An example of the output format is as follows: {'shippedfrom': 'Location A', 'billedto': 'Customer X', 'deliveredto': 'Customer X', 'deliveryid': 1234, 'deliverydate': '2024-02-25', 'poid': 5678, 'duedate': '2024-03-10', 'quantity': 5, 'productdescription': 'Product A', 'unitprice': 10.00, 'amount': 50.00, 'subtotal': 100.00, 'total': 154.06}. Use the same field names as the example. Return only JSON format strictly.",
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": "https://templates.invoicehome.com/delivery-note-template-us-classic-white-750px.png"
                            }
                        },
                        ]
                    }],
                    "max_tokens": 300
                }),
            });
            // if the response is not ok, throw an error
            if (!response.ok) {
                setGeneratedText(`Error fetching generated text: ${response.statusText}`);
            }
            // get the data from the response
            const data = await response.json();
            console.log(data.choices[0].message.content);
            try {
                if (data.choices[0].message.content) {
                    let jsonData = data.choices[0].message.content.replace(/^```json\s+|\s+```$/g, ''); // Remove leading and trailing ```json
                    console.log(jsonData);
                    jsonData = JSON.parse(jsonData); // Parse the JSON string into an object
                    console.log(jsonData);
                    // Removing unnecessary code before insertion into the table
                    // Insert the parsed JSON object into the 'delivery_order' table
                    // const {
                    //     error
                    // } = await supabase.from('delivery_invoice').insert(jsonData);

                    // if (error) {
                    //     // Handle the error if insertion fails
                    //     console.error('Error inserting data:', error.message);
                    //     return 'Error inserting data';
                    // } else {
                    //     // Insertion succeeded
                    //     return 'Data inserted successfully';
                    // }
                } else {
                    console.log('Generated text is null or empty');
                    return 'Generated text is null or empty';
                }
            } catch (error) {
                // Handle any parsing errors
                console.error('Error parsing JSON:', error);
                return 'Error parsing JSON';
            }
        } catch (error) {
            setGeneratedText('Error fetching generated text:', error.message);
        }
    };



    return (
        <div className="example bg-white text-black">
            <h2>Completion Example</h2>
            <div className="prompt">
                <div>
                    <label htmlFor="prompt">Prompt:</label>
                    <input
                        type="text"
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
                <button onClick={fetchGeneratedText}>Generate Text</button>
            </div>
            <div className="response text-black">
                <h3>Generated Text:</h3>
                <p>{generatedText}</p>
            </div>
        </div>
    );
};

export default OpenAIComponent;