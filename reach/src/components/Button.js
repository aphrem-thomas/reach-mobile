import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet} from 'react-native';
import FrontPage from './FrontPage.js'

class Button extends React.Component{
    render(){
        return(
            <View style={styles.buttonstyle}>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </View>
        );
    
    }
}
const styles = StyleSheet.create({
    buttonstyle:{
        height:60,
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginTop:10,
        marginBottom:10,
    },
    textStyle:{
        color:'black',
        fontSize:20,
        padding:5,
    }
  });
export default Button;