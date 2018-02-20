import React, { Component } from 'react';
import Button from "../../../../components/Button/Button";
import './Question.css';

class Question extends Component {

    constructor(props) {
        super(props);
        this.answer = this.answer.bind(this);
    }

    answer(ratings) {
        this.props.answer(ratings);
    }

    render() {
        return (
            <div className="question centered-container">
                <div className="centered-content">
                    <div className="question-index">
                        {
                            this.props.index !== 1 ?
                                <i onClick={this.props.back} className="nav fas fa-angle-left"/>
                                : null
                        }
                        <div>Frage {this.props.index} von {this.props.maxIndex}</div>
                        <i onClick={this.props.next} className="nav fas fa-angle-right"/>
                    </div>
                    <h1 className="title">{this.props.title}</h1>
                    <p className="description">{this.props.description}</p>
                    <div className="button-container">
                        {
                            this.props.answers.map(answer => {
                                return (
                                    <Button className="answer-button" key={answer.title} onClick={() => {this.answer(answer.ratings)}}>
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
}

export default Question;