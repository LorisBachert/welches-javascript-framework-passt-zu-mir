import React, {Component} from 'react';
import axios from 'axios';
import Question from './components/Question/Question';
import Result from "./components/Result/Result";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            index: 0,
            ratings: {}
        };
        this.answer = this.answer.bind(this);
        this.addRatings = this.addRatings.bind(this);
        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
        this.restart = this.restart.bind(this);
        this.aggregateResult = this.aggregateResult.bind(this);
    }

    componentDidMount() {
        axios.get("/data.json")
            .then(response => {
                this.setState(response.data);
            })
    }

    addRatings(ratings) {
        let newRatings = Object.assign({}, this.state.ratings);
        newRatings[this.state.index] = ratings;
        return newRatings;
    }

    answer(ratings) {
        if (this.state.index < this.state.questions.length - 1) {
            this.setState({
                index: this.state.index + 1,
                ratings: this.addRatings(ratings)
            });
        } else {
            this.setState({
                done: true
            });
        }
    }

    back() {
        this.setState({
            done: false,
            index: this.state.index - 1
        })
    }

    next() {
        this.setState({
            index: this.state.index + 1
        })
    }

    restart() {
        this.setState({
            index: 0,
            done: false
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
        result = Object
            .keys(result)
            .sort((a, b) => result[b] - result[a]);
        return result;
    }

    render() {
        if (this.state.done) {
            let result = this.aggregateResult();
            return <Result result={result} back={this.back} restart={this.restart}/>;
        } else if (this.state.questions) {
            return (
                <div className="home fullscreen page">
                    <Question {...this.state.questions[this.state.index]} answer={this.answer}
                              index={this.state.index + 1} maxIndex={this.state.questions.length}
                                next={this.next} back={this.back}/>
                </div>
            );
        } else {
            return <span>Es gab ein Fehler beim Laden der Daten.</span>;
        }
    }
}

export default Home;
