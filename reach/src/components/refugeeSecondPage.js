import React from 'react';
import RectNative from 'react-native';
import {
    Text,
    Image,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    LayoutAnimation,
    Platform,
    ScrollView,
    ImageBackground
} from 'react-native';
//import Button from './Button.js';
import PhysicianSignIn from './physicianSignIn.js';
import RefugeeSignIn from './refugeeSignIn.js';
import UnoSignIn from './UnoSignIn.js';
import Navbar from './Navbar.js'
import { UIManager } from 'react-native';
import ClickCard from './clickCard.js';
import Button from './Button.js';
import {connect} from 'react-redux';
import * as actionCreator from './action/actionCreator.js';
import MyCamera from './camera.js';
class RefugeeSecondPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: null,
            button1: true,
            button2: false
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
      
    }
    options() {
        if (this.state.option === "patient") {
            return (
                <View style={styles.signinStyle}>
                    <RefugeeSignIn />
                </View>);
        }
        else if (this.state.option === "physician") {
            return (
                <View style={styles.signinStyle}>
                    <PhysicianSignIn />
                </View>
            );
        }
        else if (this.state.option === "uno") {
            return (
                <View style={styles.signinStyle}>
                    <UnoSignIn />
                </View>
            );
        }
    }
    clickhandlePatient() {
        this.setState({ option: "patient", button2: false, button1: true });
    }
    clickhandleUno() {
        this.setState({ option: "uno", button2: true, button1: false });
    }
    clickhandlePhysician() {
        this.setState({ option: "physician", button2: true, button1: false });
    }
   
    componentWillUpdate() {
        LayoutAnimation.linear();
    }
    render() {
        return (
            <ImageBackground source={require('./images/slider-img1.jpg')} blurRadius={.7} style={{ flex: 1,justifyContent:'center' }}>
               <ScrollView horizontal={true}>
                <View style={styles.scrollside}>
                        <View
                            marginLeft={10}
                            backgroundColor='rgba(225,0,0,0.9)'
                            height={200}
                            width={150}>
                            
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("./images/patient.png")} style={{ height: 100, width: 100, justifyContent: 'center' }} />
                                <Text style={{ fontFamily:'lato',fontSize: 20 }}>Refugee</Text>
                            </View>
                            <RefugeeSignIn/>
                        </View>
                        <View
                            marginLeft={10}
                            backgroundColor='rgba(225,0,0,0.9)'
                            height={200}
                            width={150}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("./images/doctor.png")} style={{ height: 100, width: 100, justifyContent: 'center' }} />
                                <Text style={{ fontFamily:'lato', fontSize: 20 }}>Physician</Text>
                            </View>
                            <PhysicianSignIn/>
                        </View>
                        {/* <View
                            marginLeft={10}
                            backgroundColor='rgba(225,0,0,0.9)'
                            height={250}
                            width={150}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("./images/un.png")} style={{ height: 140, width: 140, justifyContent: 'center' }} />
                                <Text style={{ fontSize: 20 }}>UN Official</Text>
                            </View>
                            <UnoSignIn/>
                        </View> */}
                       
                </View>
                </ScrollView>
            </ImageBackground>
        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center'

    },
    scrollside: {

        marginLeft: 3,
        marginRight: 3,
        marginTop:5,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signinStyle: {
        flex: 1,
        justifyContent: 'center',
        

    },
    redTextStyle: {
        color: 'red',
        fontSize: 30
    },
    whiteTextStyle: {
        color: 'white',
        fontSize: 30
    }


});

function mapStateToProps(){
    return({});
}
export default connect(mapStateToProps)(RefugeeSecondPage);