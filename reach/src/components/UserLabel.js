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
                <Image source={{uri:"http://realitysteve.com/wp-content/uploads/2016/03/Sal1.jpeg"}} style={styles.imageStyle }/>
                <View style={styles.userinfovertical}>
                <View style={styles.userinfohorizontal}>
                <Text>Name : </Text>
                <Text style={styles.textStyle}>{this.props.refugee.name}</Text>
                </View>
                <View>
                <Text>Date of birth: </Text>
                <Text style={styles.textStyle}>{this.props.refugee.dob}</Text>
                </View>
                <View>
                <Text>Nationality : </Text>
                <Text style={styles.textStyle}>{this.props.refugee.country}</Text>
                </View>
               </View>
            </View>
        );
    
    }
}

const styles = StyleSheet.create({
    viewStyle:{
        flexDirection:'row',
        backgroundColor:'#FFF',
        alignItems:'center',
        marginTop:10,
        height:100,
        borderWidth:2,
    },
    imageStyle:{
        flex:1,
        height:85,
        width:85,
        paddingLeft:15,
        paddingRight:15,
    },
    userinfovertical:{
        flexDirection:'column',
        flex:4,
        paddingLeft:15
    },
    userinfohorizontal:{
        flexDirection:'row',
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