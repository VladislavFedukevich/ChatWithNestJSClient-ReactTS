import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './routes/routes';
import { AuthHeader, AuthTitle } from './screens/Auth/styles';

const App = () => {

    return (
        <>
            <AuthHeader>
                <AuthTitle>Video and Audio Chat</AuthTitle>
            </AuthHeader>
            <Router>
                <Routers />
            </Router>
        </>

    );
};

export default App;
