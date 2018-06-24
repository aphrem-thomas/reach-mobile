import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet} from 'react-native';
import Button from './Button.js';
import {Actions} from 'react-native-router-flux';
import InputText from './InputText.js';
import {connect} from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
class RefugeeSignIn extends React.Component{
    constructor(props){
        super(props);
        
    }
   onPress(){

   }
    render(){
        return(
            <View style={styles.viewStyle} >
                <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text)=>{
                    this.props.dispatch(actionCreator.refugeeIdField(text))
                }}/>
               
                <Button title="submit"/>
            </View>
        );
    
    }
}
const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#222',
        justifyContent:'center'      
    }
   

  });

function mapStateToProps(state,ownProps){
    return({
        refugeeId:state.RefugeeField,
    })
}
export default connect(mapStateToProps)(RefugeeSignIn);