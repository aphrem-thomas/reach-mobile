import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import UserLabel from './UserLabel.js';
import { Router, Scene, Stack } from 'react-native-router-flux';
class UserPage extends React.Component {
    // clickHandle1(){
    //     Actions.refugeesecondpage();
    // }
    render() {
        return (
            <View >
               <Button title="Medical Record"/>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 100,
        borderWidth: 2,
        borderColor: "#000",
    },
    inputStyle: {
        height: 50,
        width: 150,
        borderWidth: 1,
        borderColor: '#007aff',
        borderRadius: 10,
        backgroundColor: '#FFF',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5

    },
    textStyle: {
        color: "#000",
        paddingLeft: 5,
        paddingRight: 5
    }

});
function mapStateToProps(state, ownProps) {
    return ({
        refugee: state.RefugeeDetails
    });
}
export default connect(mapStateToProps)(UserPage);