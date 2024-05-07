import './styles/Theme.module.scss';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

export default App;
