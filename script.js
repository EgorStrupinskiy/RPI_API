document.getElementById("search-form").addEventListener("submit", () => {
    document.getElementById("content-loader").style.display = "flex"
    document.getElementById("content").style.display = "none"
    document.getElementById("content-error").style.display = "none"
    const date = document.getElementById("date-input").value
    loadData(date)
    setDate(date)
})

const updateData = (data) => {
    let elem
    if (data.code == 400) {
        document.getElementById("content-loader").style.display = "none"
        document.getElementById("content-error").style.display = "flex"
    } else {
        switch (data.media_type) {
            case "image":
                elem = document.getElementById("api__image")
                document.getElementById("api__video").classList.remove("active")
                elem.attributes.src.value = data.url
                elem.classList.add("active")
                break;
            case "video":
                elem = document.getElementById("api__video")
                document.getElementById("api__image").classList.remove("active")
                elem.attributes.src.value = data.url
                elem.classList.add("active")
                break;
        }
        document.getElementById("api__title").innerText = data.title
        document.getElementById("api__description").innerText = data.explanation
        document.getElementById("content-loader").style.display = "none"
        document.getElementById("content").style.display = "flex"
    }
}

const loadData = (date) => {
    document.getElementById("content-connection-error").style.display = "none"
    fetch(`https://api.nasa.gov/planetary/apod?api_key=d1vY2IBmEMD0DVprM9Eg23OxSRczuNTpM54Aqnjl&date=${date}`)
        .then((response) => {
            return response.json()
        })
        .catch(() => {
            offlineHandler()
        })
        .then((data) => {
            if (data) {
                localStorage.setItem("data", JSON.stringify(data))
                localStorage.setItem("date", document.getElementById("date-input").value)
                updateData(data)
            }
        })
}

const setDate = (date) => {
    const d = new Date(date)
    document.getElementById("date-input").valueAsDate = d
    document.getElementById("date").innerHTML = d.toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    })
}

const offlineHandler = () => {
    document.getElementById("content-loader").style.display = "none"
    document.getElementById("content-connection-error").style.display = "flex"
}

const data = localStorage.getItem("data")
const date = localStorage.getItem("date")
if (data && date) {
    updateData(JSON.parse(data))
    setDate(date)
} else {
    setDate(Date.now())
    loadData(document.getElementById("date-input").value)
}

