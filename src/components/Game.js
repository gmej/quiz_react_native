import React from 'react';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import ButtonChangeQuestion from './ButtonChangeQuestion';
import Button from './Button';
import Tips from './Tips';


let styles = StyleSheet.create({
    gameStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 50,
        marginHorizontal: 15,
    },
    question: {
        flex: 1,
        fontSize: 20,

    },
    tips: {
        flex: 1,
        fontSize: 15,
    },
    input: {
        flex: 1,
        justifyContent: "center",
        fontSize: 40,
        width: "100%",
        height: 60,
        textAlign: "center",
        borderWidth: 3,
        borderColor: "#ffe0b2"
    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: 28,
        color: "pink",
    },

    imageView: {
        flex: 4,
        width: "100%",
        height: "100%",
        borderWidth: 2,
        borderColor: 'black'
    },
    image: {
        width: "100%",
        height: "100%",
    }
});

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmitPress = this.onSubmitPress.bind(this);
        this.changeQuestion = this.changeQuestion.bind(this);
        this.onSaveQuestions = this.onSaveQuestions.bind(this);
        this.onLoadQuestions = this.onLoadQuestions.bind(this);
        this.onRemoveQuestions = this.onRemoveQuestions.bind(this);
        this.onGoBack = this.onGoBack.bind(this);
    }

    onSubmitPress() {
        this.props.onSubmitPress();
    }

    changeQuestion(index) {

        this.props.changeQuestion(index);
    }

    onSaveQuestions() {
        this.props.onSaveQuestions();
    }

    onLoadQuestions() {
        this.props.onLoadQuestions();
    }

    onRemoveQuestions() {
        this.props.onRemoveQuestions();
    }

    onGoBack() {
        this.props.onGoBack();
    }

    render() {
        let questionImageUrl = null;
        try {
            questionImageUrl = this.props.question.attachment.url;
        } catch (e) {
            questionImageUrl = null;
        }
        console.log('questionImageUrl :', questionImageUrl);
        return (
            <View style={styles.gameStyle}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.question}>QUESTION: {this.props.question.question}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}><Tips tips={this.props.question.tips} /></View>
                {questionImageUrl != null &&
                    <View style={styles.imageView}><Image style={styles.image} source={{ uri: questionImageUrl }} /></View>
                }
                <View style={styles.input}>
                    <TextInput type="text"
                        placeholder="Type your answer here"
                        value={this.props.question.userAnswer || ""}
                        onChangeText={(text) => {
                            this.props.onQuestionAnswer(text);
                        }} />
                </View>
                <View style={styles.buttons}>
                    <Button onPress={this.onSubmitPress} text="Submit" />
                    <ButtonChangeQuestion
                        changeQuestion={this.changeQuestion}
                        direction={'Previous question'}
                        disable={this.props.firstQuestion}
                        targetQuestionId={this.props.currentQuestion - 1} />
                    <ButtonChangeQuestion
                        changeQuestion={this.changeQuestion}
                        direction={'Next question'}
                        disable={this.props.lastQuestion}
                        targetQuestionId={this.props.currentQuestion + 1} />
                </View>
                <View style={styles.buttons}>
                    <Button onPress={this.onGoBack} text="<<" />
                    <Button onPress={this.onSaveQuestions} text="Save Questions" />
                    <Button onPress={this.onLoadQuestions} text="Load Questions" />
                    <Button onPress={this.onRemoveQuestions} text="Remove Questions" />
                </View>

            </View>
        );
    }
}

