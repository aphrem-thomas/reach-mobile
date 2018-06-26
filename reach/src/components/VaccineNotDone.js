import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
import doctorphoto from './images/doctor.jpg';
import Spinner from './Spinner.js';
class VaccineNotDone extends React.Component {
    constructor(props) {
        super(props);
        this.state={loading:false,}

    }
    onClickHandle(){
                this.setState({loading:true})
                let data={
                  transactionName:"Vaccination",
                  refugee:this.props.refugee.refugeeId,
                  doctor:this.props.physicianId,
                  vaccine:this.props.vaccine,
                  quantity:2,
                  location: this.props.doctor.location,
                  camp: this.props.doctor.camp,
                  date: this.props.doctor.date
                }
               console.log("/n original data "+JSON.stringify(data))
    this.props.dispatch(actionCreator.updateVaccineRecord(this.props.refugee.refugeeId,data)).then(()=>{
      this.setState({loading:false})
    })
    }
    buttonChoose(){
        if(this.props.doctor.name!=null){
            if(this.state.loading){
                return(<Spinner size={"small"}/>)
            }
            else{
                return(<Button title={"done"} onPress={this.onClickHandle.bind(this)}/>)
            }
        }
    }
    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.userinfovertical}>
                    <View style={styles.userinfohorizontal}>
                        <Text>Vaccine name : </Text>
                        <Text style={styles.textStyle}>{this.props.vaccine}</Text>
                        {this.buttonChoose()}
                    </View>
                </View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        height:65,
        width:300,
        flexDirection: 'column',
        backgroundColor: '#f72011',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:5,
        borderColor:"#000"
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

function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
        refugee:state.RefugeeDetails,
        doctor:state.DoctorDetails,
        physicianId: state.PhysicianField
    })
}
export default connect(mapStateToProps)(VaccineNotDone);