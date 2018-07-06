import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Root from './src/components/root.js'
import FrontPage from './src/components/FrontPage.js'
import RefugeeSecondPage from './src/components/refugeeSecondPage.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { combineReducers } from 'redux';
import {refreshUpdate,doctorDetails,refugeeIdField,physicianIdField} from './src/components/reducers/reducer_refugee.js';
import {refresh_vaccine,refresh_medicine,refresh_syringe,refresh_blood,VendorDetails} from './src/components/reducers/reducer_supply.js';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import UserPage from './src/components/UserPage.js';
import UserOption from './src/components/UserOption.js';
import * as actonCreator from './src/components/action/actionCreator.js';

const TheReducer=combineReducers({
  PhysicianField:physicianIdField,
  RefugeeDetails:refreshUpdate,
  VaccineDetails:refresh_vaccine,
  MedicineDetails:refresh_medicine,
  SyringeDetails:refresh_syringe,
  BloodDetails:refresh_blood,
  DoctorDetails:doctorDetails,
  VendorDetails:VendorDetails,
  RefugeeField:refugeeIdField

});

const store= createStore(TheReducer,applyMiddleware(thunk));

const App=()=>{
  
    return(
      <Provider store={store}>
        <Router navigationBarStyle={{ backgroundColor: 'rgba(0,0,225,0)' }}>
            <Stack key="root" hideNavBar>
              <Scene key="frontpage">
                <Scene style={{flex:1}} title="ReACH" key="firstpage" component={FrontPage} hideNavBar initial/>
                <Scene title="RMS" key="refugeesecondpage" component={RefugeeSecondPage}  />
                {/* <Scene title="SupplyChain" key="supplychain" component={SupplySecondPage} /> */}
                <Scene title="User Page" key="userpage" component={UserPage} />
              </Scene>
                <Scene key="doctorView">
                  <Scene title="RMS" key="doctorpage" component={UserPage}/>
                </Scene>
            </Stack>
        </Router>
      </Provider>
    );
}
export default App;