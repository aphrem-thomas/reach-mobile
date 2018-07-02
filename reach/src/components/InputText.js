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
                <TextInput onChangeText={this.props.onChangeText} secureTextEntry={this.props.secureTextEntry}
                    underlineColorAndroid ='transparent'
                    style={styles.inputStyle} 
                    placeholder={this.props.value}/>
            </View>
        );
    
    }
}

const styles = StyleSheet.create({
    viewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        alignSelf:'stretch',

    },
    inputStyle:{
        height:50,
        width:150,
        borderWidth:1,
        borderColor:'#007aff',
        borderRadius:10,
        backgroundColor:'#FFF',
        color:'#000',
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:5
        
    },
    textStyle:{
        color:"#f8a557",
        paddingLeft:5,
        paddingRight:5
    }

  });

export default PhysicianSignIn;