import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
//씨발 좆같은 React.StrictMode 하지마라 존나 버그 나오니까.
root.render(<App />);
