//setup Translatify
import Translatify from "./Translatify-SDK/index.js";

Translatify.languages = ['Italian', 'English']  //replace with Translatify.retrieveLanguages()

let lang = localStorage.getItem("language");
if(!lang){
    lang = Translatify.languages[0];
    localStorage.setItem("language", lang);
}
Translatify.handleLanguageChange(lang);
document.getElementById("language-picker").value = Translatify.language;    //setup picker


var picker = document.getElementById("language-picker");    //get the picker element
const setLanguage = () => {
    var selectedValue = picker.value;       //get the value from the picker
    localStorage.setItem("language", selectedValue);
    Translatify.handleLanguageChange(picker.value);     //loads texts in new language
}

picker.addEventListener('change', setLanguage);
