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
class VendorPage extends React.Component {
   
    constructor(props) {
        super(props);
       
        this.state = {
            medicinebutton: false,
            vaccinebutton: false,
            bloodbutton:false,
            syringbutton:false,
            loading: false,
            dependentPage:false,
            dependingOn:null
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
        this.props.dispatch(actionCreator.Vaccine()).then(()=>{this.setState({loading:false})});
        this.setState({
            medicinebutton: false,
            vaccinebutton: true,
            syringbutton:false,
            bloodbutton:false,
            loading:true,
        })
    }

    onClickMedicine() {
        this.props.dispatch(actionCreator.Medicine()).then(()=>{this.setState({loading:false})});
        this.setState({
            medicinebutton: true,
            vaccinebutton: false,
            syringbutton:false,
            bloodbutton:false,
            loading:true,
        })
    }

    onClickSyringe() {
        this.props.dispatch(actionCreator.Syringe()).then(()=>{this.setState({loading:false})});
        this.setState({
            medicinebutton: false,
            vaccinebutton: false,
            syringbutton: true,
            bloodbutton:false,
            loading:true,
        })
    }

    onClickBlood() {
        this.props.dispatch(actionCreator.Blood()).then(()=>{this.setState({loading:false})});
        this.setState({
            medicinebutton: false,
            vaccinebutton: false,
            syringbutton:false,
            bloodbutton:true,
            loading:true,
        })
    }
    logout() {
        this.props.dispatch(actionCreator.emptyRefugee());
        this.props.dispatch(actionCreator.emptyPhysician());
        this.props.dispatch(actionCreator.emptyDependent());
        Actions.pop();
    }


    chooseComponent() {
        if (this.state.medicinebutton) {
            if(this.state.loading){
                return(
                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <ProgressBarAndroid style={{ width: 200 }} styleAttr="Horizontal" color="#2196F3" />
                </View>)
            }
            else{
            return (<View style={styles.sectionStyle}>
                <MedicineList/>
            </View>);
            }
        }
        else if (this.state.vaccinebutton) {
            if(this.state.loading){
                return(
                    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                    <ProgressBarAndroid style={{ width: 200 }} styleAttr="Horizontal" color="#2196F3" />
                    </View>)
                }
            else{
            return (<View style={styles.sectionStyle}>
                <VaccineList/>
            </View>);
            }
        }
        else if (this.state.syringbutton){
            if(this.state.loading){
                return(
                    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                    <ProgressBarAndroid style={{ width: 200 }} styleAttr="Horizontal" color="#2196F3" />
                    </View>)
                }
            else{
            return (<View style={styles.sectionStyle}>
                <SyringeList/>
            </View>);
            }
        }
        else if(this.state.bloodbutton){
            if(this.state.loading){
                return(
                    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                    <ProgressBarAndroid style={{ width: 200 }} styleAttr="Horizontal" color="#2196F3" />
                    </View>)
                }
            else{
            return (<View style={styles.sectionStyle}>
                <BloodList/>
            </View>);
            }
        }
    }
    render() {
        
        return (
            <View style={{ flex: 1 }}>
                
                <View style={styles.scrollside}>
                    <ScrollView horizontal={true} style={{ flex: 1 }}>
                        <ClickCard
                            style={{ flex: 1 }}
                            backgroundColor='#FFF'
                            height={180}
                            width={150}
                            onPress={this.onClickBlood.bind(this)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("./images/blood.png")} resizeMode='contain' style={{ height: 140, width: 140, justifyContent: 'center' }} />
                                <Text style={{ fontSize: 20 }}>Blood</Text>
                            </View>
                        </ClickCard>
                        <ClickCard
                            style={{ flex: 1 }}
                            backgroundColor='#FFF'
                            height={180}
                            width={150}
                            onPress={this.onClickVaccine.bind(this)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("./images/vaccine.png")} resizeMode='contain' style={{ height: 140, width: 140, justifyContent: 'center' }} />
                                <Text style={{ fontSize: 20 }}>Vaccine</Text>
                            </View>
                        </ClickCard>
                        <ClickCard
                            style={{ flex: 1 }}
                            backgroundColor='#FFF'
                            height={180}
                            width={150}
                            onPress={this.onClickMedicine.bind(this)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("./images/medicine.png")} resizeMode='contain' style={{ height: 140, width: 140, justifyContent: 'center' }} />
                                <Text style={{ fontSize: 20 }}>Medicine</Text>
                            </View>
                        </ClickCard>
                        <ClickCard
                            style={{ flex: 1 }}
                            backgroundColor='#FFF'
                            height={180}
                            width={150}
                            onPress={this.onClickSyringe.bind(this)}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("./images/syringe.png")} resizeMode='contain' style={{ height: 140, width: 140, justifyContent: 'center' }} />
                                <Text style={{ fontSize: 20 }}>Syringe</Text>
                            </View>
                        </ClickCard>

                    </ScrollView>
                </View>

                <View style={{ flex: 4}}>
                    {this.chooseComponent()}
                    
                </View>
                <View style={{ flex: 1 }}>
                    <ChangeSupply/>  
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
        refugee: state.RefugeeDetails,
        dependent: state.Dependent,
        dependentPage:state.DependentPage,
        guardian:state.Guardian
    });
}
export default connect(mapStateToProps)(VendorPage);