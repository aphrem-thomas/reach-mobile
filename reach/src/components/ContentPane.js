import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet} from 'react-native';
import FrontPage from './FrontPage.js'

class ContentPane extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <FrontPage/>
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
export default ContentPane;