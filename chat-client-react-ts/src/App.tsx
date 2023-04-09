import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'

import Auth from './screens/Auth/Auth';

import './App.css';
import ChatPage from './screens/ChatPage/ChatPage';

const App = () => {
  const handleSubmit = (values: any) => {
    // здесь вы можете добавить логику обработки отправки формы
    console.log(values);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/auth' />} />
        <Route path='/auth' element={<Auth onSubmit={handleSubmit} />} />
        <Route path="/chatPage" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
