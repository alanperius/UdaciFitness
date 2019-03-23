import React from 'react'
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native'
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons'
import {blue, lightPurp, purple, white} from "../utils/colors";

export default function UdaciSteppers ({ max, unit, step, value, onIncrement, onDecrement }) {
    return (
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
            {Platform.OS === 'ios' ?
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onDecrement} style={[styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
                        <Entypo name='minus' size={30} color={'black'} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement} style={[styles.androidBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}>
                        <Entypo name='plus' size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
            :

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onDecrement} style={[styles.androidBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
                        <FontAwesome name='minus' size={30} color={white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement} style={[styles.androidBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}>
                        <FontAwesome name='plus' size={30} color={white} />
                    </TouchableOpacity>
                </View>
            }


            <View style={styles.metricCounter}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: 'gray'}}>{unit}</Text>
            </View>
        </View>
    )
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
    iosBtn:{
        backgroundColor: lightPurp,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    androidBtn:{
        backgroundColor: purple,
        borderRadius: 2,
        margin: 5,
        padding: 10,
        borderWidth: 1,

    },
    submitBtnText:{
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    metricCounter:{
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },

})