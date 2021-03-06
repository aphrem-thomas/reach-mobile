import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Root from './src/components/root.js'
import FrontPage from './src/components/FrontPage.js'
import RefugeeSecondPage from './src/components/refugeeSecondPage.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { combineReducers } from 'redux';
import {refreshUpdate,doctorDetails,refugeeIdField,physicianIdField,dependentRecord, dependentPage, guardian} from './src/components/reducers/reducer_refugee.js';
import {refresh_vaccine,refresh_medicine,refresh_syringe,refresh_blood,VendorDetails} from './src/components/reducers/reducer_supply.js';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import UserPage from './src/components/UserPage.js';
import UserOption from './src/components/UserOption.js';
import * as actonCreator from './src/components/action/actionCreator.js';
import { createStackNavigator } from 'react-navigation';
import UnoSignIn from './src/components/UnoSignIn.js';
import VendorPage from './src/components/VendorPage.js';
import physiciansPage from './src/components/physiciansPage.js';
import {Font} from 'expo';

const TheReducer=combineReducers({
  PhysicianField:physicianIdField,
  RefugeeDetails:refreshUpdate,
  VaccineDetails:refresh_vaccine,
  MedicineDetails:refresh_medicine,
  SyringeDetails:refresh_syringe,
  BloodDetails:refresh_blood,
  DoctorDetails:doctorDetails,
  VendorDetails:VendorDetails,
  RefugeeField:refugeeIdField,
  Dependent:dependentRecord,
  DependentPage:dependentPage,
  Guardian:guardian,

});

const store= createStore(TheReducer,applyMiddleware(thunk));

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={fontLoaded:false};
}
componentDidMount(){
  Font.loadAsync({
      'playfair': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
      'lato': require('./assets/fonts/Lato-Regular.ttf'),
      'roboto': require('./assets/fonts/Roboto-Light.ttf'),
    }).then(()=>{this.setState({fontLoaded:true});
    console.log("************************* slabo loaded *****************8 ")});
}
  render(){
    return(
      this.state.fontLoaded?
      <Provider store={store}>
        <Router navigationBarStyle={{ backgroundColor: 'transparent' }}>
            <Scene key="root" hideNavBar>
              <Scene key="frontpage">
                <Scene  title="ReACH" key="firstpage" component={FrontPage} hideNavBar initial/>
                <Scene  title="Select your account" key="refugeesecondpage" component={RefugeeSecondPage}/>
                {/* <Scene title="SupplyChain" key="supplychain" component={SupplySecondPage} /> */}
                <Scene  title="User Page" key="userpage" component={UserPage}/>
              </Scene>
                <Scene key="doctorView">
                  <Scene type='replace'  title="Physician's page" key="doctorpage1" component={physiciansPage} initial/>
                  <Scene type='replace'  title="Physician's page" key="doctorpage2" component={UserPage}/>
                </Scene>
                <Scene key="VendorView">
                  <Scene type='replace' title="UN Official's page" key="vendorpage" component={VendorPage}/>
                </Scene>
            </Scene>
        </Router>
      </Provider>:null
    );
  }
}
export default App;

// export default createStackNavigator({
//   Home: {
//     screen: FrontPage,
//     navigationOptions: {
//       header: null,
//     }
//   },
// });