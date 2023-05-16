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
    translatify = new Translatify('02d34632-83db-4ab6-b00a-56d3f224bb62', '4oeQmNa1bq18OO5LC1p2Q5vIqm36Lk8g8zbPtYe0');
    localStorage.setItem('translatify', JSON.stringify(translatify));
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
