import Translatify from "./Translatify-SDK/index.js";

//setup picker
const picker = document.getElementById("language-picker");    //get the picker element
const setLanguage = () => {
    var selectedValue = picker.value;       //get the value from the picker
    localStorage.setItem("language", selectedValue);
    translatify.handleLanguageChange(picker.value);     //loads texts in new language
}

//setup Translatify
let translatify;
if(localStorage.getItem('translatify')){    //example on how to store and retrieve translatify from localStorage if it becomes necessary
    const localStorageData = JSON.parse(localStorage.getItem('translatify'));
    translatify = new Translatify(localStorageData.tenantId, localStorageData.apiKey);
}
else{
    translatify = new Translatify('02d34632-83db-4ab6-b00a-56d3f224bb62', 'eyJraWQiOiIwcHhwOUNDeXYyXC9cL1Z1XC9Rb2V2dStSWGRReVIzSWgremQxb24zREIzbW9VPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhMjg5M2NlMy0xZGI2LTQ2NzctOTI0NS1kMjJhYTljZThkMjAiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX3RsZUFYb3FiYiIsImNvZ25pdG86dXNlcm5hbWUiOiJhMjg5M2NlMy0xZGI2LTQ2NzctOTI0NS1kMjJhYTljZThkMjAiLCJjdXN0b206c3VybmFtZSI6IlRlc3RlciIsIm9yaWdpbl9qdGkiOiIzZTVlNmQwNC05ZmNhLTQ0ZTItOTcwNC1mNmE4ZDJiY2Q4YzUiLCJhdWQiOiI0YWZ0dm9vMjRqNXN1ZHNrMG1qcWNxY3BlaCIsImV2ZW50X2lkIjoiNDA0ZjNkZjEtMDA4ZS00M2U4LWFlNjItODA4ZTBiOTc5MTFmIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2ODQxNzUwMTgsIm5hbWUiOiJBZG1pbiIsImV4cCI6MTY4NDI2MTQxNywiaWF0IjoxNjg0MTc1MDE4LCJqdGkiOiI5ZDQ4YjAxMS01NjU2LTQ5NDUtYWNlMS05NjhjNWNiZTU5M2UiLCJlbWFpbCI6ImFkbWluQHN3ZWcuaXQifQ.qViAm6IFV0kWEaTC62U1QvYe_G_zxmmUBaznDB8X3KiTqAf02NHVQNcN2alza9eyx5QWIl_XMV2glxoCAaFz49iLD96cTBe5a8MqQF5ihHkgHHEsyR5iNvY3Rc7AVs5PQsuFgJfC-8Y_XOYLZP2TTold-yj2tSj-DssUuR0mXiZjij2dXWH1AEdqVJ84C7bQWbveUiJL5fww1teqsjw1co_HBUbcX-zvFQGekdJhAICZI2z-xlVj-3GAyDLPabRTbyH8-hE4TCKP9gQKZQeW6G-65cWPy_B601hjJujnKlyUh0eVExQxBf_dzhyyZf7x7Z_XRGokuBqMR2jQm_-6bA');
    translatify = localStorage.setItem('translatify', JSON.stringify(translatify));
}
await translatify.retrieveLanguages();


//setup current language and load texts for the first time
let lang = localStorage.getItem("language");
if(!lang){
    if(translatify.languages){
        lang = translatify.languages[0];
        translatify.handleLanguageChange(lang);
        localStorage.setItem("language", lang);
    }
}
else{
    translatify.handleLanguageChange(lang);
}

picker.addEventListener('change', setLanguage);

if(translatify.languages && translatify.languages.length > 0){
    translatify.languages.forEach(lang => {
        // create option using DOM
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(lang);
        // set option text
        newOption.appendChild(optionText);
        // and option value
        newOption.setAttribute('value', lang);
        picker.appendChild(newOption);
    });
}

picker.value = lang;    //setup picker
