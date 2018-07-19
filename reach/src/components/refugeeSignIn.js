import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, ScrollView, Modal } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
import doctorphoto from './images/doctor.jpg';
import Spinner from './Spinner.js';
import MyCamera from './camera.js';

class RefugeeSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, modalVisible: false }
        console.log("refugee state in refugee" + JSON.stringify(this.props.refugeeDetails));
        console.log("refugee id field in refugee " + this.props.refugeeId);


    }
    componentWillUnmount() {
        this.setState({ loading: false })
    }
    flipState() {
        if (this.state.modalVisible === true)
            this.setState({ modalVisible: false })
        else
            this.setState({ modalVisible: true })
    }
    onPress() {

            this.props.dispatch(actionCreator.emptyRefugee());
            this.props.dispatch(actionCreator.emptyDependent());
            this.props.dispatch(actionCreator.emptyPhysician());
            this.setState({ loading: true })
                if(this.props.refugeeId!=null){
                this.props.dispatch(actionCreator.fetch(this.props.refugeeId)).then(() => {
                this.setState({ loading: false })
                this.setState({ modalVisible: false })
                Actions.userpage();
                })
            }
            else{
                this.props.dispatch(actionCreator.fetch("rf1")).then(() => {
                    this.setState({ loading: false })
                    this.setState({ modalVisible: false })
                    Actions.userpage();
                    }) 
            }

    }
    ButtonLoading() {
        if (this.state.loading)
            return (<Spinner size={"large"} color={"#007aff"} />);
        else
            return (<Button title="Authenticate" background="#007aff" onPress={this.onPress.bind(this)} />);

    }
   
    render() {
        return (
           <View>
                    <View style={{ justifyContent: 'center' }}>
                       <Button background="red" height={30} title="Authenticate" onPress={this.flipState.bind(this)} />
                    </View>
                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={styles.modalstyle}
                    onRequestClose={() => {
                        this.flipState();
                    }}>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <View style={styles.modalstyle}>
                            <Text style={{ fontSize: 50, color: "#007aff", marginLeft: 5 }}>Authenticate</Text>
                            <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text) => {
                                this.props.dispatch(actionCreator.refugeeIdField(text))
                            }} />
                            <Text style={{color:'orange',fontSize:20}}>OR</Text>
                            <View style={{ height: 200, width: 150 }}>
                                <MyCamera camface="front"/>
                            </View>


                            {this.ButtonLoading()}
                            <Button background="red"  title="close" onPress={this.flipState.bind(this)} />
                        </View>
                    </View>
                </Modal>
            </View>
        )}
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
    modalstyle: {
        height: 500,
        width: 350,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }


});

function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
        refugeeDetails: state.RefugeeDetails
    })
}
export default connect(mapStateToProps)(RefugeeSignIn);