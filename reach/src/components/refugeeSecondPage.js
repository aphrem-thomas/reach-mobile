import React from 'react';
import RectNative from 'react-native';
import {Text,
    Image,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    LayoutAnimation,
    Platform,
    ScrollView,
    ImageBackground} from 'react-native';
//import Button from './Button.js';
import PhysicianSignIn from './physicianSignIn.js';
import RefugeeSignIn from './refugeeSignIn.js';
import Navbar from './Navbar.js'
import {UIManager} from 'react-native';
import ClickCard from './clickCard.js';
import Button from './Button.js';
class RefugeeSecondPage extends React.Component{
    constructor(props){
        super(props);
        this.state={option:null,
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
        else if(this.state.option==="physician"){
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
    clickhandleUno(){
        this.setState({option:"physician", button2:true, button1:false});
    }
    clickhandlePhysician(){
        this.setState({option:"uno", button2:true, button1:false});
    }
    componentWillUpdate(){
        LayoutAnimation.linear();
   }
    render(){
        return(
            <ImageBackground source={require('./images/refugee2.jpg')} blurRadius={1} style={{ flex: 1 }}>
            <View style={styles.viewStyle}>
            <View style={styles.scrollside}>
           <ScrollView horizontal={true}>
            <ClickCard onPress={this.clickhandlePhysician.bind(this)}>
                <Image source={require("./images/doc.png")} style={{height:140,width:140,justifyContent:'center'}}/>
                
            </ClickCard>
            <ClickCard onPress={this.clickhandleUno.bind(this)}>
                <Image source={require("./images/unco.png")} style={{height:140,width:140,justifyContent:'center'}}/>
                
            </ClickCard>
            <ClickCard onPress={this.clickhandlePatient.bind(this)}>
                <Image source={require("./images/patient.png")} style={{height:140,width:140,justifyContent:'center'}}/>
                
            </ClickCard>
            </ScrollView>
            </View>
            
            {this.options()}
            </View>
           </ImageBackground>
           
           
        );
    
    }
}
const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        backgroundColor: 'rgba(0,0,225,.25)',
        justifyContent:'center'

    },
    scrollside: {
        
        marginLeft:3,
        marginRight:3,
        alignSelf:'stretch',
        flexDirection: 'row',
        alignItems: 'center',
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
       flex:1,
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