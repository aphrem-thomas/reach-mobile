import React from 'react';
import RectNative from 'react-native';
import { LayoutAnimation } from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Picker, ScrollView, Modal } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js';
import Spinner from './Spinner.js';
import MyCamera from './camera.js';

class PhysicianSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { country: "Country", camp: "Location", loading: false, modalVisibleDoc: false, modalVisibleRef: false }
        // console.log("physician state in physician"+ this.props.refugeeId);
        console.log("refugee state in physician" + JSON.stringify(this.props.refugeeDetails));
        console.log("refugee id field in refugee " + this.props.refugeeId);

    }
    componentWillUnmount() {
        this.setState({ loading: false })
    }
    onSubmit() {
        this.props.dispatch(actionCreator.emptyRefugee());
        this.props.dispatch(actionCreator.emptyDependent());
        this.props.dispatch(actionCreator.emptyPhysician());
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
        console.log("doc in physician sign in page " + JSON.stringify(doc))
        this.props.dispatch(actionCreator.updateDoctor(doc));
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false });
            this.setState({ modalVisibleDoc: false });
            this.flipStateRef();
        }, 2000);


    }

    onAuthenticate(){
        this.setState({ loading: true })
        this.props.dispatch(actionCreator.fetch("rf100")).then(()=>{
            this.setState({ loading: false });
            this.setState({ modalVisibleRef: false });
            Actions.userpage();
        });
      
    }
    ButtonLoading() {
        if (this.state.loading)
            return (<Spinner size={"small"} color={"#007aff"} />);
        else
            return (<Button title="Log In" background="#007aff" onPress={this.onSubmit.bind(this)} />);

    }
    ButtonLoadingAuth() {
        if (this.state.loading)
            return (<Spinner size={"small"} color={"#007aff"} />);
        else
            return (<Button title="Authenticate" background="#007aff" onPress={this.onAuthenticate.bind(this)} />);

    }
    signinModal() {
        this.setState({ modalVisibleDoc: true })
    }
    flipStateDoc() {
        if (this.state.modalVisibleDoc === true)
            this.setState({ modalVisibleDoc: false })
        else
            this.setState({ modalVisibleDoc: true })
    }

    flipStateRef() {
        if (this.state.modalVisibleRef === true)
            this.setState({ modalVisibleRef: false })
        else
            this.setState({ modalVisibleRef: true })
    }

    render() {
        return (
            <View>
                <View style={{ justifyContent: 'center' }}>
                    <Button height={30} title="Log In" background="red" onPress={this.signinModal.bind(this)} />
                </View>


                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisibleDoc}
                    style={styles.modalstyle}
                    onRequestClose={() => {
                        this.flipStateDoc();
                    }}>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <View style={styles.modalstyle}>
                            <Text style={{ fontSize: 50, color: "#007aff", marginLeft: 5 }}>Login</Text>
                            <InputText label="Physician ID" value={this.props.physicianId} onChangeText={(text) => {
                                this.props.dispatch(actionCreator.physicianIdField(text))
                            }} />
                            <InputText secureTextEntry={true} label="Password" />
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Picker
                                    itemStyle={{ color: 'white' }}
                                    selectedValue={this.state.country}
                                    style={{ marginRight: 2, backgroundColor: 'orange', height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ country: itemValue })}>
                                    <Picker.Item label="Country" value="Country" />
                                    <Picker.Item label="Turkey" value="Turkey" />
                                    <Picker.Item label="Iran" value="Iran" />
                                    <Picker.Item label="Syria" value="Syria" />
                                </Picker>

                                <Picker
                                    itemStyle={{ color: 'white' }}
                                    selectedValue={this.state.camp}
                                    style={{ marginLeft: 2, backgroundColor: 'orange', height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ camp: itemValue })}>
                                    <Picker.Item label="Location" value="Location" />
                                    <Picker.Item label="Aleppo" value="Aleppo" />
                                    <Picker.Item label="Damascus" value="Damascus" />
                                </Picker>

                            </View>
                            {this.ButtonLoading()}
                            <Button background="red" title="close" onPress={this.flipStateDoc.bind(this)} />
                        </View>
                    </View>
                </Modal>
                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisibleRef}
                    style={styles.modalstyle}
                    onRequestClose={() => {
                        this.flipStateRef();
                    }}>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <View style={styles.modalstyle}>
                            <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text) => {
                                this.props.dispatch(actionCreator.refugeeIdField(text))
                            }} />
                            <Text style={{ color: 'orange', fontSize: 20 }}>OR</Text>
                            <View style={{ height: 200, width: 150 }}>
                                <MyCamera />
                            </View>
                            {this.ButtonLoadingAuth()}
                            <Button background="red" title="Close" onPress={this.flipStateRef.bind(this)} />
                        </View>
                    </View>
                </Modal>
            </View>
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
        marginLeft: 3,
        marginRight: 3
    },
    pickerStyle: {
        marginTop: 5,
        borderRadius: 2,
        borderColor: 'orange',
    },
    modalstyle: {
        height: 450,
        width: 350,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 10,
        flexDirection: 'column',
        alignItems:'center'
    }


});

function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
        physicianId: state.PhysicianField,
        refugeeDetails: state.RefugeeDetails
    })
}
export default connect(mapStateToProps)(PhysicianSignIn);