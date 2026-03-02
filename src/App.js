import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import router from './components/router.js';
import { RouterProvider } from 'react-router';

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}>
        </RouterProvider>
    </div>
  );
}

export default App;
