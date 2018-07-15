import React from 'react';
import RectNative from 'react-native';
import { LayoutAnimation } from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Picker, ScrollView, Modal } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js';
import Spinner from './Spinner.js'
class PhysicianSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { country: "Country", camp: "Location", loading: false, modalVisible: false }
        // console.log("physician state in physician"+ this.props.refugeeId);
        console.log("refugee state in physician"+ JSON.stringify(this.props.refugeeDetails));
        console.log("refugee id field in refugee "+this.props.refugeeId);
    
    }
    componentWillUnmount(){
        this.setState({loading:false})
    }
    onSubmit() {
        this.props.dispatch(actionCreator.emptyRefugee());
        this.props.dispatch(actionCreator.emptyDependent());
        this.props.dispatch(actionCreator.emptyPhysician());
        this.setState({ loading: true })
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '/' + mm + '/' + dd;
        let doc = {
            "name": this.props.physicianId,
            "location": this.state.country,
            "camp": this.state.camp,
            "date": today
        }
        console.log("doc in physician sign in page "+JSON.stringify(doc))
        this.props.dispatch(actionCreator.fetch(this.props.refugeeId)).then(() => {
            this.flipState();
            this.props.dispatch(actionCreator.updateDoctor(doc));
            Actions.doctorView();
            
            
        });
    }
    ButtonLoading() {
        if (this.state.loading)
            return (<Spinner size={"small"} color={"#007aff"} />);
        else
            return (<Button title="login" background="#007aff" onPress={this.onSubmit.bind(this)} />);

    }
    signinModal() {
        this.setState({ modalVisible: true })
    }
    flipState() {
        if(this.state.modalVisible===true)
            this.setState({modalVisible:false,loading:false})
        else
            this.setState({modalVisible:true,loading:true})
    }

    render() {
        return (

            <KeyboardAvoidingView style={styles.viewStyle} behavior={"padding"} enabled>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        <Text style={{ flex: 1, fontSize: 30, color: '#007aff' }}>Physician signin</Text>
                        <Text style={{ fontFamily: "sans-serif" }}>Physician can provide the id of patient along with login to view and update the Medical and Vaccine Records of Patient and his/her dependent's</Text>
                        <Button title="login" background="red" onPress={this.signinModal.bind(this)} />
                    </View>
                </ScrollView>

                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={styles.modalstyle}
                    onRequestClose={() => {
                        this.flipState();
                    }}>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <View style={styles.modalstyle}>
                            <Text style={{ fontSize: 50, color: "#007aff", marginLeft: 5 }}>Login</Text>
                            <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text) => {
                                this.props.dispatch(actionCreator.refugeeIdField(text))
                            }} />
                            <InputText label="Physician ID" value={this.props.physicianId} onChangeText={(text) => {
                                this.props.dispatch(actionCreator.physicianIdField(text))
                            }} />
                            <InputText secureTextEntry={true} label="Password" />
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Picker
                                        itemStyle={{color:'white'}}
                                        selectedValue={this.state.country}
                                        style={{marginRight:2,backgroundColor:'orange', height: 50, width: 150 }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ country: itemValue })}>
                                        <Picker.Item label="Country" value="Country" />
                                        <Picker.Item label="Turkey" value="Turkey" />
                                        <Picker.Item label="Iran" value="Iran" />
                                        <Picker.Item label="Syria" value="Syria" />
                                    </Picker>
                               
                                    <Picker
                                        itemStyle={{color:'white'}}
                                        selectedValue={this.state.camp}
                                        style={{marginLeft:2, backgroundColor:'orange',height: 50, width: 150 }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ camp: itemValue })}>
                                        <Picker.Item label="Location" value="Location" />
                                        <Picker.Item label="Aleppo" value="Aleppo" />
                                        <Picker.Item label="Damascus" value="Damascus" />
                                    </Picker>
                               
                            </View>
                            {this.ButtonLoading()}
                            <Button background="red" title="close" onPress={this.flipState.bind(this)} />
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>

        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(225,225,225,0)',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft:3,
        marginRight:3
    },
    pickerStyle: {
        marginTop: 5,
        borderRadius: 2,
        borderColor:'orange',
    },
    modalstyle: {
        height: 450,
        width: 350,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 10,
        flexDirection: 'column'
    }


});

function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
        physicianId: state.PhysicianField,
        refugeeDetails:state.RefugeeDetails
    })
}
export default connect(mapStateToProps)(PhysicianSignIn);