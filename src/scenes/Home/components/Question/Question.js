import React  from 'react';
import Button from "../../../../components/Button/Button";
import './Question.css';

export default (props) => {
    return (
        <div className="question centered-container">
            <div className="centered-content">
                <div className="question-index">
                    {
                        props.index !== 1 ?
                            <i onClick={props.back} className="nav fas fa-angle-left"/>
                            : null
                    }
                    <div>Frage {props.index} von {props.maxIndex}</div>
                    <i onClick={props.next} className="nav fas fa-angle-right"/>
                </div>
                <h1 className="title">{props.title}</h1>
                <p className="description">{props.description}</p>
                <div className="button-container">
                    {
                        props.answers.map(answer => {
                            let classes = "answer-button";
                            if (props.givenAnswer && props.givenAnswer === answer.title) {
                                classes += " active"
                            }
                            return (
                                <Button className={classes} key={answer.title} onClick={() => {props.answer(answer.title, answer.ratings)}}>
                                    {answer.title}
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
