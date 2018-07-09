import React from 'react';
import RectNative from 'react-native';
import {Text,View,StyleSheet,KeyboardAvoidingView,Image,ScrollView,Modal} from 'react-native';
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
        this.state={loading:false,modalVisible:false}
        
    }
    componentWillUnmount(){
        this.setState({loading:false})
    }
    flipState(){
        if(this.state.modalVisible===true)
            this.setState({modalVisible:false})
        else
            this.setState({modalVisible:true})
    }
   onPress(){
       this.setState({loading:true})
        this.props.dispatch(actionCreator.fetch(this.props.refugeeId)).then(()=>{
            this.setState({loading:false})
            this.setState({modalVisible:false})
            Actions.userpage();
        })
   }
   ButtonLoading(){
       if(this.state.loading)
            return( <Spinner size={"large"} color={"#007aff"}/>);
        else
            return( <Button title="Authenticate" background="#007aff" onPress={this.onPress.bind(this)}/>);
            
   }
    render(){
        return(
            <KeyboardAvoidingView style={styles.viewStyle} behavior={"position"} enabled>
             <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={styles.modalstyle}
                    onRequestClose={() => {
                        this.flipState();
                    }}>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <View style={styles.modalstyle}>
                            <Text style={{fontSize:50,color:"#007aff",marginLeft:5}}>Authenticate</Text>
                            <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text) => {
                                this.props.dispatch(actionCreator.refugeeIdField(text))
                            }} />
                            {this.ButtonLoading()}
                            <Button background="red" title="close" onPress={this.flipState.bind(this)} />
                            </View>
                        </View>
                </Modal>
            <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{fontSize:30,color:'#007aff'}}>Patient signin</Text>
            {/* <ScrollView>
            <Text style={{fontSize:30,color:'#f8a557'}}>Patient signin</Text>
            <View style={{justifyContent:'center'}}>
                <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text)=>{
                    this.props.dispatch(actionCreator.refugeeIdField(text))
                }}/>
               {this.ButtonLoading()}
                </View>
                </ScrollView> */}
                <Text>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                </Text>
                <Button background="red" title="Authenticate" onPress={this.flipState.bind(this)}/>
              </View>  
            </KeyboardAvoidingView>
        );
    
    }
}
const styles = StyleSheet.create({
    viewStyle:{
        flexDirection:'column',
        backgroundColor:'rgba(225,225,225,0)',
        justifyContent:'center',
        alignContent:'center'      
    },
    modalstyle: {
        height: 350,
        width: 350,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 10,
        flexDirection: 'column'
    }
   

  });

function mapStateToProps(state,ownProps){
    return({
        refugeeId:state.RefugeeField,
    })
}
export default connect(mapStateToProps)(RefugeeSignIn);