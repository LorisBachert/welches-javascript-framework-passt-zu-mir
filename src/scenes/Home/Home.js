import React, {Component} from 'react';
import axios from 'axios';
import Question from './components/Question/Question';
import Result from "./components/Result/Result";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            index: 0,
            ratings: {},
            answers: {}
        };
        this.answer = this.answer.bind(this);
        this.addRatings = this.addRatings.bind(this);
        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
        this.restart = this.restart.bind(this);
        this.aggregateResult = this.aggregateResult.bind(this);
    }

    componentDidMount() {
        axios.get("data.json")
            .then(response => {
                this.setState(response.data);
            })
    }

    addRatings(ratings) {
        let newRatings = Object.assign({}, this.state.ratings);
        newRatings[this.state.index] = ratings;
        return newRatings;
    }

    answer(title, ratings) {
        let newState = {};
        if (title) {
            let newAnswers = this.state.answers;
            newAnswers[this.state.index] = title;
            newState.answers = newAnswers;
        }
        if (ratings) {
            newState.ratings = this.addRatings(ratings);
        }
        newState.index = this.state.index + 1;
        if (this.state.index >= this.state.questions.length - 1) {
            newState.done = true;
        }
        this.setState(newState);
    }

    back() {
        this.setState({
            done: false,
            index: this.state.index - 1
        })
    }

    next() {
        this.answer(null);
    }

    restart() {
        this.setState({
            index: 0,
            done: false,
            ratings: [],
            answers: {}
        })
    }

    aggregateResult() {
        let result = {};
        this.state.frameworks.forEach(framework => {
            result[framework] = 0;
        });
        Object.keys(this.state.ratings).forEach(key => {
            let rating = this.state.ratings[key];
            this.state.frameworks.forEach((framework, index) => {
                result[framework] = result[framework] + rating[index];
            })
        });
        let invertedResult = {};
        Object.keys(result).forEach(framework => {
            let rating = result[framework];
            if (invertedResult.hasOwnProperty(rating)) {
                invertedResult[rating].push(framework);
            } else {
                invertedResult[rating] = [ framework ];
            }
        });
        let orderedResult = Object.keys(invertedResult)
            .sort((a, b) => +a + +b)
            .map(key => invertedResult[key]);
        console.log(result, invertedResult, orderedResult);
        return orderedResult;
    }

    render() {
        if (this.state.done) {
            let result = this.aggregateResult();
            return <Result result={result} back={this.back} restart={this.restart}/>;
        } else if (this.state.questions) {
            let index = this.state.index;
            return (
                <div className="home fullscreen page">
                    <Question {...this.state.questions[index]} answer={this.answer}
                              givenAnswer={this.state.answers[index]}
                              index={index + 1} maxIndex={this.state.questions.length}
                                next={this.next} back={this.back}/>
                </div>
            );
        } else {
            return <span>Es gab ein Fehler beim Laden der Daten.</span>;
        }
    }
}

export default Home;
