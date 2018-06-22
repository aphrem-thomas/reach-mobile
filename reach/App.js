import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './src/components/Navbar.js';
import ContentPane from './src/components/ContentPane.js';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navbar/>
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
