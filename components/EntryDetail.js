import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux'
import MetricCard from "./MetricCard";
import {white} from "../utils/colors";
import {addEntry} from "../redux/actions";
import {getDailyReminderValue, timeToString,} from "../utils/helpers";
import {removeEntry} from "../utils/api";
import TextButton from './TextButton'


class EntryDetail extends Component {
    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params

        const year = entryId.slice(0,4)
        const month = entryId.slice(5,7)
        const day = entryId.slice(8)
        return {
            title: `${day}/${month}/${year}`
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    reset = () => {
        const {remove, goBack, entryId} = this.props
        remove()
        goBack()
        removeEntry(entryId)

    }

    render() {
        const {entryId, metrics} = this.props;

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} date={entryId}/>
                <TextButton onPress={this.reset} style={{margin: 20}}>
                    Reset
                </TextButton>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
})

function mapStateToProps (state, {navigation}) {
    const {entryId} = navigation.state.params
    return {
        entryId,
        metrics: state[entryId]
    }
}

function mapDispatchToProps (dispatch, {navigation}) {
    const {entryId} = navigation.state.params

    return {
        remove: () => dispatch(addEntry({
          [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        })),
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)