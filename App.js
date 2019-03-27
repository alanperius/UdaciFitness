import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import AddEntry from './components/AddEntry'
import {Provider} from 'react-redux'
import reducer from './redux/reducers'
import {createStore} from 'redux'
import History from './components/History'
import {createAppContainer, createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {purple, white} from './utils/colors'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import IconWithBadge from "./components/IconWithBadge";
import {Constants} from 'expo'
import EntryDetail from "./components/EntryDetail";
import Live from './components/Live'
import Images from './components/Images'

import {setLocalNotification} from "./utils/helpers";

function UddaciStatusBar({ backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent  backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = createAppContainer(createBottomTabNavigator(
    {
        History: History,
        AddEntry: AddEntry,
        Live: Live,
        Images: Images
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
                } else if(routeName === 'Live'){
                    iconName =   `${os}-speedometer`;
                }else if(routeName === 'Images'){
                    iconName =   `${os}-images`;
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
));

const HomeIconWithBadge = (props) => {
    // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={9} />;
}


const MainNavigator = createAppContainer(createStackNavigator({
    home: {
        screen: Tabs,
        navigationOptions: {
            header: null,
        },
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
        }),
    }
}));

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <UddaciStatusBar backgroundColor={purple} barStyle="default" />
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}