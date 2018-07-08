import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet,TextInput,Image} from 'react-native';
import Button from './Button.js';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
class UserLabel extends React.Component{
    // clickHandle1(){
    //     Actions.refugeesecondpage();
    // }
    render(){
        return(
            <View style={styles.viewStyle}>
                <Image source={{uri:this.props.refugee.refugeeImage}} style={styles.imageStyle }/>
                <View style={styles.userinfovertical}>
                <View style={styles.userinfohorizontal}>
                <Text>Name : </Text>
                <Text style={styles.textStyle}>{this.props.refugee.firstName}</Text>
                </View>
                <View style={styles.userinfohorizontal}>
                <Text>Nationality : </Text>
                <Text style={styles.textStyle}>{this.props.refugee.nationality}</Text>
                </View>
               </View>
            </View>
        );
    
    }
}

const styles = StyleSheet.create({
    viewStyle:{
        flexDirection:'column',
        backgroundColor:'#FFF',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginRight:5,
        marginLeft:5,
        borderRadius:10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation:1,
    },
    imageStyle:{
        height:100,
        width:100,
        borderRadius:100,
        marginTop:3,
        marginBottom:3,

    },
    userinfovertical:{
        justifyContent:'center',
        flexDirection:'column',
        paddingLeft:15
    },
    userinfohorizontal:{
        flexDirection:'row',
        justifyContent:'center',
    },
    
    textStyle:{
        color:"#000",
        paddingLeft:5,
        paddingRight:5
    }

  });
function mapStateToProps(state,ownProps){
    return({
        refugee:state.RefugeeDetails
    });
}
export default connect (mapStateToProps)(UserLabel);