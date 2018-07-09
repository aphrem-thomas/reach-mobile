import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { reachlogo } from './images/logoReach.jpg';
import { Font } from 'expo';

class ClickCard extends React.Component {

    
    render() {
        return (
            <View style={{
                height:this.props.height,
                width:this.props.width,
                backgroundColor:this.props.backgroundColor,
                marginLeft:4,
                marginRight:4,
                marginTop:2,
                marginBottom:2,
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 10
                },
                shadowRadius: 20,
                shadowOpacity: 1.0,
                elevation:10
        
        
            }}>
            <TouchableOpacity onPress={this.props.onPress} style={{flex:1}}>
                <View style={{flex:1, justifyContent:'center', alignItems:"center"}}>
                    {this.props.children}
                </View>
            </TouchableOpacity>
            </View>

        );

    }
}
const styles = StyleSheet.create(
  
);
export default ClickCard;