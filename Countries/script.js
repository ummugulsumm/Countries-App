
const countriesContainer = document.querySelector(".countries-container")

const filterByRegion = document.querySelector(".filter-by-region")

const searchInput = document.querySelector(".search-container input")

const themeChanger = document.querySelector(".theme-changer")

const modeBtn = document.getElementById("mode-btn")



let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
    .then((result) => result.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data; 
    })


filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then((result) => result.json())
        .then(renderCountries)
})

    
function renderCountries(data) {  
        countriesContainer.innerHTML = ""
        data.forEach((country) => {
            const countryCard = document.createElement('a')
            countryCard.classList.add("country-card")
            countryCard.href = `./country.html?name=${country.name.common}`
            countryCard.innerHTML = `
                <div class="flag">
                    <img src=" ${country.flags.svg}" alt="Flag Image">
                </div>
                <div class="card-text">
                    <h3 class="card-title"> ${country.name.common}</h3>
                    <p><b>Population: </b> ${(country.population).toLocaleString()}</p>
                    <p><b>Region: </b> ${country.region}</p>
                    <p><b>Capital: </b> ${country.capital?.[0] || ""}</p>
                </div>
            `
            countriesContainer.append(countryCard)

        })

    
}


searchInput.addEventListener("input", (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})


modeBtn.addEventListener("click", (e) => {
    document.body.classList.toggle("dark")
    localStorage.setItem("mode", document.body.classList);
})

if(localStorage.getItem("mode") != '' && localStorage.getItem("mode") != null) {
    document.body.classList.add(localStorage.getItem("mode"));
    modeBtn.checked = true;
}



