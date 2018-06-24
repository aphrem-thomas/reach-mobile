import React from 'react';
import RectNative from 'react-native';
import {LayoutAnimation} from 'react-native';
import {Text,View,StyleSheet,KeyboardAvoidingView,ScrollView} from 'react-native';
import Button from './Button.js';
import {Actions} from 'react-native-router-flux';
import InputText from './InputText.js';
import {connect} from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
class PhysicianSignIn extends React.Component{
    constructor(props){
        super(props);
    }
   onPress(){

   }
   
    render(){
        return(
            
            <KeyboardAvoidingView style={styles.viewStyle} behavior={"position"} enabled>
            <Text style={{flex:1, fontSize:30}}>Physician signin</Text>
            <View style={{flex:4}}>
                <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text)=>{
                    this.props.dispatch(actionCreator.refugeeIdField(text))
                }}/>
                <InputText label="Physician ID" value={this.props.physicianId} onChangeText={(text)=>{
                    this.props.dispatch(actionCreator.physicianIdField(text))
                }}/>
                <InputText secureTextEntry={true} label="Password"/>
                <Button title="submit"/>
                </View>
            </KeyboardAvoidingView>
            
        );
    
    }
}
const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#FFF',
        justifyContent:'center'      
    }
   

  });

function mapStateToProps(state,ownProps){
    return({
        refugeeId:state.RefugeeField,
        physicianId:state.PhysicianField
    })
}
export default connect(mapStateToProps)(PhysicianSignIn);