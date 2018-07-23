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
                        <Text style={styles.textStyle}>Vaccine name : </Text>
                        <Text style={styles.textStyle}>{this.props.vaccine}</Text>
                    </View>
                    <View style={styles.userinfohorizontal}>
                        <Text style={styles.textStyle}>Date of Vaccination: </Text>
                        <Text style={styles.textStyle}>{this.props.date}</Text>
                    </View>
                    <View style={styles.userinfohorizontal}>
                        <Text style={styles.textStyle}>Location : </Text>
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
        alignSelf:'stretch',
        flexDirection: 'column',
        backgroundColor: '#1e7519',
        alignItems: 'center',
        borderLeftWidth:10,
        borderColor:'#1e7519',
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        marginBottom:10,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation: 1,
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
        color:"#FFF",
        paddingLeft:5,
        paddingRight:5,
        fontFamily:'lato'
    }



});

function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
    })
}
export default connect(mapStateToProps)(VaccineDone);