const REACT_APP_API_KEY = 'https://iibte10n05.execute-api.eu-west-2.amazonaws.com/dev';

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

function addTextToMatchingElement(element, text) {
// Add some text to each matching element
    element.textContent = text;

    //could add caching for already loaded texts
}

function storeTextHolders(){
    return findElementsWithIdPattern();
}

const Translatify = {
    tenantId : '02d34632-83db-4ab6-b00a-56d3f224bb62',
    apiKey : 'eyJraWQiOiIwcHhwOUNDeXYyXC9cL1Z1XC9Rb2V2dStSWGRReVIzSWgremQxb24zREIzbW9VPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0NTMxMzFmMC1jMDYxLTQ0OWItOTM4OC1iYWUzOWNmYmJhMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfdGxlQVhvcWJiIiwiY29nbml0bzp1c2VybmFtZSI6IjQ1MzEzMWYwLWMwNjEtNDQ5Yi05Mzg4LWJhZTM5Y2ZiYmExOCIsImN1c3RvbTpzdXJuYW1lIjoiTUlMQU4iLCJvcmlnaW5fanRpIjoiNzMxMjk2ZDgtNjk1Mi00MDk0LTg0ZTEtZTRmNjc3MTcxNzQ0IiwiYXVkIjoiNGFmdHZvbzI0ajVzdWRzazBtanFjcWNwZWgiLCJldmVudF9pZCI6ImQwZjhjMjdhLWI4ZDAtNDQ0OC05MGM4LTgwOTg2ZmI3MmE3OSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjgzOTE5MzY3LCJuYW1lIjoiREFWSURFIiwiZXhwIjoxNjg0MDA1NzY3LCJpYXQiOjE2ODM5MTkzNjcsImp0aSI6IjhlMjU4ZDg0LTgwY2YtNGMxYi1hMDk5LTJhNzM0NDUyMDdhNCIsImVtYWlsIjoiZGF2aWRlLm1pbGFuLjJAc3R1ZGVudGkudW5pcGQuaXQifQ.H1n4npFqTw-8FCIKePULNXKWMlcRlCXlBuMXtmGLiL6BRCg6FfvaZmbu24GQ2q3nOo1ztppwUfpGFPa3ZCwSBnc2dLr0am_lxiYBMjWcMgG4tny1D2PnoR3l9g8HKVQqtUfdhFrc0aEZER88xnaoD9E2cSKS39YqOBagxt_WK7sTvxCFlA9YRfGOwTqGeqn-OWEWTrSJQRsRTK8HLpbJcv0tHZIVpOXVaWy25P4jOO7A0qfHZvhRUa12yMLMClBwZGI14lquig4TcwuTWJi1VJ3ohFP2Khqql6dBqpaE6wdZxBtUUwx6W-0jYE3Gs-uBzkVyei4RAKS3R7Wl5oj-CQ',
    language : '',
    languages : [],
    textHolders : [],
    // cachedLanguagesTexts: [],    //for caching texts instead of making repetetive API calls
    setUpApiKey(apiKey){
        this.apiKey = apiKey;
    },
    setUpTenantId(tenantId){
        this.tenantId = tenantId;
    },
    retrieveLanguages(){
        if(this.apiKey !== null && this.tenantId !== null){
            this.languages = fetch(`${REACT_APP_API_KEY}/tenant/${this.tenantId}/languages`, 
            { 
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization : `Bearer ${this.apiKey}`
            }})
            .then(res => res.json())
            .then(res => res.Languages.languages)
            .catch(err => {console.log('something went wrong while fetching data')});
            console.log(languages);
        }
        else
            console.log('setup apiKey and tenantId using setUpApiKey and setUpTenantId functions');
    },
    getText(categoryName, title){
        if(this.apiKey !== null && this.tenantId !== null)
            return fetch(`${REACT_APP_API_KEY}/text/${this.tenantId}/${this.language}/${categoryName}/${title}/text`, 
            { 
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization : `Bearer ${this.apiKey}`
            }})
            .then(res => res.json())
            .then(res => {return res.Text.text})
            .catch(err => {throw 'something went wrong while fetching data'});
        else
            console.log('setup apiKey and tenantId using setUpApiKey and setUpTenantId functions');
    },
    handleLanguageChange(newLanguage){
        this.language = newLanguage;
        if(!this.textHolders || this.textHolders.length === 0)
            this.textHolders = storeTextHolders();
        this.textHolders.forEach((item) => {
            this.getText(item.category, item.title).then((text) =>{
                addTextToMatchingElement(item.element, text);
            })
            .catch(err =>{
                console.log(err);
            })
        });
    },
}

export default Translatify;
