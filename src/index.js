import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import KiwiApp from './KiwiApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<KiwiApp />, document.getElementById('root'));
registerServiceWorker();
