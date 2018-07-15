var axios =require('axios');

export function refresh(data){
    console.log("inside refresh");
    return({'type':"REFRESH", 'payload':data});
}

export function refugeeIdField(value){
    return({'type':'REFFIELD', 'payload':value})
}

export function physicianIdField(value){
    return({'type':'PHYFIELD', 'payload':value})
}

export function addDependent(value){
    return({type:'ADDDEPENDENT',payload:value})
}

export function setdependentpage(){
    return({type:'SETDEPENDENTPAGE'})
}

export function resetdependentpage(){
    return({type:'RESETDEPENDENTPAGE'})
}

export function guardian(id){
    return({type:'GUARDIAN',payload:id})
}

export function emptyRefugee(){
    return({type:"EMPTYREFUGEE"})
}
export function emptyPhysician(){
    return({type:"EMPTYPHYSICIAN"})
}
export function emptyDependent(){
    return({type:"EMPTYDEPENDENT"})
}

export function updateDependent(id,parent){
    return function(dispatch){
        return axios.get("https://hps-bna-client.mybluemix.net/getAssetDetails",{
            params: {
                param0: 'Refugee',
                param1:id
            }
          }).then((response)=>{
            console.log("parent is "+parent);
              let pid=parent;  
              let child={
                  "image":response.data.refugeeImage,
                  "name":response.data.firstName,
                  "dob":response.data.dob,
                  "id":response.data.refugeeId,
                  "parentId":pid
              }  
              
        return dispatch(addDependent(child));
        }).catch((error)=>{throw(error);}); 
}
}

export function fetch(id, callback){
    console.log("inside fetch with id:"+id);
    return(function(dispatch){
        return axios.get("https://hps-bna-client.mybluemix.net/getAssetDetails",{
            params: {
                param0: 'Refugee',
                param1:id
            }
          }).then((response)=>{  
        dispatch(refresh(response.data));
        }).catch((error)=>{throw(error);});
    })
}

export function updateVaccineRecord(id,data){
    return(function(dispatch){
        console.log("data received is"+JSON.stringify(data));
        return axios.post("https://hps-bna-client.mybluemix.net/calltransaction",
                {
                    'transactionName':data.transactionName,
                    'refugee':id,
                    'doctor':data.doctor,
                    'vaccine':data.vaccine,
                    'quantity':data.quantity,
                    'location': data.location,
                    'camp': data.camp,
                    'date': data.date
                }
                ).then((res)=>{
            dispatch(fetch(id));
        })
    })
}

export function updateMedicalRecord(id,data){
    console.log("checking data "+ JSON.stringify(data));
    return(function(dispatch){
        return axios.post("https://hps-bna-client.mybluemix.net/calltransaction",
        {
            "transactionName":"Treatment",
            "refugee":data.refugee,
            "doctor":data.doctor,
            "date": data.date,
            "hospital":data.hospital,
            "issue": data.issue,
            "treatment": data.treatment,
            "prescription":data.prescription,
            "admitDate":data.admitDate,
            "dischargeDate":data.dischargeDate
          }
          
    ).then(()=>{
            dispatch(fetch(id));
        })
    })
}


export function refresh_blood(data){
    return({'type':"REFRESH_BLOOD", 'payload':data});
}

export function refresh_syringe(data){
    return({'type':"REFRESH_SYRINGE", 'payload':data});
}

export function refresh_vaccine(data){
    return({'type':"REFRESH_VACCINE", 'payload':data});
}

export function refresh_medicine(data){
    return({'type':"REFRESH_MEDICINE", 'payload':data});
}

export function Blood(){
    return(function(dispatch){
        return axios.get("https://hps-bna-client.mybluemix.net/getAssetDetails",{
            params: {
                param0: 'Blood',
                param1:'all'
            }
          }).then((response)=>{ 
        dispatch(refresh_blood(response.data));
        }).catch((error)=>{throw(error);});
    })

}

export function Vaccine(){
    return(function(dispatch){
        return axios.get("https://hps-bna-client.mybluemix.net/getAssetDetails",{
            params: {
                param0: 'Vaccine',
                param1:'all'
            }
          }).then((response)=>{
        console.log(response.data);    
        dispatch(refresh_vaccine(response.data));
        }).catch((error)=>{throw(error);});
    })
}

export function Medicine(){
    return(function(dispatch){
        return axios.get("https://hps-bna-client.mybluemix.net/getAssetDetails",{
            params: {
                param0: 'Medicine',
                param1:'all'
            }
          }).then((response)=>{
        dispatch(refresh_medicine(response.data));
        }).catch((error)=>{throw(error);});
    })
}

export function Syringe(){
    return(function(dispatch){
        return axios.get("https://hps-bna-client.mybluemix.net/getAssetDetails",{
            params: {
                param0: 'Syringe',
                param1:'all'
            }
          }).then((response)=>{
        dispatch(refresh_syringe(response.data));
        }).catch((error)=>{throw(error);});
    })
}

export function updateDoctor(value){
    return({"type":"DOC_DTL","payload":value})
}

export function vendorDetails(data){
    return({type:'REFRESH_VENDOR',payload:data});
}


export function fetchVendor(id){
    console.log("id is "+id);
    return function(dispatch){
       return axios.get("https://hps-bna-client.mybluemix.net/getParticipantDetails",{
        params:{param0:'MedicalRepresentative',
                param1:id
            }}
    ).then((response)=>{
        dispatch(vendorDetails(response.data));
    }).catch((error)=>{
        console.log(error);
    })
        
    }
}


export function addAsset(data){
    console.log("inside addAsset checking "+data.quantity);
    return function(dispatch){
    return axios.post("https://hps-bna-client.mybluemix.net/calltransaction?",{
        transactionName:data.transactionName,
        assetId:data.assetId,
        rep:data.rep,
        quantity:Number(data.quantity)
      }
      
    ).then(()=>{
        switch(data.transactionName){
            case 'SupplyBlood':return dispatch(Blood());break;
            case 'SupplyMedicine':return dispatch(Medicine());break;
            case 'SupplyVaccine':return dispatch(Vaccine());break;
            case 'SupplySyringe':return dispatch(Syringe());break;
        }
    })
}
}

