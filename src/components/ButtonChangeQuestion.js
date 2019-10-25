import React from 'react';
import {StyleSheet, TouchableHighlight, Text } from 'react-native';

let styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF4136",
        borderWidth: 1,
        borderRadius: 25
    },
    text: {
        color: "white",
        fontSize: 12,
        margin: 8
    }
});

export default class ButtonChangeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        this.props.changeQuestion(this.props.targetQuestionId);
    }

    render() {
        return (
            <TouchableHighlight style={styles.button} disabled={this.props.disable} onPress={this.click}>
                <Text style={styles.text}>{this.props.direction}</Text>
            </TouchableHighlight>
        );
    }
}