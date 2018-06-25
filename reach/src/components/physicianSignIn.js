import React from 'react';
import RectNative from 'react-native';
import { LayoutAnimation } from 'react-native';
import { Text, View, StyleSheet, KeyboardAvoidingView, Picker, ScrollView } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import InputText from './InputText.js';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js'
class PhysicianSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state={picker1:"Country", picker2:"Location"}
    }
    onPress() {

    }

    render() {
        return (

            <KeyboardAvoidingView style={styles.viewStyle} behavior={"position"} enabled>
            <ScrollView>
                <Text style={{ flex: 1, fontSize: 30 }}>Physician signin</Text>
                <View style={{ flex: 4 }}>
                    <InputText label="Refugee ID" value={this.props.refugeeId} onChangeText={(text) => {
                        this.props.dispatch(actionCreator.refugeeIdField(text))
                    }} />
                    <InputText label="Physician ID" value={this.props.physicianId} onChangeText={(text) => {
                        this.props.dispatch(actionCreator.physicianIdField(text))
                    }} />
                    <InputText secureTextEntry={true} label="Password" />
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <View style={styles.pickerStyle}>
                    <Picker 
                        selectedValue={this.state.picker1}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ picker1: itemValue })}>
                        <Picker.Item label="Country" value="Country" />
                        <Picker.Item label="Turkey" value="Turkey" />
                        <Picker.Item label="Iran" value="Iran" />
                    </Picker>
                    </View>
                    <View style={styles.pickerStyle}>
                    <Picker 
                        selectedValue={this.state.picker2}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ picker2: itemValue })}>
                        <Picker.Item label="Location" value="Location" />
                        <Picker.Item label="Turkey" value="Turkey" />
                        <Picker.Item label="Iran" value="Iran" />
                    </Picker>
                    </View>
                    </View>
                    <Button title="submit" />
                </View>
                </ScrollView>
            </KeyboardAvoidingView>

        );

    }
}
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    pickerStyle:{
        borderWidth:1,
        borderColor:"#007aff",
        marginTop:5,
        borderRadius:2
    }


});

function mapStateToProps(state, ownProps) {
    return ({
        refugeeId: state.RefugeeField,
        physicianId: state.PhysicianField
    })
}
export default connect(mapStateToProps)(PhysicianSignIn);