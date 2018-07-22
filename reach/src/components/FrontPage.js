import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { reachlogo } from './images/logoReach.jpg';
import { Font } from 'expo';

class FrontPage extends React.Component {
   
    clickHandle1() {
        Actions.refugeesecondpage();
    }
    render() {
        return (
            <ImageBackground blurRadius={.7} source={require('./images/slider-img1.jpg')} style={{ flex: 1 }}>
                <View style={styles.viewStyle}>

                    <View style={{ flex: 1, justifyContent: 'center', paddingTop: 20 }}>
                        <View style={{
                            alignSelf: 'stretch',
                            justifyContent: 'flex-end',
                            marginLeft: 10,
                            marginRight: 10,
                            marginBottom: 10,
                            
                            alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)'
                        }}>
                            <View>
                                <Image source={require('./images/logoreachwhite.png')} style={styles.imageStyle} />
                            </View>
                            <View style={{alignSelf:'stretch',marginLeft:30}}>
                            <View style={styles.eachline}>
                                <Text style={styles.orangeTextStyle}>
                                <Text style={styles.redTextStyle}>Re</Text>
                                    fugee
                                    </Text>
                            </View>
                            <View style={styles.eachline}>
                                <Text style={styles.orangeTextStyle}>
                                <Text style={styles.redTextStyle}>A</Text>
                                    ssistance in
                                    </Text>
                            </View>
                            <View style={styles.eachline}>
                                <Text style={styles.orangeTextStyle}>
                                <Text style={styles.redTextStyle}>C</Text>
                                    linics and
                                    </Text>
                            </View>
                            <View style={styles.eachline}>
                                <Text style={styles.orangeTextStyle}>
                                <Text style={styles.redTextStyle}>H</Text>
                                    ospitals
                                    </Text>
                            </View>
                            </View>
                            <Button background="rgba(225,0,0,1)" height={40} title="Continue" onPress={this.clickHandle1.bind(this)} />
                           
                                <Text style={{ fontFamily:'playfair',fontSize: 15, color:'white',marginRight:25,marginLeft:25,marginBottom:25 }}>Revolutionizing healthcare using Blockchain</Text>                        
                                
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
        marginLeft:3,
        marginRight:3,
    },
    orangeTextStyle: {
        color: '#79797a',
        fontSize: 40,
        fontFamily:'roboto'
    },
    whiteTextStyle: {
        color: '#FFF',
        fontSize: 23,
        fontFamily:'roboto'
    },
    redTextStyle: {
        color: '#FFF',
        fontSize: 40,
        marginLeft: 5,
        marginRight: 5,
        fontFamily:'roboto'
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 200,
        width: 200
    },
    textStyle: {
        color: "#FFF",
        fontSize: 20,
        fontFamily:'roboto'
    }


});
export default FrontPage;