import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet,TextInput} from 'react-native';
import Button from './Button.js';
import {Actions} from 'react-native-router-flux';

class PhysicianSignIn extends React.Component{
    // clickHandle1(){
    //     Actions.refugeesecondpage();
    // }
    render(){
        return(
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>{this.props.label}</Text>
                <TextInput onChangeText={this.props.onChangeText}
                    underlineColorAndroid ='transparent'
                    style={styles.inputStyle} 
                    value={this.props.value}/>
            </View>
        );
    
    }
}

const styles = StyleSheet.create({
    viewStyle:{
        flexDirection:'row',
        backgroundColor:'#222',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    inputStyle:{
        height:50,
        width:150,
        borderWidth:1,
        borderColor:'#f8a557',
        borderRadius:10,
        backgroundColor:'#FFF',
        color:'#000',
        
    },
    textStyle:{
        color:"#FFF",
        paddingLeft:5,
        paddingRight:5
    }

  });

export default PhysicianSignIn;