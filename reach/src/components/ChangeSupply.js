import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, ScrollView, Modal, TouchableOpacity, Picker } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
import doctorphoto from './images/doctor.jpg';
import Spinner from './Spinner.js';
class ChangeSupply extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, modalVisible: false ,inventory:null,sublist:null}
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
        this.props.dispatch(actionCreator.fetch(this.props.refugeeId)).then(() => {
            this.setState({ loading: false })
            this.setState({ modalVisible: false })
            Actions.userpage();
        })
    }
    ButtonLoading() {
        if (this.state.loading)
            return (<Spinner size={"large"} color={"#007aff"} />);
        else
            return (<Button title="Authenticate" background="#007aff" onPress={this.onPress.bind(this)} />);

    }
    onChange(opt){
        if (opt == "Blood") {
            this.props.dispatch(actionCreator.Blood()).then(() => {

                let temp = [];

                this.props.Blood.map((item) => {
                    let thing = { "item": null, "quantity": null };
                    thing.item = item.bloodType;
                    thing.quantity = item.quantity;
                    temp.push(thing);
                })
                console.log(temp);
                this.setState({ sublist: temp });
                this.onChangeSub();
            })

        }
        if (opt == "Medicine") {
            this.props.dispatch(actionCreator.Medicine()).then(() => {
                let temp = [];
                this.props.Medicine.map((item) => {
                    let thing = { "item": null, "quantity": null };
                    thing.item = item.medicineName;
                    thing.quantity = item.quantity;
                    temp.push(thing);
                })
                this.setState({ sublist: temp });
                this.onChangeSub();
            })


        }
        if (opt == "Vaccine") {
            this.props.dispatch(actionCreator.Vaccine()).then(() => {
                let temp = [];
                this.props.Vaccine.map((item) => {
                    let thing = { "item": null, "quantity": null };
                    thing.item = item.vaccinationType;
                    thing.quantity = item.quantity;
                    temp.push(thing);
                })
                this.setState({ sublist: temp });
                this.onChangeSub();
            })


        }
        if (opt == "Syringe") {
            this.props.dispatch(actionCreator.Syringe()).then(() => {
                let temp = [];
                this.props.Syringe.map((item) => {
                    let thing = { "item": null, "quantity": null };
                    thing.item = item.syringeType;
                    thing.quantity = item.quantity;
                    temp.push(thing);
                })
                this.setState({ sublist: temp });
                this.onChangeSub();
            })


        }
    }
    render() {
        return (
            <View style={styles.viewStyle}>
                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={styles.modalstyle}
                    onRequestClose={() => {
                        this.flipState();
                    }}>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <View style={styles.modalstyle}>
                            <Picker
                                itemStyle={{ color: 'white' }}
                                selectedValue={this.state.country}
                                style={{ marginRight: 2, height: 50, width: 150, borderColor:"#007aff",borderWidth:1}}
                                onValueChange={(itemValue, itemIndex) =>{this.onChange(itemValue)}}>
                                <Picker.Item label="Select item" value={null} itemStyle={{color:"#007aff"}} />
                                <Picker.Item label="Syringe" value="Syringe" itemStyle={{color:"#007aff"}}/>
                                <Picker.Item label="Blood" value="Blood" itemStyle={{color:"#007aff"}}/>
                                <Picker.Item label="Vaccine" value="Vaccine" itemStyle={{color:"#007aff"}}/>
                                <Picker.Item label="Medicine" value="Medicine" itemStyle={{color:"#007aff"}}/>
                            </Picker>
                            <Picker
                                itemStyle={{ color: 'white' }}
                                selectedValue={this.state.country}
                                style={{ marginRight: 2, height: 50, width: 150, borderColor:"#007aff",borderWidth:1}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ inventory: itemValue })}>
                                {this.state.sublist.map((x)=>{
                                    return(
                                        <Picker.Item label={x.item} value={x.item} itemStyle={{color:"#007aff"}} />
                                    )
                                })}
                               
                            </Picker>
                        </View>
                    </View>
                </Modal>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <TouchableOpacity
                        onPress={() => { this.setState({ modalVisible: true }) }}
                        style={{ height: 60, width: 60, borderRadius: 60, backgroundColor: "orange", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 40, color: "#FFF" }}>+</Text>
                    </TouchableOpacity>
                </View>
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
    modalstyle: {
        height: 350,
        width: 350,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent:'center',
        alignContent:'center',
    }


});

function mapStateToProps(state, ownProps) {
    return ({
        Vendor: state.VendorDetails,
        Blood: state.BloodDetails,
        Vaccine: state.VaccineDetails,
        Medicine: state.MedicineDetails,
        Syringe: state.SyringeDetails
    })
}
export default connect(mapStateToProps)(ChangeSupply);