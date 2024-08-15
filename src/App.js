import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [...messages, userMessage],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-zhwagaTQ157oNjEUkhDJqOyWtdZoX42f9yWZWjU2XmT3BlbkFJ-rthVZ6giscDx8GHzYEplhSosSXZ9PgAnHI7B-p4IA`,
        }
      });

      console.log('API Response:', response.data); // Log the entire API response

      const botMessage = { role: 'assistant', content: response.data.choices[0].message.content };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error during API request:', error);
      alert('There was an issue with the chatbot. Please try again later.'); // Notify the user
    }

    setInput(''); // Clear the input field
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>AI Chatbot</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}: </strong>{msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleSend} style={{ padding: '10px' }}>Send</button>
    </div>
  );
}

export default App;
