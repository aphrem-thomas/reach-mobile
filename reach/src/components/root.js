import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './Navbar.js';
import ContentPane from './ContentPane.js';
export default class Root extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ContentPane/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
 
});
