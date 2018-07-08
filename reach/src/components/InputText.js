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
                {/* <Text style={styles.textStyle}>{this.props.label}</Text> */}
                <TextInput onChangeText={this.props.onChangeText} secureTextEntry={this.props.secureTextEntry}
                    underlineColorAndroid ='orange' multiline={true} borderBottomColor="orange"
                    style={styles.inputStyle} 
                    placeholder={this.props.label}/>
            </View>
        );
    
    }
}

const styles = StyleSheet.create({
    viewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
        alignSelf:'stretch',

    },
    inputStyle:{
        height:60,
        width:250,
        fontSize:25,
        color:'#FFF',
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