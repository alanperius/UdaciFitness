import React, {Component} from 'react'
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {getDailyReminderValue, getMetricMetaInfo, timeToString, clearLocalNotification, setLocalNotification} from "../utils/helpers";
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import {removeEntry, submitEntry} from "../utils/api";
import {connect} from 'react-redux'
import {addEntry} from "../redux/actions";
import {pink, purple, white} from "../utils/colors";
import {NavigationActions} from "react-navigation";



function SubmitBtn({onPress}) {

    return (
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                          onPress={onPress}>
            <Text style={styles.submitBtnText}> Submit </Text>
        </TouchableOpacity>
    )

}

function ResetBtn({onPress}) {

    return (
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.resetBtn : styles.resetBtn}
                          onPress={onPress}>
            <Text style={styles.submitBtnText}> Reset </Text>
        </TouchableOpacity>
    )

}

class AddEntry extends Component {

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    };

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] + step;

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    };

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step;

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    };

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    };

    submit = () => {
        const key = timeToString();
        const entry = this.state;
        this.props.dispatch(addEntry({
            [key]: entry
        }));

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }));

        this.toHome();
        submitEntry({key, entry})

        clearLocalNotification().then(setLocalNotification)

    };

    reset = () => {
        const key = timeToString();

        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }));

        removeEntry(key)

    };

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry'
        }))
    };

    render() {
        const metaInfo = getMetricMetaInfo();
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
                        size={100}/>
                    <Text> You already logged your information for Today.</Text>

                    <ResetBtn onPress={this.reset}/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {/*
                <Text> {JSON.stringify(this.state)} </Text>
*/}
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}

                            {type === 'slider' ?
                                <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                : <UdaciSteppers
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />
                            }
                        </View>
                    )

                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    row: {
        flexDirection: 'row',

    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        textAlign: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },

    resetBtn: {
        backgroundColor: pink,
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    }
});

function mapStateToProps(state) {
    const key = timeToString();

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }

}

export default connect(mapStateToProps)(AddEntry)