import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet, TouchableOpacity} from 'react-native';
import FrontPage from './FrontPage.js'

class Button extends React.Component{
    render(){
        return(
            <TouchableOpacity activeOpacity={this.props.disabled ? 1 : 0.7} disabled={this.props.disabled} onPress={this.props.onPress} style={{ 
                height:this.props.height,
                alignSelf:'stretch',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:this.props.background,
                borderRadius:5,
                marginTop:10,
                marginBottom:10,
                marginLeft:10,
                marginRight:10}}>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    
    }
}
const styles = StyleSheet.create({
    buttonstyle:{
       
       
    },
    textStyle:{
        color:'#fff',
        fontSize:20,
        padding:10,
        fontFamily:'roboto'
    }
  });
export default Button;