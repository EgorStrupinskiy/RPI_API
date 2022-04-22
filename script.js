let searchButton = document.querySelector("#search")

//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", () => {
    console.log("button pressed")
    sendApiRequest()
})

//An asynchronous function to fetch data from the API.
async function sendApiRequest() {
    let API_KEY = 'd1vY2IBmEMD0DVprM9Eg23OxSRczuNTpM54Aqnjl'
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=2022-04-22&api_key=${API_KEY}`);
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}

//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data) {
    document.querySelector("#api__text").innerHTML = data.explanation;
    document.querySelector("#api__image").innerHTML = `<img src = "${data.url}">`
}