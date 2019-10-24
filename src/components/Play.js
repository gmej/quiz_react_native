import React from 'react';
//import '../assets/style/App.css';
import View from 'react-native';
import Game from './Game';
import ButtonReset from './ButtonReset';
import { questionAnswer, submit, changeQuestion, timerRefresh, fetchDataFromServer, reset } from '../redux/actions';


export default class Play extends React.Component {
  constructor(props) {
    super(props);
    this.onTimeCountChange = this.onTimeCountChange.bind(this);
  }

  startGame() {
    this.props.dispatch(fetchDataFromServer());

    this.interval = setInterval(() => {
      this.props.dispatch(timerRefresh(this.props.timeLeft));
    }, 1000);

    this.timeout = setInterval(() => {
      this.props.dispatch(submit(this.props.questions));
    }, this.props.timeLeft * 1000);

  }

  componentDidMount() {
    this.startGame();
  }

  componentDidUpdate() {
    if (this.props.isResetting) {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.startGame();
    }

  }
  onTimeCountChange() {
    if (this.props.timeLeft <= 0) {
      this.props.dispatch(submit(this.props.questions));
      this.props.dispatch(timerRefresh(this.props.timeLeft));
    } else {
      this.props.dispatch(timerRefresh(this.props.timeLeft));
    }
  }

  render() {
    if (this.props.fetchError != null) {
      return (
        <div>error: {this.props.fetchError}</div>
      );
    } else if (this.props.fetching) {
      return (
        <div>Wait for server response...</div>
      );
    } else if (this.props.questions.length <= 0) {
      return (
        <div> Ninguna pregunta en el servidor!</div>
      )
    } else if (!this.props.finished) {
      return (
        <div className="container" >
          <Game question={this.props.questions[this.props.currentQuestion]}
            appTextChange={(text) => {
              this.props.dispatch(questionAnswer(this.props.currentQuestion, text));
            }}
            onQuestionAnswer={(answer) => {
              this.props.dispatch(questionAnswer(this.props.currentQuestion, answer))
            }}
            onSubmitPress={() => {
              this.props.dispatch(submit(this.props.questions));
            }}
            changeQuestion={(index) => {
              this.props.dispatch(changeQuestion(index));
            }}
            firstQuestion={this.props.currentQuestion === 0}
            lastQuestion={this.props.currentQuestion === this.props.questions.length - 1}
            onTimeCountChange={this.onTimeCountChange}
            timeLeft={this.props.timeLeft}
            finished={this.props.finished}
            availableQuestions={this.props.availableQuestions}
            currentQuestion={this.props.currentQuestion}
          />
          <div>Current Question: {this.props.currentQuestion + 1}</div>
          <div>Time left: {this.props.timeLeft}</div>
          <div>
            <ButtonReset
              onReset={() => {
                this.props.dispatch(reset());
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container" >
          score:{this.props.score} <br />

          <ButtonReset
            onReset={() => {
              this.props.dispatch(reset());
            }}
          />
        </div>
      )
    }
  }
}
