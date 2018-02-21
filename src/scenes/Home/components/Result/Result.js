import React  from 'react';
import Button from "../../../../components/Button/Button";
import './Result.css';

export default (props) => {
    return (
        <div className="result centered-container page">
            <div className="centered-content">
                <h1 className="title">Du hast es geschafft!</h1>
                <p className="description">Hier ist dein Ergebnis:</p>
                <div className="result-container">
                    {
                        props.result.map(result => {
                            let frameworks = "";
                            result.map((framework, index) => {
                                frameworks += framework;
                                if (index < result.length - 1) {
                                    frameworks += " & ";
                                }
                                return frameworks;
                            });
                            return <div key={frameworks}>{frameworks}</div>
                        })
                    }
                </div>
                <div className="button-container">
                    <Button className="answer-button" onClick={props.back}>
                        Zurück
                    </Button>
                    <Button className="answer-button" onClick={props.restart}>
                        Neustart
                    </Button>
                </div>
            </div>
        </div>
    )
}