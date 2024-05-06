import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from "react";
import Template from './pages/Template';

const Home = lazy(() => import('./pages/Home'));
const Destination = lazy(() => import('./pages/Destination'));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Home />} />
          <Route path="destination/:uuid" element={<Destination />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
