import React from 'react';
import RectNative from 'react-native';
import * as actionCreator from './action/actionCreator.js';

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
import ClickCard from './clickCard.js';
class UserPage extends React.Component {
    // clickHandle1(){
    //     Actions.refugeesecondpage();
    // }
    constructor(props) {
        super(props);
        this.state = {
            medicalbutton: false,
            vaccinebutton: false,
            parentbutton: false,
            childrenbutton: false
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentWillMount(){
        let arrayChildren = [];
        let children = this.props.refugee.children;
        if (children) {
            children.map((item) => {
                let child1 = item.child.split('#');
                arrayChildren.push(child1[1])
            })
        }
        let parent=this.props.refugee.parents;
        if (parent) {
            let father = parent.father.split('#');
            let mother = parent.mother.split('#');
            arrayChildren.push(father[1]);
            arrayChildren.push(mother[1]);
        }
        this.props.dispatch(actionCreator.emptyDependent());
        console.log("array children"+arrayChildren)
        arrayChildren.map((item) => {
              //otherwise everytime we go back and return to same screen child list will get populated
                this.props.dispatch(actionCreator.updateDependent(item, this.props.refugee.refugeeId))
         
        })
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
                <ScrollView>
                    {this.chooseComponent()}
                    {this.props.dependent.map((item,i)=>{
                        return(
                        <ClickCard key={i} height={60} width={250}>
                            <Image source={{uri:item.image}} style={{height:50,width:50, borderRadius:50}}/>
                        </ClickCard>
                    )
                    })}
                </ScrollView>
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
        refugee: state.RefugeeDetails,
        dependent:state.Dependent
    });
}
export default connect(mapStateToProps)(UserPage);