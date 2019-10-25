import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

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

export default class Home extends React.Component {
    render() {
        return (
            <View style={{ marginVertical: 150, flex: 1, alignItems: "center", justifyContent: "space-around" }}>
                <View style={{ flex: 1, fontSize: 15 }}><Text style={{ color: "red" }}>Welcome to my quiz</Text></View>
                <View style={{ flex: 1 }}><TouchableHighlight style={styles.button} onPress={
                    () => {
                        this.props.navigation.navigate("App");
                    }
                }><Text style={styles.text}>Go to quiz</Text></TouchableHighlight></View>
            </View>
        )
    }
}