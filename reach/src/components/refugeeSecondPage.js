import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet, KeyboardAvoidingView, LayoutAnimation,Platform,Button, ScrollView} from 'react-native';
//import Button from './Button.js';
import PhysicianSignIn from './physicianSignIn.js';
import RefugeeSignIn from './refugeeSignIn.js';
import Navbar from './Navbar.js'
import {UIManager} from 'react-native';
class RefugeeSecondPage extends React.Component{
    constructor(props){
        super(props);
        this.state={option:"patient",
        button1:true,
        button2:false
    };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
          }
    }
    options(){
        if (this.state.option==="patient"){
            return ( 
            <View style={styles.signinStyle}>
                <RefugeeSignIn/>
            </View>);
        }
        else{
            return(
            <View style={styles.signinStyle}>
                <PhysicianSignIn/>
            </View>
            );
        }
    }
    clickhandlePatient(){
        this.setState({option:"patient", button2:false, button1:true});
    }
    clickhandlePhysician(){
        this.setState({option:"physician", button2:true, button1:false});
    }
    componentWillUpdate(){
        LayoutAnimation.linear();
   }
    render(){
        return(
            
            <View style={styles.viewStyle1}>
            <View style={styles.buttonStyle}>
                    <Button title='Patient' disabled={this.state.button1}  onPress={this.clickhandlePatient.bind(this)}/>
                    <Button title='Doctor' disabled={this.state.button2} onPress={this.clickhandlePhysician.bind(this)}/>
            </View>
            
            {this.options()}
            
           </View>
           
           
        );
    
    }
}
const styles = StyleSheet.create({
    viewStyle1:{
        flex:1,
        flexDirection:'column',
       
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