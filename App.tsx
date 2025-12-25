import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Downloads from './pages/Downloads';
import Info from './pages/Info';
import { Language, Theme } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ru');
  const [theme, setTheme] = useState<Theme>('dark');

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout 
              lang={lang} 
              setLang={setLang} 
              theme={theme} 
              setTheme={setTheme} 
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;