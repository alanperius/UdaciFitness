import React from 'react';
import {View, Slider, Text, Platform, StyleSheet} from 'react-native';
import {purple, white} from "../utils/colors";

export default function UdaciSlider ({max, unit, step, value, onChange}){
        return (
            <View style={styles.row}>
                <Slider
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={0}
                onValueChange={onChange}
                style={styles.slider}
                />
                <View style={styles.metricCounter}>
                    <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                    <Text style={{fontSize: 18, color: 'gray'}}>{unit}</Text>
                </View>
            </View>
        );

}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    slider: {
        flex: 1,
    },
    metricCounter:{
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },
})