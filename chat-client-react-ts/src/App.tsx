// import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'

// import Auth from './screens/Auth/Auth';

// import './App.css';
// import ChatPage from './screens/Chat/Chat';
// import UsersList from './screens/UserLists/UserLists';

// const App = () => {
//     const handleSubmit = (values: any) => {
//         console.log(values);
//     };

//     return (
//         <Router>
//             <Routes>
//                 <Route path='/' element={<Navigate to='/auth' />} />
//                 <Route path='/auth' element={<Auth onSubmit={handleSubmit} />} />
//                 {/* <Route path="/chat/dialogs" element={<ChatPage />} /> */}
//                 <Route path="/chat/dialogs" element={<UsersList />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;

import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './routes/routes';

const App = () => {

  return (
    <Router>
      <Routers />
    </Router>
  );
};

export default App;
