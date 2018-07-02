import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet,Image} from 'react-native';
import Button from './Button.js';
import {Actions} from 'react-native-router-flux';
import {reachlogo} from './images/logoreachwhite.png';
class FrontPage extends React.Component{
    clickHandle1(){
        Actions.refugeesecondpage();
    }
    render(){
        return(
            <View style={styles.viewStyle}>
                <View>
                <Image source={reachlogo} style={styles.imageStyle}/>
                </View>
                <View style={styles.eachline}>
                    <Text style={styles.blueTextStyle}>Re</Text>
                    <Text style={styles.whiteTextStyle}>fugee</Text>
                </View >
                <View style={styles.eachline}>
                    <Text style={styles.blueTextStyle}>A</Text>
                    <Text style={styles.whiteTextStyle}>ssistance in</Text>
                </View>
                <View style={styles.eachline}>
                    <Text style={styles.blueTextStyle}>C</Text>
                    <Text style={styles.whiteTextStyle}>linics and</Text>
                </View>
                <View style={styles.eachline}>
                    <Text style={styles.blueTextStyle}>H</Text>
                    <Text style={styles.whiteTextStyle}>ospitals</Text>
                </View>
                <View style={{marginTop:60}}>
                    <Button title='Refugee management' color='orange' onPress={()=>Actions.refugeesecondpage()}/>
                    <Button title='Supply Chain' color='orange'/>
                </View>
                <View >
                    <Text style={{color:'#f8a557'}}>Powered by Blockchain</Text>
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
    },
    blueTextStyle:{
        color:'#007aff',
        fontSize:30
    },
    whiteTextStyle:{
        color:'#FFF',
        fontSize:30
    },
    imageStyle:{
        flex:1,
        height:100,
        width:150
    }


  });
export default FrontPage;