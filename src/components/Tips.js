import React from 'react';
import { Text, View } from 'react-native';
//import { Card } from 'react-bootstrap';

export default class Tips extends React.Component {
    render() {
        let tips = this.props.tips;
        let pistas = tips.map((tip, index) => {
            return (
                <Text key={index} style={{ color: "brown" }}>{tip}</Text>
            )
        });
        return (
            <View>{pistas}</View>
        )
    }
}