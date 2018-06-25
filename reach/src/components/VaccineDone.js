import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
import doctorphoto from './images/doctor.jpg';
class VaccineDone extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.userinfovertical}>
                    <View style={styles.userinfohorizontal}>
                        <Text>Vaccine name : </Text>
                        <Text style={styles.textStyle}>{this.props.vaccine}</Text>
                    </View>
                    <View style={styles.userinfohorizontal}>
                        <Text>Date of Vaccination: </Text>
                        <Text style={styles.textStyle}>{this.props.date}</Text>
                    </View>
                    <View style={styles.userinfohorizontal}>
                        <Text>Location : </Text>
                        <Text style={styles.textStyle}>{this.props.location}</Text>
                    </View>
                </View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        height:65,
        width:300,
        flexDirection: 'column',
        backgroundColor: '#6bf442',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:5,
        borderColor:"#000"
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
export default connect(mapStateToProps)(VaccineDone);