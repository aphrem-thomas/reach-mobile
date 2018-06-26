import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, TextInput, Image, Button,ScrollView,Modal } from 'react-native';
// import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import UserLabel from './UserLabel.js';
import { Router, Scene, Stack } from 'react-native-router-flux';
import UserOption from './UserOption.js';
import { Table, Row, Rows } from 'react-native-table-component';
import * as actionCreator from './action/actionCreator.js';
import ModalView from './ModalView.js';

class UserMedicalRecord extends React.Component{ 
constructor(props) {
    super(props);
    this.state = {
        tableHead: ['Date', 'Hospital', 'Medical Issue', 'Physician', 'Admited', 'Released', 'Prescription'],
        widthArr: [40, 60, 80, 100, 120, 140, 160],
        modalVisible:false
    }
}
onPress(){
    this.setState({modalVisible:true})
}
buttonChoose(){
    if(this.props.doctor.name!=null){
        return(<Button onPress={this.onPress.bind(this)} title="Add"/>)
    }
}
flipState(){
    this.setState({modalVisible:false})
}
render(){
    let medicalRecords=[{"date":"1/2/2018", "hospital":"akfjldk","issue":"jdljkfds","physician":"kjdkfaf#dan","admitDate":"03/25/2015","dischargeDate":"2/5/2018","prescription":"fa;ldkfj;"}];
    const state = this.state;
    const tableData = [];
    this.props.refugee.medicalRecords.map((item)=>{
        let temp=[];
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
            <Text style={{fontSize:20}}>Medical Record</Text>
            <ScrollView horizontal={true}>
                <View>
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
            <View style={{justifyContent:"center",alignItems:'center',flex:1}}>
            <View style={styles.modalstyle}>
            <View>
              <Text>Hello World!</Text>
            </View>
            <Button title="close" onPress={this.flipState.bind(this)}/>
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
    modalstyle:{
        height:400,
        width:300,
        backgroundColor:'rgba(0,0,0,0.75)',
        borderRadius:10
    },
    container:
        {
            flex: 1, padding: 16, paddingTop: 30
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
        refugee:state.RefugeeDetails,
        doctor:state.DoctorDetails,
        physicianId: state.PhysicianField
    });
}
export default connect(mapStateToProps)(UserMedicalRecord);