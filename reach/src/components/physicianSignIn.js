import React from 'react';
import RectNative from 'react-native';
import { LayoutAnimation } from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Picker, ScrollView } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js';
import Spinner from './Spinner.js'
class PhysicianSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state={country:"Country", camp:"Location", loading:false}
    }
    onSubmit() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        this.setState({loading:true})
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '/' + mm + '/' + dd;
        let doc = {
            "name": this.props.refugeeId,
            "location": this.state.country,
            "camp": this.state.camp,
            "date":today.toString()
        }
            this.props.dispatch(actionCreator.fetch(this.props.refugeeId)).then(() => {
                Actions.doctorView();
                this.props.dispatch(actionCreator.updateDoctor(doc));
            });
        }
        ButtonLoading(){
            if(this.state.loading)
                 return( <Spinner size={"large"} color={"#007aff"}/>);
             else
                 return( <Button title="submit" onPress={this.onSubmit.bind(this)}/>);
                 
        }

    render() {
        return (

            <KeyboardAvoidingView style={styles.viewStyle} behavior={"padding"} enabled>
            <ScrollView style={{flex:1}}>
                <Text style={{ flex: 1, fontSize: 30 }}>Physician signin</Text>
                <View style={{ flex: 4 }}>
                    <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text) => {
                        this.props.dispatch(actionCreator.refugeeIdField(text))
                    }} />
                    <InputText label="Physician ID" value={this.props.physicianId} onChangeText={(text) => {
                        this.props.dispatch(actionCreator.physicianIdField(text))
                    }} />
                    <InputText secureTextEntry={true} label="Password" />
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <View style={styles.pickerStyle}>
                    <Picker 
                        selectedValue={this.state.country}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ country: itemValue })}>
                        <Picker.Item label="Country" value="Country" />
                        <Picker.Item label="Turkey" value="Turkey" />
                        <Picker.Item label="Iran" value="Iran" />
                        <Picker.Item label="Syria" value="Syria" />
                    </Picker>
                    </View>
                    <View style={styles.pickerStyle}>
                    <Picker 
                        selectedValue={this.state.camp}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ camp: itemValue })}>
                        <Picker.Item label="Location" value="Location" />
                        <Picker.Item label="Aleppo" value="Aleppo" />
                        <Picker.Item label="Damascus" value="Damascus" />
                    </Picker>
                    </View>
                    </View>
                    
                    {this.ButtonLoading()}
                </View>
                </ScrollView>
            </KeyboardAvoidingView>

        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    pickerStyle:{
        borderWidth:1,
        borderColor:"#007aff",
        marginTop:5,
        borderRadius:2
    }


});

function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
        physicianId: state.PhysicianField
    })
}
export default connect(mapStateToProps)(PhysicianSignIn);