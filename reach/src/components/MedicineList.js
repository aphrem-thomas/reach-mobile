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
class MedicineList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Type', 'Quantity'],
            widthArr: [150, 150],
            }
    }
   

    render() {
        const state = this.state;
        const tableData = [];
        if(this.props.Medicine){
        this.props.Medicine.map((item) => {
            let temp = [];
            temp.push(item.medicineName);
            temp.push(item.quantity);
            tableData.push(temp);
        })}


        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Medicine Details</Text>
                    <View style={{ flex: 1}} >
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
            </View>
        )
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
            flex:1, padding: 16, paddingTop: 30, backgroundColor: '#FFF',justifyContent:'center'
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
            marginTop: -1
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
       Medicine:state.MedicineDetails
    });
}
export default connect(mapStateToProps)(MedicineList);