import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet} from 'react-native';

class Navbar extends React.Component{
    render(){
        return(
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>ReACH</Text>
            </View>
        );
    
    }
}
const styles = StyleSheet.create({
    viewStyle:{
        justifyContent:'center',
        height:80,
        backgroundColor:'#494848'
    },
    textStyle:{
        color:'orange',
        marginLeft:10,
        fontSize:40
    }
  });
export default Navbar;