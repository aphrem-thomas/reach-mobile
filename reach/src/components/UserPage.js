import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, TextInput, Image, Button, ScrollView} from 'react-native';
// import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import UserLabel from './UserLabel.js';
import { Router, Scene, Stack } from 'react-native-router-flux';
import UserOption from './UserOption.js';
import UserMedicalRecord from './UserMedicalRecord.js';

class UserPage extends React.Component {
    // clickHandle1(){
    //     Actions.refugeesecondpage();
    // }
    render() {
        return (
            <View style={{flex:1}}>
                <UserLabel />
                <View style={styles.tabbuttons}>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Button style={{ height: 30 }} title="Medical Record" />
                    </View>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Button style={{ height: 30 }} title="Vaccine Record" />
                    </View>
                </View>
                <View style={styles.tabbuttons}>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Button style={{ height: 30 }} title="Parents Record" />
                    </View>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Button style={{ height: 30 }} title="Children Record" />
                    </View>
                </View>
                <View style={{flex:1}}>
                <UserMedicalRecord/>
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    tabbuttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,

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