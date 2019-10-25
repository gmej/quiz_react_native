import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, Text, StyleSheet } from 'react-native';
import Game from './Game';
import { questionAnswer, submit, changeQuestion, fetchDataFromServer, initQuestions } from '../redux/actions';

const STORAGE_KEY = "@P2_2019_IWEB:quiz";

let styles = StyleSheet.create({
  appStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 40,
    width: "100%",
  },
  upperBanner: {
    flex: 1,
    backgroundColor: "#AAAAAA",
    width: "100%",
    marginVertical: 0,
  },
  text: {
    fontSize: 40,
    textAlign: "center",
  },
  numberQuestion: {
    flex: 1,
    width: "100%",
    fontSize: 30,
    backgroundColor: "#0074D9",
  },
  game: {
    flex: 7,
    width: "100%",
  },
  score: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 40,
    width: "100%",
    fontSize: 20
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  startGame() {
    this.props.dispatch(fetchDataFromServer());

  }

  componentDidMount() {
    this.startGame();
  }

  async save(storage) {
    let questions = storage;
    try {
      questions = JSON.stringify(questions);
      await AsyncStorage.setItem(STORAGE_KEY, questions);
      alert("Questions saved!");
    } catch (error) {
      alert('Failed to save questions.');
      console.log('error STORAGE_SAVE:', error);
    }
    return;
  }

  async load() {
    try {
      console.log("load questions");
      let questions = await AsyncStorage.getItem(STORAGE_KEY);
      questions = JSON.parse(questions);
      if (questions === null) {
        alert("No hay preguntas guardadas!");
      } else {
        this.props.dispatch(initQuestions(questions));
        alert("Questions loaded!");
      }
    } catch (error) {
      alert('Failed to load questions.');
      console.log('error STORAGE_LOAD:', error);
    }
    return;
  }

  async remove() {
    try {
      await AsyncStorage.clear();
      alert('Questions cleared!');
    } catch (e) {
      alert('Failed to clear questions.')
      console.log('error STORAGE_REMOVE:', error);
    }
  }



  render() {
    if (this.props.fetchError != null) {
      return (
        <View style={styles.score}>
          <View><Text>error: {this.props.fetchError}</Text></View>
        </View>
      );
    } else if (this.props.fetching) {
      return (
        <View style={styles.score}>
          <View>
            <Text>Loading...</Text>
          </View>
        </View>
      );
    } else if (this.props.questions.length <= 0) {
      return (
        <View style={styles.score}>
          <View><Text> Ninguna pregunta en el servidor!</Text></View>
        </View>
      )
    } else if (!this.props.finished) {
      return (
        <View style={styles.appStyle}>
          <View style={styles.upperBanner}><Text style={styles.text}>QUIZ IWEB</Text></View>
          <View style={styles.numberQuestion}><Text style={styles.text}>Pregunta nº {this.props.currentQuestion + 1}</Text></View>
          <View style={styles.game}>
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
              finished={this.props.finished}
              availableQuestions={this.props.availableQuestions}
              currentQuestion={this.props.currentQuestion}
              onSaveQuestions={() => {
                this.save(this.props.questions);
              }}
              onLoadQuestions={() => {
                this.load();
              }}
              onRemoveQuestions={() => {
                this.remove();
              }}
              onGoBack={
                () => {
                  this.props.navigation.navigate("Home");
                }
              }
            />
          </View>
        </View>);
    } else {
      return (
        <View style={styles.score}><Text>
          score:{this.props.score}
        </Text></View>
      )
    }
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(App);
