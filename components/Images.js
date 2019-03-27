import React, {Component} from 'react';
import {ImageEditor, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {pink, purple, white} from "../utils/colors";
import {ImagePicker} from 'expo'

class Images extends Component {
    state = {
        image: null,

    };

    pickImage = () => {
        ImagePicker.launchImageLibraryAsync({
            allowEditing: true,
            aspect: [2, 1]
        }).then((result) => {
            if (result.cancelled) {
                return
            }

            ImageEditor.cropImage(result.uri, {
                    offset: {x: 0, y: 0},
                    size: {width: result.width, height: result.height},
                    displaySize: {width: result.width, height: result.height},
                    resizeMode: 'contain'
                },
                (uri) => this.setState(() => ({image: uri})),
                () => console.log('Error ------- '))
        })
    };

    render() {
        const {image} = this.state;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pickImage}>
                    <Text>Galery</Text>
                </TouchableOpacity>

                {image && (
                    <Image style={styles.img} source={{uri: image}} />
                ) }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        flex: 1,
        aspectRatio: 1.5,
        resizeMode: 'contain',
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
export default Images