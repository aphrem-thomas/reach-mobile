import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet} from 'react-native';
import Button from './Button.js';
import PhysicianSignIn from './physicianSignIn.js';
import RefugeeSignIn from './refugeeSignIn.js';
import Navbar from './Navbar.js'
class RefugeeSecondPage extends React.Component{
    render(){
        return(
            <View style={styles.viewStyle1}>
            <View style={styles.buttonStyle}>
                    <Button title='Patient' color='orange'/>
                    <Button title='Doctor' color='orange'/>
            </View>
            <View style={styles.signinStyle}>
                <RefugeeSignIn/>
            </View>
           </View>
           
        );
    
    }
}
const styles = StyleSheet.create({
    viewStyle1:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#222',
        justifyContent:'center'      
    },
    buttonStyle:{
        flex:1,
        flexDirection:'row',
        height:30,
        backgroundColor:'#222',
        justifyContent:'center',
        alignItems:'center'         
    },
    signinStyle:{
        flex:5,
        backgroundColor:'#222',
        justifyContent:'center',
        alignItems:'center',
        
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
export default RefugeeSecondPage;