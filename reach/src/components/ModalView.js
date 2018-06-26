import React from 'react';
import {Button,Modal,Text,View} from 'react-native-router-flux';

class ModalView extends React.Component{
    constructor(props){
        super(props);
        this.state={modalVisible:this.props.visible}
    }
    render(){
        return(
            <Modal animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View>
              <Text>Hello World!</Text>
            </View>
            </Modal>
        );
    }
}

export default ModalView;