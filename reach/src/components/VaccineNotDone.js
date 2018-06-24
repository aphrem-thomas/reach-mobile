import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
import doctorphoto from './images/doctor.jpg';
class VaccineNotDone extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.userinfovertical}>
                    <View style={styles.userinfohorizontal}>
                        <Text>Vaccine name : </Text>
                        <Text style={styles.textStyle}>{this.props.name}</Text>
                    </View>
                </View>
                <Button title="Done" onPress={this.onPress.bind(this)}/>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        height:50,
        flexDirection: 'column',
        backgroundColor: '#f72011',
        alignItems: 'center'
    },
    
    userinfovertical:{
        flexDirection:'column',
        flex:4,
        paddingLeft:15
    },
    userinfohorizontal:{
        flexDirection:'row',
    },
    
    textStyle:{
        color:"#000",
        paddingLeft:5,
        paddingRight:5
    }



});

function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
    })
}
export default connect(mapStateToProps)(VaccineNotDone);