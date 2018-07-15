import React from 'react';
import RectNative from 'react-native';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    Modal
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import UserLabel from './UserLabel.js';
import { Router, Scene, Stack } from 'react-native-router-flux';
import UserOption from './UserOption.js';
import { Table, Row, Rows } from 'react-native-table-component';
import * as actionCreator from './action/actionCreator.js';
import ModalView from './ModalView.js';
import InputText from './InputText.js';
import DatePick from './DatePicker.js';
import Spinner from './Spinner.js';
import DatePicker from 'react-native-datepicker';
import Button from './Button.js'
class UserMedicalRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Date', 'Hospital', 'Medical Issue', 'Physician', 'Admited', 'Released', 'Prescription'],
            widthArr: [40, 60, 80, 100, 120, 140, 160],
            modalVisible: false,
            admdays: 0,
            hostpitalName: null,
            issue: null,
            prescription: null,
            loading: false,
            admitDate:null,
            releaseDate:null
        }
    }
    onPress() {
        this.setState({ modalVisible: true })
    }
    updateMedical() {
        this.setState({ loading: true });
        console.log("hospital name is " + this.state.hostpitalName);
        let data = {
            "refugee": this.props.refugee.refugeeId,
            "doctor": this.props.doctor.name,
            "date": this.props.doctor.date,
            "hospital": this.state.hostpitalName,
            "issue": this.state.issue,
            "admitDate": this.state.admitDate,
            "dischargeDate": this.state.releaseDate,
            "treatment": "",
            "prescription": this.state.prescription

        }
        console.log("data in usermedical record " + JSON.stringify(data));
        this.props.dispatch(actionCreator.updateMedicalRecord(this.props.refugee.refugeeId, data)).then(() => {
            this.setState({ loading: false, modalVisible: false })

        })
    }
    buttonChoose() {
        if (this.props.doctor.name != null) {
            return (<Button onPress={this.onPress.bind(this)} background="#007aff" title="Add" />)
        }
    }

    updatebutton() {
        if (this.state.loading) {
            return (<Spinner size="small" />)
        }
        else {
            return (<Button title="Update" background="#007aff" onPress={this.updateMedical.bind(this)} />)
        }
    }
    flipState() {
        this.setState({ modalVisible: false })
    }
    render() {
        let medicalRecords = [{ "date": "1/2/2018", "hospital": "akfjldk", "issue": "jdljkfds", "physician": "kjdkfaf#dan", "admitDate": "03/25/2015", "dischargeDate": "2/5/2018", "prescription": "fa;ldkfj;" }];
        const state = this.state;
        const tableData = [];
        this.props.refugee.medicalRecords.map((item) => {
            let temp = [];
            let doc = item.physician.split('#');
            temp.push(item.date);
            temp.push(item.hospital);
            temp.push(item.issue);
            temp.push(doc[1]);
            temp.push(item.admitDate);
            temp.push(item.dischargeDate);
            temp.push(item.prescription);
            tableData.push(temp);
        })


        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Medical Record</Text>
                <ScrollView horizontal={true} style={{ flex: 1 }}>
                    <View style={{ flex: 1 }} >
                        <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                                {
                                    tableData.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={state.widthArr}
                                            style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
                {this.buttonChoose()}

                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={styles.modalstyle}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <View style={styles.modalstyle}>
                            <Text style={{ fontSize: 40, color: "#007aff" }}>Enter Medical report</Text>
                            <InputText label="Hospital Name" value={this.state.hostpitalName} onChangeText={(data) => { this.setState({ hostpitalName: data }); console.log() }} />
                            <InputText label="issue" value={this.state.issue} onChangeText={(data) => { this.setState({ issue: data }) }} />
                            <InputText label="Prescription" value={this.state.prescription} onChangeText={(data) => { this.setState({ prescription: data }) }} />
                            <View style={{flex:1,justifyContent:'center',flexDirection:'row'}}>                           
                            <Text style={{fontSize:20,color:"#FFF"}}>Admit Date</Text><DatePicker
                                style={{ width: 150}}
                                date={this.state.admitDate}
                                mode="date"
                                placeholder="Admit date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2100-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    },
                                    dateText:{
                                        color:"#FFF"
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { this.setState({ admitDate: date }) }}
                            />
                            </View>
                            <View style={{flex:1,justifyContent:'center',flexDirection:'row'}}>
                            <Text style={{fontSize:20,color:"#FFF"}}>Release Date</Text><DatePicker
                                style={{ width: 150}}
                                date={this.state.releaseDate}
                                mode="date"
                                placeholder="Discharge date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2100-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    },
                                    dateText:{
                                        color:"#FFF"
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { this.setState({ releaseDate: date }) }}
                            />
                            </View>
                            {this.updatebutton()}
                            <Button title="close" background="red" onPress={this.flipState.bind(this)} />
                        </View>


                    </View>
                </Modal>
                

            </View>
        )
    }
    componentDidMount() {
        this.intervalvariable = setInterval(() => {
            this.props.dispatch(actionCreator.fetch(this.props.refugee.refugeeId))
        }, 5000)
    }
    componentWillUnmount() {
        clearInterval(this.intervalvariable);
    }
}

const styles = StyleSheet.create({
    tabbuttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,


    },
    modalstyle: {
        height: 500,
        width: 350,
        backgroundColor: 'rgba(0,0,0,0.75)',
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    container:
        {
            flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#FFF'
        },
    header:
        {
            height: 50, backgroundColor: '#537791'
        },
    text:
        {
            textAlign: 'center', fontWeight: '100'
        },
    dataWrapper:
        {
            marginTop: -1,
        },
    row:
        {
            height: 40, backgroundColor: '#E7E6E1'
        },
    inputStyle: {
        height: 50,
        width: 150,
        borderWidth: 1,
        borderColor: '#007aff',
        borderRadius: 10,
        backgroundColor: '#FFF',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5

    },
    textStyle: {
        color: "#000",
        paddingLeft: 5,
        paddingRight: 5
    }

});
function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
        refugee: state.RefugeeDetails,
        doctor: state.DoctorDetails,
        physicianId: state.PhysicianField
    });
}
export default connect(mapStateToProps)(UserMedicalRecord);