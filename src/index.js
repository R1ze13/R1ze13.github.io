import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import todos from './todos';

ReactDOM.render(<App title="react-todo" initialData={ todos } />, document.getElementById('root'));
registerServiceWorker();
