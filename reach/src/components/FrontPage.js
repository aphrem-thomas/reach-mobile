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
            <ImageBackground source={require('./images/refugee2.jpg')} blurRadius={1} style={{ flex: 1 }}>
                <View style={styles.viewStyle}>
                    <View>
                        <Image source={require('./images/logoreachwhite.png')} style={styles.imageStyle} />
                    </View>

                    <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end' ,alignItems:'center'}}>
                        <View style={styles.eachline}>
                            <Text style={styles.orangeTextStyle}>Re</Text>
                            <Text style={styles.whiteTextStyle}>fugee</Text>
                       
                            <Text style={styles.orangeTextStyle}>A</Text>
                            <Text style={styles.whiteTextStyle}>ssistance in</Text>
                        </View>
                        <View style={styles.eachline}>
                            <Text style={styles.orangeTextStyle}>C</Text>
                            <Text style={styles.whiteTextStyle}>linics and</Text>
                        
                            <Text style={styles.orangeTextStyle}>H</Text>
                            <Text style={styles.whiteTextStyle}>ospitals</Text>
                        </View>
                        <Text style={styles.redTextStyle}>Revolutionizing healthcare using Blockchain</Text>
                        <Button background="rgba(225,0,0,1)" height={40} title="Continue..." onPress={this.clickHandle1.bind(this)} />
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
        backgroundColor: 'rgba(0,0,225,.25)',
        alignItems: 'center',


    },
    eachline: {
        flexDirection: 'row',
    },
    orangeTextStyle: {
        color: 'orange',
        fontSize: 25
    },
    whiteTextStyle: {
        color: '#FFF',
        fontSize: 25
    },
    redTextStyle:{
        color: '#ff0000',
        fontSize: 20 
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