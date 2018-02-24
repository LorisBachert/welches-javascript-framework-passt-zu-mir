import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as AnswerActions from "../../../../services/answer/actions";
import * as NavigationActions from "../../../../services/navigation/actions";
import * as ResultActions from "../../../../services/result/actions";

import Button from "../../../../components/Button/Button";
import './Question.css';

function mapStateToProps(state) {
    return {
        questions: state.questions,
        answers: state.answers,
        index: state.index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...AnswerActions,
        ...NavigationActions,
        ...ResultActions
    }, dispatch);
}

class Question extends Component {

    doAnswer(answer) {
        if (this.props.index === this.props.questions.length - 1) {
            this.props.done();
        }
        this.props.answer(this.props.index, answer);
    }

    render() {
        if (!this.props.questions || this.props.questions.length === 0) {
            return <span>Bitte warten...</span>
        }

        let displayIndex = this.props.index + 1;
        let displayMaxIndex = this.props.questions.length;
        let currentQuestion = this.props.questions[this.props.index];

        return (
            <div className="question centered-container">
                <div className="centered-content">
                    <div className="question-index">
                        {
                            this.props.index !== 0 ?
                                <i onClick={this.props.back} className="nav fas fa-angle-left"/>
                                : null
                        }
                        <div>Frage {displayIndex} von {displayMaxIndex}</div>
                        {
                            this.props.index < this.props.questions.length - 1 ?
                                <i onClick={this.props.next} className="nav fas fa-angle-right"/>
                                : null
                        }
                    </div>
                    <h1 className="title">{currentQuestion.title}</h1>
                    <p className="description">{currentQuestion.description}</p>
                    <div>
                        { this.state && this.state.isExpanded ?
                            <div className="details details-toggle" onClick={() => this.setState({isExpanded: false})}>
                                Details verstecken
                                <i className="nav fas fa-angle-up"/>
                            </div> :
                            <div className="details details-toggle" onClick={() => this.setState({isExpanded: true})}>
                                Details anzeigen
                                <i className="nav fas fa-angle-down"/>
                            </div>
                        }
                        <div className={"question-details" + (this.state && this.state.isExpanded ? " expanded" : "")}>
                            {currentQuestion.details}
                        </div>
                    </div>
                    <div className="button-container">
                        {
                            currentQuestion.answers.map(answer => {
                                let classes = "answer-button";
                                if (this.props.answers[this.props.index] && this.props.answers[this.props.index].title === answer.title) {
                                    classes += " active"
                                }
                                return (
                                    <Button className={classes} key={answer.title} onClick={() => {
                                        this.doAnswer(answer)
                                    }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Question);


