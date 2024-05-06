import './styles/Theme.module.scss';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import { AuthProvider } from './common/context/Auth';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
