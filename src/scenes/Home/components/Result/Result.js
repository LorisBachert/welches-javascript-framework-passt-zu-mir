import React, { Component } from 'react';
import Button from "../../../../components/Button/Button";
import './Result.css';

class Result extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="result centered-container page">
                <div className="centered-content">
                    <h1 className="title">Du hast es geschafft!</h1>
                    <p className="description">Hier ist dein Ergebnis:</p>
                    <div className="result-container">
                        {
                            this.props.result.map(framework =>
                                <div key={framework}>{framework}</div>
                            )
                        }
                    </div>
                    <div className="button-container">
                        <Button className="answer-button" onClick={this.props.back}>
                            Zurück
                        </Button>
                        <Button className="answer-button" onClick={this.props.restart}>
                            Neustart
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Result;