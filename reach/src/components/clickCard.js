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
            
            <TouchableOpacity onPress={this.props.onPress} style={styles.viewStyle}>
                <View style={{flex:1, justifyContent:'center', alignItems:"center"}}>
                    {this.props.children}
                </View>
            </TouchableOpacity>
            

        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex:1,
        height:150,
        width:150,
        
        backgroundColor:'rgba(0,0,0,0.50)',
        borderRadius:5,
        marginLeft:4,
        marginRight:4,
        marginTop:2,
        marginBottom:2,
        justifyContent:'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0

    }
   


});
export default ClickCard;