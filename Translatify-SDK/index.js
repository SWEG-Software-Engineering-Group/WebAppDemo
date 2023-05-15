const REACT_APP_API_KEY = 'https://iibte10n05.execute-api.eu-west-2.amazonaws.com/dev';

//returns an array of elements that contain an id in the form of "category:XXX&title:XXX"
function findElementsWithIdPattern() {
    // Define the regular expression pattern to match
    const idPattern = /category:(.*?)&title:(.*)/;
  
    // Get all HTML elements on the page
    const allElements = document.getElementsByTagName('*');
  
    // Create an array to store matching elements
    const matchingElements = [];
  
    // Loop through all elements and check if their ID matches the pattern
    for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        const elementId = element.getAttribute('id');
        if (elementId && elementId.match(idPattern)) {
          const matches = elementId.match(idPattern);
          const category = matches[1];
          const title = matches[2];
          matchingElements.push({ element, category, title });
        }
      }
  
    // Return the array of matching elements
    return matchingElements;
}

// Add some text to each matching element
function addTextToMatchingElement(element, text) {
    element.textContent = text;
}

function storeTextHolders(){
    return findElementsWithIdPattern();
}

class Translatify{
    constructor(tenantId, apiKey){
        this.tenantId = tenantId;
        this.apiKey = apiKey;
    }

    //get languages from API and sets object's languages array
    async retrieveLanguages(){
        if(this.apiKey !== null && this.tenantId !== null){
            this.languages = await fetch(`${REACT_APP_API_KEY}/tenant/${this.tenantId}/languages`, 
            { 
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization : `Bearer ${this.apiKey}`,
                    // 'x-api-key': this.apiKey, 
            }})
            .then(res => res.json())
            .then(res => res.languages)
            .catch(err => {console.log('something went wrong while fetching data')});
        }
        else
            console.log('setup apiKey and tenantId using setUpApiKey and setUpTenantId functions');
    };

    //get specified text
    //will return the text with the specified title in the current object Language: if a text is not found in the current language, the default language text will be displayed instead.
    //if no text is selected a non-blocking error will be thrown
    getText(categoryName, title){
        if(!this.language || this.language === ''){
            throw 'no language selected';
        }
        if(this.apiKey !== null && this.tenantId !== null)
            return fetch(`${REACT_APP_API_KEY}/text/${this.tenantId}/${this.language}/${categoryName}/${title}`, 
            { 
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization : `Bearer ${this.apiKey}`
            }})
            .then(res => res.json())
            .then(res => {
                if(res.Text) return res.Text.text; 
                else return '';
            })
            .catch(err => {throw err});
        else
            console.log('setup apiKey and tenantId using setUpApiKey and setUpTenantId functions');
    };

    //sets object language and fires getText calls for every text in the new language that matches the category-title combination from all the components in the page
    handleLanguageChange(newLanguage){
        this.language = newLanguage;
        if(this.apiKey !== null && this.tenantId !== null){
            if(!this.textHolders || this.textHolders.length === 0)
                this.textHolders = storeTextHolders();
            this.textHolders.forEach((item) => {
                this.getText(item.category, item.title)
                .then((text) =>{
                    addTextToMatchingElement(item.element, text);
                })
                .catch(err =>{
                    console.log(err);
                })
            });
        }
    };
}

export default Translatify;