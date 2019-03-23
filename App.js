import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry'
import {Provider} from 'react-redux'
import reducer from './redux/reducers'
import {createStore} from 'redux'
import History from './components/History'
import { createBottomTabNavigator, createAppContainer, TabNavigator } from 'react-navigation'
import {createMaterialTopTabNavigator } from "react-navigation";
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import IconWithBadge from "./components/IconWithBadge";
import {Constants} from 'expo'



function UddaciStatusBar({ backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent  backgroundColor={backgroundColor} {...props} />

        </View>
    )
}

const Tabs = createMaterialTopTabNavigator (
    {
        History: History,
        AddEntry: AddEntry,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                let os = Platform.OS === 'ios' ? 'ios' : 'md';
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                if (routeName === 'History') {

                    iconName =   `${os}-bookmark`;
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                    //IconComponent = HomeIconWithBadge;
                } else if (routeName === 'AddEntry') {
                    iconName =   `${os}-add-circle${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            style: {
                height: 77,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowRadius: 6,
                shadowOpacity: 1,
            },
        },
    }
);

const TabsContainer = createAppContainer(Tabs)

const HomeIconWithBadge = (props) => {
    // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={9} />;
}
export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <UddaciStatusBar backgroundColor={purple} barStyle="default" />
                    <TabsContainer />
                </View>
            </Provider>
        )
    }
}