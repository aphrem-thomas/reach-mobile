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
class UnoSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { vendorId:null, loading: false, modalVisible: false }
    }
    componentWillUnmount(){
        this.setState({loading:false})
    }
    onSubmit() {
        this.props.dispatch(actionCreator.emptyRefugee());
        this.props.dispatch(actionCreator.emptyDependent());
        this.props.dispatch(actionCreator.emptyPhysician());
        this.setState({ loading: true })
       
        this.props.dispatch(actionCreator.fetchVendor(this.state.vendorId)).then(() => {
            this.flipState();
            Actions.VendorView();
            
            
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
                        <Text style={{ flex: 1, fontSize: 30, color: '#007aff' }}>UN Official signin</Text>
                        <Text>UN Offical can login and view the availability of Medicall supplys. Also can update the supply details</Text>
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
                            <InputText label="Representative's ID" value={this.props.refugeeId} onChangeText={(text) => {
                                this.setState({vendorId:text})
                            }} />
                           
                            <InputText secureTextEntry={true} label="Password" />
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
        borderRadius: 2
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
        refugeeDetails:state.RefugeeDetails,
        Vendor:state.VendorDetails
    })
}
export default connect(mapStateToProps)(UnoSignIn);