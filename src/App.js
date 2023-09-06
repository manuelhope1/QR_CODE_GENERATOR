import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const Generate = async () => {
    if (input.length < 1) {
      setError('Input is empty. Please paste a URL or type text.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const encodedInput = encodeURIComponent(input);
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&color=blue&data=${encodedInput}`;

      const response = await fetch(qrImageUrl);

      if (response.ok) {
        setQrImageUrl(qrImageUrl);
      } else {
        setError('Failed to generate QR code.');
      }
    } catch (err) {
      setError('An error occurred while generating QR code.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div id="box">
      <h4 id="gen">QR CODE  GENERATOR</h4>
      <p>Kindly paste a url or type any text to generate your QR Code</p>
      <input
        id='input'
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter URL or Text"
        autoComplete='off'
      />
      <button onClick={Generate} disabled={isLoading} id="gene">
        {isLoading ? 'Loading⌛⌛..' : 'Generate QR Code'}
      </button>
      {error && <div className="error">{error}</div>}
      {qrImageUrl && (
        <div id="img-cont">
          <img src={qrImageUrl} alt="QR Code" id="qimg" />
        </div>
      )}

    </div>
  );
}

export default App;
