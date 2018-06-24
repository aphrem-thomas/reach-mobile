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
        <Router navigationBarStyle={{ backgroundColor:'#4c4a49'}} titleStyle={{color:'#f9f9f9'}} >
            <Stack key="root">
                <Scene title="ReACH" key="firstpage" component={FrontPage} initial/>
                <Scene title="RefugeeSecondPage" key="refugeesecondpage" component={RefugeeSecondPage} />

            </Stack>
        </Router>
      </Provider>
    );
}
export default App;