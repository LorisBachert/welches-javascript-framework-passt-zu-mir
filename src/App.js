import React, {Component} from 'react';
import './App.css';
import Home from "./scenes/Home/Home";

class App extends Component {


    render() {
        return (
            <div className="app fullscreen">
                <Home/>
            </div>
        );
    }
}

export default App;
