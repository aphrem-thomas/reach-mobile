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
    UIManager,
    Dimensions,
    Modal,
    ProgressBarAndroid,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
// import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import UserLabel from './UserLabel.js';
import NewButton from './Button.js';
import { Router, Scene, Stack } from 'react-native-router-flux';
import UserOption from './UserOption.js';
import UserMedicalRecord from './UserMedicalRecord.js';
import UserVaccineRecord from './UserVaccineRecord.js';
import ClickCard from './clickCard.js';
import DependentList from './dependentList.js';

class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            medicalbutton: false,
            vaccinebutton: false,
            modalView: false,
            dependentPage: false,
            dependingOn: null
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        var { height, width } = Dimensions.get('window');
    }
    componentWillMount() {
        let arrayChildren = [];
        let children = this.props.refugee.children;
        if (children) {
            children.map((item) => {
                let child1 = item.child.split('#');
                arrayChildren.push(child1[1])
            })
        }
        let parent = this.props.refugee.parents;
        if (parent) {
            let father = parent.father.split('#');
            let mother = parent.mother.split('#');
            arrayChildren.push(father[1]);
            arrayChildren.push(mother[1]);
        }
        this.props.dispatch(actionCreator.emptyDependent());
        console.log("array children" + arrayChildren)
        arrayChildren.map((item) => {
            //otherwise everytime we go back and return to same screen child list will get populated
            this.props.dispatch(actionCreator.updateDependent(item, this.props.refugee.refugeeId))

        })
    }
    componentWillUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        // console.log("dependent page is : "+this.props.dependentPage);
        // console.log("guardan is : "+this.props.guardian);
    }

    onClickVaccine() {
        this.setState({
            medicalbutton: false,
            vaccinebutton: true,
        })
    }

    onBack() {
        this.props.dispatch(actionCreator.emptyDependent());
        this.props.dispatch(actionCreator.resetdependentpage());
        this.props.dispatch(actionCreator.guardian(null));
        this.props.dispatch(actionCreator.fetch(this.props.guardian)).then(()=>{
            this.componentWillMount();
        })
       
    }

    onClickMedical() {
        this.setState({
            medicalbutton: true,
            vaccinebutton: false,
            modalView: true,
        })
    }
    logout() {
        this.props.dispatch(actionCreator.emptyRefugee());
        this.props.dispatch(actionCreator.emptyPhysician());
        this.props.dispatch(actionCreator.emptyDependent());
        this.props.dispatch(actionCreator.resetdependentpage());
        this.props.dispatch(actionCreator.clearPhysicianIdField());
        this.props.dispatch(actionCreator.clearRefugeeIdField())
        Actions.pop();
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
        if (this.props.refugee.children != null && this.props.refugee.parents != null) {
            let dependentnumber = this.props.refugee.children.length;
            if (this.props.refugee.parents.fater != null)
                dependentnumber++;
            if (this.props.refugee.parents.mother != null)
                dependentnumber++;
        }
        return (
            <View style={{ flex: 1 }}>
                {/* <UserLabel onLogout={this.logout.bind(this)} backbutton={this.props.guardian} onBack={this.onBack.bind(this)}/> */}
                <View style={{flex:1}}>
                <View style={{ flex: 1 }}>
                    <ImageBackground source={{ uri: this.props.refugee.refugeeImage }} style={{ flex: 1,justifyContent:'flex-end'}}>
                    
                    {this.props.guardian?
                    <TouchableOpacity onPress={this.onBack.bind(this)}><Text style={{color:"#007aff", fontSize:15}}>back</Text></TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.logout.bind(this)}><Text style={{color:"#007aff", fontSize:15}}>logout</Text></TouchableOpacity>
                }
                    
                    
                    <View style={{backgroundColor:'rgba(0,0,0,.7)',alignItems:'center'}}>
                        <Text style={{color:"#FFF", fontSize:20}}>Name: {this.props.refugee.firstName}</Text>
                    </View>
                    </ImageBackground>
                </View>
                <View style={styles.tabbuttons}>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Button onPress={this.onClickMedical.bind(this)} disabled={this.state.medicalbutton} style={{ height: 30 }} title="Medical Record" />
                    </View>
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Button onPress={this.onClickVaccine.bind(this)} disabled={this.state.vaccinebutton} style={{ height: 30 }} title="Vaccine Record" />
                    </View>
                </View>
                </View>
                    {this.chooseComponent()}
                <View style={{flex:1}}>
                    {this.props.refugee.children ?
                        <ScrollView style={{ flex: 1 }} onScroll={() => { this.setState({ medicalbutton: false, vaccinebutton: false }) }}>
                            {this.props.dependent.length == this.props.refugee.children.length ?
                                <DependentList /> : !this.props.dependentPage ?
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <ProgressBarAndroid style={{ width: 200 }} styleAttr="Horizontal" color="#2196F3" />
                                    </View> : null}
                        </ScrollView> : null}
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
    modalstyle: {
        height: 400,
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    sectionStyle: {
        flex: 4,
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
    },
    dependentStyle: {
        backgroundColor: "#FFF",
        marginTop: '5',
        marginRight: '3',
        marginLeft: '3',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation: 1,

    }

});
function mapStateToProps(state, ownProps) {
    return ({
        refugee: state.RefugeeDetails,
        dependent: state.Dependent,
        dependentPage: state.DependentPage,
        guardian: state.Guardian
    });
}
export default connect(mapStateToProps)(UserPage);