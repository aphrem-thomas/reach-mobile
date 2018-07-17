import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { reachlogo } from './images/logoReach.jpg';
import { Font } from 'expo';

class FrontPage extends React.Component {
    // componentDidMount(){
    //     Font.loadAsync({
    //         'lato': require('../../assets/fonts/Lato-Regular.ttf'),
    //       });
    // }
    clickHandle1() {
        Actions.refugeesecondpage();
    }
    render() {
        return (
            <ImageBackground source={require('./images/slider-img1.jpg')} style={{ flex: 1 }}>
                <View style={styles.viewStyle}>
                    <View>
                        <Image source={require('./images/logoreachwhite.png')} style={styles.imageStyle} />
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                    <View style={{
                        alignSelf: 'stretch',
                        justifyContent: 'flex-end',
                        marginLeft:10,
                        marginRight:10,
                        marginBottom:10,
                        alignItems:'center',backgroundColor:'rgba(225,225,225,0.8)'}}>
                        <View style={styles.eachline}>
                            <Text style={styles.orangeTextStyle}>Refugee Assistance in Clinics and Hospitals</Text>
                        </View>
                       
                        <Text style={styles.redTextStyle}>Revolutionizing healthcare using Blockchain</Text>
                        <Button background="rgba(225,0,0,1)" height={40} title="Continue..." onPress={this.clickHandle1.bind(this)} />
                    </View>
                    </View>

                </View>
            </ImageBackground>
        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',


    },
    eachline: {
        flexDirection: 'row',
    },
    orangeTextStyle: {
        color: '#79797a',
        fontSize: 18
    },
    whiteTextStyle: {
        color: '#FFF',
        fontSize: 25
    },
    redTextStyle:{
        color: '#000',
        fontSize: 20,
        marginLeft:5,
        marginRight:5
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 200,
        width: 200
    },
    textStyle: {
        color: "#FFF",
        fontSize: 20
    }


});
export default FrontPage;