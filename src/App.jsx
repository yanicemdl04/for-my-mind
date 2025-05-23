import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/accueil/HomePage';
import ChatbotPage from './pages/chatbot/ChatbotPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
    </Routes>
  );
};

export default App;