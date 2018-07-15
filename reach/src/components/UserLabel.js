import React from 'react';
import RectNative from 'react-native';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import Button from './Button.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreator from './action/actionCreator.js';
class UserLabel extends React.Component {
    // clickHandle1(){
    //     Actions.refugeesecondpage();
    // }
    constructor(props) {
        super(props);
    }
 
    backbutton() {
        if (this.props.guardian != null) {
            return (<TouchableOpacity onPress={this.props.onLogout}>
                        <Text style={{ color: "#007aff" }}>back</Text>
                    </TouchableOpacity>)
        } else return null;
    }

render(){
    return (
        <View style={styles.viewStyle}>
            <Image source={{ uri: this.props.refugee.refugeeImage }} style={styles.imageStyle} />
            <View style={styles.userinfovertical}>
                <View style={styles.userinfohorizontal}>
                    <Text>Name : </Text>
                    <Text style={styles.textStyle}>{this.props.refugee.firstName}</Text>
                </View>
                <View style={styles.userinfohorizontal}>
                    <Text>Nationality : </Text>
                    <Text style={styles.textStyle}>{this.props.refugee.nationality}</Text>
                </View>
                <View style={styles.userinfohorizontal}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={this.props.onLogout}>
                            <Text style={{ color: "#007aff" }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.guardian!=null?<TouchableOpacity onPress={this.props.onLogout}>
                        <Text style={{ color: "#007aff" }}>back</Text>
                    </TouchableOpacity>:null}
                </View>
            </View>
        </View>
    );

}
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
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
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: 3,
        marginBottom: 3,

    },
    userinfovertical: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: 15
    },
    userinfohorizontal: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',

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
        guardian: state.Guardian
    });
}
export default connect(mapStateToProps)(UserLabel);