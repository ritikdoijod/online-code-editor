import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./components/Authentication";
import SignUp from "./components/SignUp"
import { AuthContext } from "./contexts/auth";
import { useContext } from "react";
import Editor from './components/Editor';

function App() {
    const { isLoggedIn, userId, token } = useContext(AuthContext);

    const routes = isLoggedIn ? (
        <>
            <Route path="/" exact element={<Home />} />
            <Route path="/user/profile/" element={<SignUp />} />
        </>
    ) : (
        <>
            <Route path="/" exact element={<Home />} />
            {/* <Route path="/authentication" exact element={<Authentication />} /> */}
            <Route path='/editor' exact element={<Editor />} /> 
        </>
    );

    return (
        <div className="App">
            <Routes>
                {routes}
            </Routes>
        </div>
    );
}

export default App;
