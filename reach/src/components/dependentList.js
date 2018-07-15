import React from 'react';
import {Text,View, Image,Button,FlatList,StyleSheet} from 'react-native';
import NewButton from './Button.js';
import {connect} from 'react-redux';
import ClickCard from './clickCard.js';
import * as actionCreator from './action/actionCreator.js';

class DependentList extends React.Component{
    dependentPage(id){
        this.props.dispatch(actionCreator.guardian(this.props.refugee.refugeeId))
        this.props.dispatch(actionCreator.setdependentpage())
        this.props.dispatch(actionCreator.emptyDependent());
        this.props.dispatch(actionCreator.fetch(id));
    }
    render(){
        return(
            this.props.dependent.map((item, i) => {
                return (
                        <ClickCard  key={i} onPress={()=>{this.dependentPage(item.id)}}>
                        <View key={i} style={{
                            height:100,
                            backgroundColor:"#FFF",
                            borderRadius:10,
                            flexDirection:'row',
                            shadowColor: '#000000',
                            shadowOffset: {
                                width: 0,
                                height: 10
                            },
                            shadowRadius: 20,
                            shadowOpacity: 1.0,
                            elevation: 1,
                            alignItems:'center',
                            marginRight:5,
                            marginLeft:5,
                            marginTop:5,

                        }}>
                            <Image source={{ uri: item.image }} style={{ height: 70, width: 70, borderRadius: 70,marginLeft:20,marginRight:20}} />
                            <Text style={{fontSize:20}}>{item.name}</Text>
                        </View>
                        </ClickCard>
                )
            })
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

    }

});

function mapStateToProps(state,ownProps){
    return({
        refugee:state.RefugeeDetails,
        dependent:state.Dependent
    })
}

export default connect(mapStateToProps)(DependentList);