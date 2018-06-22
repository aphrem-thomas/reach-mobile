import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet} from 'react-native';
import Button from './Button.js';

class FrontPage extends React.Component{
    render(){
        return(
            <View style={styles.viewStyle}>
                <View style={styles.eachline}>
                    <Text style={styles.redTextStyle}>Re</Text>
                    <Text style={styles.whiteTextStyle}>fugee</Text>
                </View >
                <View style={styles.eachline}>
                    <Text style={styles.redTextStyle}>A</Text>
                    <Text style={styles.whiteTextStyle}>ssistance in</Text>
                </View>
                <View style={styles.eachline}>
                    <Text style={styles.redTextStyle}>C</Text>
                    <Text style={styles.whiteTextStyle}>linics and</Text>
                </View>
                <View style={styles.eachline}>
                    <Text style={styles.redTextStyle}>H</Text>
                    <Text style={styles.whiteTextStyle}>ospitals</Text>
                </View>
                <View style={{marginTop:60}}>
                    <Button title='Refugee management' color='orange'/>
                    <Button title='Supply Chain' color='orange'/>
                </View>
            </View>
        );
    
    }
}
const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#222',
        alignItems:'center',
        justifyContent:'center',
           
    },
    eachline:{
       flexDirection:'row',
       fontSize:30
    },
    redTextStyle:{
        color:'red',
        fontSize:30
    },
    whiteTextStyle:{
        color:'white',
        fontSize:30
    }


  });
export default FrontPage;