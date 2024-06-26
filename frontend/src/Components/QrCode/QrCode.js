import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import './QrCode.scss';

const QRCodeComponent = () => {
  const [url, setUrl] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch('/auth/getUser')
      .then(response => response.json())
      .then(data => {
        const userId = data.id;
        const generatedUrl = `https://app.ezwait.co/${userId}/customer`;
        setUrl(generatedUrl);

        // Generate the QR code
        if (canvasRef.current) {
          QRCode.toCanvas(canvasRef.current, generatedUrl, { width: 200 }, (error) => {
            if (error) console.error(error);
          });
        }
      })
      .catch(error => console.error('Error fetching user ID:', error));
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard');
    });
  };

  const handleDownloadClick = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = 'qr-code.png';
      link.click();
    }
  };

  return (
    <div className="qr-code-container">
      <canvas ref={canvasRef}></canvas>
      {url && (
        <div className="url-container">
          <p>URL: <span className="url">{url}</span></p>
          <button onClick={handleCopyClick}>Copy URL</button>
          <button onClick={handleDownloadClick}>Download QR Code</button>
        </div>
      )}
    </div>
  );
};

export default QRCodeComponent;
