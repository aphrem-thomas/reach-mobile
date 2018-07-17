import React from 'react';
import { Text, View, TouchableOpacity,Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class MyCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    savedImage:null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    if(this.props.camface=="front")
        this.setState({type: Camera.Constants.Type.front})
    else
        this.setState({type: Camera.Constants.Type.back})
  }
  snap = async () => {
    if (this.camera) {
        console.log("camera is on");
        let photo = await this.camera.takePictureAsync().then((data)=>{
            this.setState({savedImage:data.uri})
        });
    }
};
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }} >
            
            {this.state.savedImage==null?<View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                 this.snap();
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Click to take picture{' '}
                </Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{flex:1}}>
                <Image style={{flex:1}} source={{uri:this.state.savedImage}}/>
            </View>}
            
            
          </Camera>
          
        </View>
      );
    }
  }
}