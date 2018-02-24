import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as NavigationActions from "../../../../services/navigation/actions";
import * as ResultActions from "../../../../services/result/actions";

import Button from "../../../../components/Button/Button";
import './Result.css';

function mapStateToProps(state) {
    return {
        frameworks: state.frameworks,
        questions: state.questions,
        answers: state.answers
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...NavigationActions,
        ...ResultActions
    }, dispatch);
}

class Result extends Component  {

    constructor(props) {
        super(props);
        this.aggregateMaximums = this.aggregateMaximums.bind(this);
        this.aggregateResult = this.aggregateResult.bind(this);
    }

    /**
     * Sum the highest rating possible for each framework.
     * @returns {Array}
     */
    aggregateMaximums() {
        let result = [];
        // For each question
        this.props.questions.forEach(question => {
            let factor = question.factor;
            let highestForQuestion = [];
            console.log("calculating highest rating for question", question);
            // for each answer of the question
            question.answers.forEach(answer => {
                let ratings = answer.ratings;
                console.log("checking ratings for answer", answer);
                // for each rating of the answer
                ratings.forEach((ratingForFramework, index) => {
                    // check if the rating for this answer is higher than the previous ones
                    let currentlyHigh = highestForQuestion[index];
                    let ratingWithFactor = ratingForFramework * factor;
                    console.log("currently highest rating", currentlyHigh);
                    console.log("found rating ", ratingWithFactor, "");
                    if (! currentlyHigh || currentlyHigh < ratingWithFactor) {
                        highestForQuestion[index] = ratingWithFactor;
                    }
                });
            });
            console.log("highest ratings are", highestForQuestion);
            // add the highest rating to the result
            highestForQuestion.forEach((hightestRating, index) => {
                if (! result[index]) {
                    result[index] = 0;
                }
                result[index] = result[index] + hightestRating;
            });
        });
        return result;
    }

    aggregateResult() {
        let highestRating = this.aggregateMaximums();
        let result = [];
        Object.keys(this.props.answers).forEach(keyIndex => {
            let answer = this.props.answers[keyIndex];
            let ratings = answer.ratings;
            let factor = this.props.questions[keyIndex].factor;
            ratings.forEach((currentRating, index) => {
                let ratingWithFactor = currentRating * factor;
                if (!result[index]) {
                    result[index] = 0;
                }
                result[index] = result[index] + ratingWithFactor;
            });
        });
        console.log("Highest possible ratings", highestRating);
        console.log("Result", result);
        let percentages = [];

    }

    render() {
        let result = this.aggregateResult();
        console.log(result);
        return (
            <div className="result centered-container page">
                <div className="centered-content">
                    <h1 className="title">Du hast es geschafft!</h1>
                    <p className="description">Hier ist dein Ergebnis:</p>
                    <div className="result-container">
                        {
                            // props.result.map(result => {
                            //     let frameworks = "";
                            //     result.map((framework, index) => {
                            //         frameworks += framework;
                            //         if (index < result.length - 1) {
                            //             frameworks += " & ";
                            //         }
                            //         return frameworks;
                            //     });
                            //     return <div key={frameworks}>{frameworks}</div>
                            // })
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

export default connect(mapStateToProps, mapDispatchToProps)(Result);