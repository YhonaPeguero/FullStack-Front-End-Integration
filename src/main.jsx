import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.css';

// Utiliza ReactDOM.render para montar tu aplicación con React 17
ReactDOM.render(
  // eslint-disable-next-line react/jsx-no-undef, no-undef
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
