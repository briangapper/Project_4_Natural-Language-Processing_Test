// Define port and server paths
const port = 9000;
const pathGetData = `http://localhost:${port}/meaningCloud`;

// function getSentimentData: makes GET server request to fetch URL to API 
async function getSentimentData(event) {
    event.preventDefault();

    // check what text was put into the form field
    let inputURL = document.getElementById('url').value.trim();
    let check = Client.checkForURL(inputURL);

    if (check == true){

        console.log('::: Request Submitted :::')
        console.log('inputURL: ', inputURL)
        console.log('Hello')

        try {

            let result = await fetch(pathGetData, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({inputURL})
            });

            let data = await result.json()
    
            console.log('Result: ', data)
            
            document.getElementById('status').innerHTML = data.status
            document.getElementById('polarity').innerHTML = data.polarity
            document.getElementById('subjectivity').innerHTML = data.subjectivity
            document.getElementById('confidence').innerHTML = data.confidence
            document.getElementById('text').innerHTML = data.text
    
        } catch(error) {
    
            console.log('ERROR function getSentimentData: ', error)
        
        } finally {
    
            console.log('END function getSentimentData')
    
        }

    } else {

        alert('Please enter a valid URL!')
        return;

    }
}

export {
    getSentimentData
}