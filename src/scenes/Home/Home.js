import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as Actions from "../../services/questions/actions";

import Question from './components/Question/Question';
import Result from "./components/Result/Result";

function mapStateToProps(state) {
    return {
        questions: state.questions,
        done: state.done
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

class Home extends Component {
    componentDidMount() {
        this.props.fetchQuestions();
    }

    stateDependentWidget() {
        if (this.props.done) {
            return <Result />;
        } else if (this.props.questions) {
            return <Question />;
        } else {
            return <span>Bitte warten...</span>;
        }
    }

    render() {
        return (
            <div className="home fullscreen page">
                {this.stateDependentWidget()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
