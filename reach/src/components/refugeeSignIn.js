import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet,KeyboardAvoidingView,Image,ScrollView} from 'react-native';
import Button from './Button.js';
import {Actions} from 'react-native-router-flux';
import InputText from './InputText.js';
import {connect} from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
import doctorphoto from './images/doctor.jpg';
import Spinner from './Spinner.js';
class RefugeeSignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={loading:false}
        
    }
   onPress(){
       this.setState({loading:true})
        this.props.dispatch(actionCreator.fetch(this.props.refugeeId)).then(()=>{
            this.setState({loading:false})
            Actions.userpage();
        })
   }
   ButtonLoading(){
       if(this.state.loading)
            return( <Spinner size={"large"} color={"#007aff"}/>);
        else
            return( <Button title="submit" onPress={this.onPress.bind(this)}/>);
            
   }
    render(){
        return(
            <KeyboardAvoidingView style={styles.viewStyle} behavior={"position"} enabled>
            <ScrollView>
            <Text style={{flex:1, fontSize:30}}>Patient signin</Text>
            <Image source={require("./images/doctor.jpg")} style={{height:150, width:300}}/>
            <View style={{flex:4}}>
                <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text)=>{
                    this.props.dispatch(actionCreator.refugeeIdField(text))
                }}/>
               {this.ButtonLoading()}
                </View>
                </ScrollView>
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
    })
}
export default connect(mapStateToProps)(RefugeeSignIn);