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
import BloodList from './BloodList.js';
import VaccineList from './VaccineList.js';
import SyringeList from './SyringeList.js';
import MedicineList from './MedicineList.js';
import ChangeSupply from './ChangeSupply.js';
import InputText from './InputText.js';
import MyCamera from './camera.js';
import Spinner from './Spinner.js';
class PhysiciansPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            medicinebutton: false,
            vaccinebutton: false,
            bloodbutton: false,
            syringbutton: false,
            loading: false,
            dependentPage: false,
            dependingOn: null
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        var { height, width } = Dimensions.get('window');
    }
    
    componentWillUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        // console.log("dependent page is : "+this.props.dependentPage);
        // console.log("guardan is : "+this.props.guardian);
    }

    

   
    logout() {
        this.props.dispatch(actionCreator.emptyRefugee());
        this.props.dispatch(actionCreator.emptyPhysician());
        this.props.dispatch(actionCreator.emptyDependent());
        Actions.pop();
    }

    onSubmit(){
        this.props.dispatch(actionCreator.emptyRefugee());
        this.props.dispatch(actionCreator.emptyDependent());
        this.setState({ loading: true })
        if(this.props.refugeeIdField!=null){
            this.props.dispatch(actionCreator.fetch(this.props.refugeeIdField)).then(() => {
            this.setState({ loading: false })
            Actions.userpage();
        })}
        else{ this.props.dispatch(actionCreator.fetch('rf100')).then(() => {
            this.setState({ loading: false })
            Actions.userpage();
        })}
    }

    ButtonLoading() {
        if (this.state.loading)
            return (<Spinner size={"small"} color={"#007aff"} />);
        else
            return (<Button title="login" background="#007aff" onPress={this.onSubmit.bind(this)} />);

    }
    render() {

        return (
            <View style={styles.viewStyle}>

                <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text) => {
                    this.props.dispatch(actionCreator.refugeeIdField(text))
                }} />
                <Text style={{ color: 'orange', fontSize: 20 }}>OR</Text>
                <View style={{ height: 350, width: 250 }}>
                    <MyCamera />
                </View>
                {this.ButtonLoading()}


            </View>
        );

    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

    },
    scrollside: {

        marginLeft: 3,
        marginRight: 3,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },

});
function mapStateToProps(state, ownProps) {
    return ({
        refugeeIdField: state.RefugeeField,
        refugee: state.RefugeeDetails,
        dependent: state.Dependent,
        dependentPage: state.DependentPage,
        guardian: state.Guardian
    });
}
export default connect(mapStateToProps)(PhysiciansPage);