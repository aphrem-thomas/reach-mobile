import React from 'react';
import {ActivityIndicator,StyleSheet,View} from 'react-native';

class Spinner extends React.Component{
    render(){
        return(
            <View style={styles.SpinnerStyle}>
                <ActivityIndicator size={this.props.size} color={this.props.color}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    SpinnerStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    }
})

export default Spinner;