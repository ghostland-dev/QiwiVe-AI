import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Home } from './pages/Home';
import { Builder } from './pages/Builder';
import { AppProvider } from './context/AppContext';
import './index.css';

function App() {
  // Désactiver Analytics en local ou dans Docker
  const shouldEnableAnalytics = process.env.VITE_ENABLE_VERCEL_ANALYTICS === 'true';
  
  return (
    <AppProvider>
      <BrowserRouter>
        {shouldEnableAnalytics && <Analytics />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
