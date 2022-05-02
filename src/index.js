import React, {useContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import { MyAuth0Provider } from './components/login/MyAuth0Provider';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MyAuth0Provider><App tab="home" /></MyAuth0Provider>)
