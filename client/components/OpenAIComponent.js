"use client"
import { useState } from 'react';

const OpenAIComponent = () => {
  // set the prompt text and watch for changes
  const [prompt, setPrompt] = useState('');
  // Set the generated text and watch for changes
  const [generatedText, setGeneratedText] = useState('');

  // Send the prompt to the API and set the generated text
  const fetchGeneratedText = async () => {
    console.log(prompt);
    try {
      console.log(JSON.stringify({ prompt }));
      // fetch the generated text from the Next.js API server
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          "model": "gpt-4-vision-preview",
          "messages": [
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": "Extract the list of items and their details from the given delivery order and list each sentence in a new line"
                },
                {
                  "type": "image_url",
                  "image_url": {
                    "url": "https://templates.invoicehome.com/delivery-note-template-us-classic-white-750px.png"
                  }
                }
              ]
            }
          ],
          "max_tokens": 300
        }),
      });
      // if the response is not ok, throw an error
      if (!response.ok) {
        setGeneratedText(`Error fetching generated text: ${response.statusText}`);
      }
      // get the data from the response
      const data = await response.json();
      console.log(data)
      console.log('aa')
      // if the data is not null, set the generated text
      if (data !== null) {
        setGeneratedText(data.choices[0].message.content);
        setPrompt('');
      }
      // if there is an error, set the generated text to the error message
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