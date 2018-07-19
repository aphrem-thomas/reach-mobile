import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, TextInput, Image, Button, ScrollView } from 'react-native';
import { difference } from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import UserLabel from './UserLabel.js';
import { Router, Scene, Stack } from 'react-native-router-flux';
import UserOption from './UserOption.js';
import { Table, Row, Rows } from 'react-native-table-component';
import VaccineDone from './VaccineDone.js';
import VaccineNotDone from './VaccineNotDone.js';
import * as actionCreator from './action/actionCreator.js';

class UserVaccineRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "vacc": "done" }

    }

    done() {
        this.setState({ vacc: "done" })
    }

    notdone() {
        this.setState({ vacc: "notdone" })
    }
    render() {
        var mandatoryVacc = [
            "DEPTERIA", "ROTAVIRUS", "MMR", "HPV", "TDAP", "MEASLES", "MUMPS", "HEPATITISA", "HEPATITISB", "POLIO"];
        var vaccinedone = [];
        var vaccinenot = [];
        if (this.props.refugee.vaccinationRecords) {
            this.props.refugee.vaccinationRecords.map((item) => {
                vaccinedone.push(item.vaccineName);
            });
        }
        console.log("vaccine done" + vaccinedone);
        vaccinenot = difference(mandatoryVacc, vaccinedone);
        return (
            <View>
                <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 10 }}>Vaccine Record</Text>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'flex-start', marginLeft: 20 }}>
                            <Button onPress={this.done.bind(this)} title="Completed" color="#1e7519" />
                        </View>
                        <View style={{ justifyContent: 'flex-end', marginRight: 10, marginLeft: 170 }}>
                            <Button onPress={this.notdone.bind(this)} title="Pending" color="#b7180c" />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <ScrollView style={{ height: 250 }}>
                            <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
                                {
                                    this.state.vacc == "done" ?(this.props.refugee.vaccinationRecords)?
                                     this.props.refugee.vaccinationRecords.map((item, i) => {
                                        return (<VaccineDone key={i} vaccine={item.vaccineName} date={item.date} location={item.location} camp={item.camp} />)}):
                                        <Text>No vaccines administered</Text>: vaccinenot.map((item, i) => {
                                        console.log("inside vaccinecross");
                                        return (<VaccineNotDone key={i} vaccine={item} />)
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
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
    container:
        {
            flex: 1, padding: 16, paddingTop: 30,
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
        refugee: state.RefugeeDetails,
        doctor: state.DoctorDetails
    });
}
export default connect(mapStateToProps)(UserVaccineRecord);