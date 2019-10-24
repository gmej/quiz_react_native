import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';


let styles = StyleSheet.create({
    button: {
        backgroundColor: "#FF4136",
        borderWidth: 1,
        borderRadius: 30
    },
    text: {
        color: "white",
        fontSize: 12,
        margin: 10
    }
});

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableHighlight style={styles.button} onPress={this.onPress}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}