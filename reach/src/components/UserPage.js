import React from 'react';
import RectNative from 'react-native';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    Button,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
// import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import UserLabel from './UserLabel.js';
import { Router, Scene, Stack } from 'react-native-router-flux';
import UserOption from './UserOption.js';
import UserMedicalRecord from './UserMedicalRecord.js';
import UserVaccineRecord from './UserVaccineRecord.js';
class UserPage extends React.Component {
    // clickHandle1(){
    //     Actions.refugeesecondpage();
    // }
    constructor(props) {
        super(props);
        this.state = {
            medicalbutton: true,
            vaccinebutton: false,
            parentbutton: false,
            childrenbutton: false
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentWillUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    onClickChildren() {
        this.setState({
            medicalbutton: false,
            vaccinebutton: false,
            parentbutton: false,
            childrenbutton: true
        })
    }

    onClickParent() {
        this.setState({
            medicalbutton: false,
            vaccinebutton: false,
            parentbutton: true,
            childrenbutton: false
        })
    }

    onClickVaccine() {
        this.setState({
            medicalbutton: false,
            vaccinebutton: true,
            parentbutton: false,
            childrenbutton: false
        })
    }

    onClickMedical() {
        this.setState({
            medicalbutton: true,
            vaccinebutton: false,
            parentbutton: false,
            childrenbutton: false
        })
    }

    chooseComponent() {
        if (this.state.medicalbutton) {
            return (<View style={styles.sectionStyle}>
                <UserMedicalRecord />
            </View>);
        }
        else if (this.state.vaccinebutton) {
            return (<View style={styles.sectionStyle}>
                <UserVaccineRecord />
            </View>);
        }
        else if (this.state.vaccinebutton)
            return null;
        else
            return null;
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <UserLabel />
                <View style={styles.tabbuttons}>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Button onPress={this.onClickMedical.bind(this)} disabled={this.state.medicalbutton} style={{ height: 30 }} title="Medical Record" />
                    </View>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Button onPress={this.onClickVaccine.bind(this)} disabled={this.state.vaccinebutton} style={{ height: 30 }} title="Vaccine Record" />
                    </View>
                </View>
               
                <View style={{ flex: 1 }}>
                    {this.chooseComponent()}
                </View>
            </View>
        );

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
    sectionStyle: {
        flex: 1,
        backgroundColor: "#FFF",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation: 1,
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
        refugee: state.RefugeeDetails
    });
}
export default connect(mapStateToProps)(UserPage);