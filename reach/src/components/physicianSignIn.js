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
    }
    componentWillUnmount(){
        this.setState({loading:false})
    }
    onSubmit() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        this.setState({ loading: true })
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
            "date": today.toString()
        }
        this.props.dispatch(actionCreator.fetch(this.props.refugeeId)).then(() => {
            Actions.doctorView();
            this.props.dispatch(actionCreator.updateDoctor(doc));
            this.flipState();
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
        this.setState({ modalVisible: false })
    }

    render() {
        return (

            <KeyboardAvoidingView style={styles.viewStyle} behavior={"padding"} enabled>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ flex: 1, fontSize: 30, color: '#007aff' }}>Physician signin</Text>
                        <Text style={{ fontFamily: "sans-serif" }}>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</Text>
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
                                        itemStyle={{ color: 'orange' }}
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
        alignContent: 'center'
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
        physicianId: state.PhysicianField
    })
}
export default connect(mapStateToProps)(PhysicianSignIn);