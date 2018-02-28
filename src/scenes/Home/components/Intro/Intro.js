import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as NavigationActions from "../../../../services/navigation/actions";

import Button from "../../../../components/Button/Button";

function mapStateToProps(state) {
    return {
        index: state.index,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( NavigationActions, dispatch);
}

class Intro extends Component  {
    render() {
        return (
            <div className="result centered-container page">
                <div className="centered-content">
                    <h1 className="title">Welches JavaScript Framework passt zu mir?</h1>
                    <p className="description">Kaum eine Frage wird im Bereich der Webentwicklung so häufig gestellt wie die, welches Framework für welchen Anwendungsfall am besten geeignet ist. Dieser Fragebogen soll durch das Beantworten einiger einfacher Fragen eine <b>Orientierungshilfe</b> bei der Beantwortung dieser Frage liefern.</p>
                    <p className="description">Betrachtet werden die Frameworks React, Angular, Vue und Ember. Der aktuelle Stand dieses Fragebogen ist Februar 2018.</p>
                    <div className="button-container">
                        <Button className="answer-button" onClick={this.props.next}>
                            Los geht's
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);