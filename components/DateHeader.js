import React from 'react';
import {View, Slider, Text, Platform, StyleSheet} from 'react-native';
import {purple, white} from "../utils/colors";

export default function DateHeader({date}) {
    return (
        <Text style={{color: purple, fontSize: 25}}>
            {date}
        </Text>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        flexDirection: 'row',
    },
    row:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },

})