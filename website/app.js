/* Global Variables */

// const { get } = require("http");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//Api_Key and Base_Url
const API_KEY = `&appid=517812ab5025e0f7a32d33b648544845`;
const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
//Fetching data from api
const getData = async(BASE_URL,zip,API_KEY)=>{
    const response = await fetch(BASE_URL+zip+API_KEY);
    try{
    const data = await response.json();
    return data;
    }catch(error){
        alert('zip does not exist')
    }
}
//generate button
const generate = document.getElementById('generate');
generate.addEventListener('click',(e)=>{
    let zip = document.getElementById('zip').value
    let feelings = document.getElementById('feelings').value;
    getData(BASE_URL,zip,API_KEY)//Call fetching data from api
    .then(data=>postData('/postdata',{date:newDate,temp:data.main.temp,feelings:feelings}))
//another chain promise to call updateUi function
    .then(()=>updataUi())
})

//Posting data in the app in the path or route
const postData = async ( url = '', data = {})=>{
     const response = await fetch(url, {  
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     credentials: 'same-origin', // include, *same-origin, omit
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify(data), // body data type must match "Content-Type" header        
   });
     try {    
       const newData = await response.json();
       return newData
     }catch(error) {
     console.log("error from posting data", error);
     // appropriately handle the error
     }
 }

 //Update Ui
const updataUi = async ()=>{
    const response = await fetch('/alldata')
    try{
        const allData = await response.json();
        document.getElementById('temp').innerHTML = `date :${allData.date}`;
        document.getElementById('date').innerHTML =`temp :${allData.temp}`;
        document.getElementById('content').innerHTML = `feelings :${allData.feelings}`;
    }catch(error){alert('Error in UpdateUi')}
}
