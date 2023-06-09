import './App.css';

import Nav from './components/Nav';
import {Routes, Route} from "react-router-dom";
import VotingRoom from './components/VotingRoom';
import VotersDisplay from './components/VotersDiplay.js';

function App() {
    return (
        <div className="App">
            <header className="container">
                <Nav className="mb-5 pb-5"/>
                <Routes>
                    <Route path="/"
                           element={< VotingRoom/>}
                    />
                </Routes>
                <VotersDisplay/>
            </header>
        </div>
    );
}

export default App;