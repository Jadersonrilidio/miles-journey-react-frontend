import { Routes, Route } from 'react-router-dom';
import ExampleComponent from './components/ExampleComponent';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ExampleComponent />} />
    </Routes>
  );
}

export default AppRoutes;