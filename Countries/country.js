const countryName = new URLSearchParams(location.search).get('name')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((result) => result.json())
    .then((data) => {
        data.forEach((country) => {
            console.log(country)
    })
})

