import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet, TouchableOpacity} from 'react-native';
import FrontPage from './FrontPage.js'

class Button extends React.Component{
    render(){
        return(
            <TouchableOpacity activeOpacity={this.props.disabled ? 1 : 0.7} disabled={this.props.disabled} onPress={this.props.onPress} style={styles.buttonstyle}>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    
    }
}
const styles = StyleSheet.create({
    buttonstyle:{
        height:60,
        alignSelf:'stretch',
        backgroundColor:'#007aff',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:30,
        borderColor:'#007aff',
        marginTop:10,
        marginBottom:10,
        marginLeft:10,
        marginRight:10
    },
    textStyle:{
        color:'#fff',
        fontSize:20,
        padding:10,
    }
  });
export default Button;