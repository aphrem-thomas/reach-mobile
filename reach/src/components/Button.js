import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet, TouchableOpacity} from 'react-native';
import FrontPage from './FrontPage.js'

class Button extends React.Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} style={styles.buttonstyle}>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    
    }
}
const styles = StyleSheet.create({
    buttonstyle:{
        height:60,
        alignSelf:'stretch',
        backgroundColor:'#f8a557',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        marginTop:10,
        marginBottom:10,
        marginLeft:10,
        marginRight:10
    },
    textStyle:{
        color:'black',
        fontSize:20,
        padding:10,
    }
  });
export default Button;