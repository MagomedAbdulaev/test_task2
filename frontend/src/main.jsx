import './index.css';
import App from './App.jsx';
import {BrowserRouter} from "react-router-dom";
import ReactDOMClient from 'react-dom/client';
import './index.css';
import './reset.css';

const HostBackend = 'http://localhost:8000/';

const app = ReactDOMClient.createRoot(document.getElementById('root'));

app.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
)

export default HostBackend;