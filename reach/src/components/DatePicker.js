import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import {View , Text} from 'react-native';
export default class DatePick extends Component {
  constructor(props){
    super(props)
  }
 
  render(){
    return (
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text>{this.props.label}</Text>
      <DatePicker
        style={{width: 150, marginTop:5}}
        date={this.props.label}
        mode="date"
        placeholder={this.props.label}
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          
        }}
        onDateChange={(date) => {()=>{this.props.onDateChange}}}
      />
      </View>
    )
  }
}