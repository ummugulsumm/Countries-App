const countryName = new URLSearchParams(location.search).get('name')
const flag = document.querySelector(".country-details img")
const countryNameElement = document.querySelector(".country-details h1")
const nativeName = document.querySelector("#nativeName")
const population = document.querySelector("#population")
const region = document.querySelector("#region")
const subRegion = document.querySelector("#subRegion")
const capital = document.querySelector("#capital")
const topLevelDomain = document.querySelector("#topLevelDomain")
const currencies = document.querySelector("#currencies")
const languages = document.querySelector("#languages")
const borderCountries = document.querySelector(".border-countries")

const modeBtn = document.getElementById("mode-btn")


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((result) => result.json())
    .then((data) => {
             country = data[0]
             console.log(country)
            flag.src = country.flags.svg
            flag.alt = `${country.name.common} Flag`
            countryNameElement.innerHTML = country.name.common
            population.innerHTML = country.population.toLocaleString()
            region.innerHTML = country.region
            
            
            topLevelDomain.innerHTML = country.tld.join(", ")

            if(country.subregion) {
                subRegion.innerHTML = country.subregion
            }
            
            if(country.capital) {
                capital.innerHTML = country.capital?.[0]
            }

            if(country.name.nativeName) {
                nativeName.innerHTML = Object.values(country.name.nativeName)[0].common
            } else {
                nativeName.innerHTML = country.name.common
            }

            if(country.currencies) {
                currencies.innerHTML = Object.values(country.currencies).map((currency) => currency.name).join(", ")
            }

            if(country.languages) {
                languages.innerHTML = Object.values(country.languages).join(", ")
            }


            if(country.borders) {
                country.borders.forEach((border) => {
                    fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                        .then((result) => result.json())
                        .then(([borderCountry]) => {
                            const borderCountryTag = document.createElement("a")
                            borderCountryTag.href = `./country.html?name=${borderCountry.name.common}`
                            borderCountryTag.innerText = borderCountry.name.common
                            borderCountries.append(borderCountryTag)
                        })
                    
                })
            }




})


modeBtn.addEventListener("click", (e) => {
    document.body.classList.toggle("dark")
    localStorage.setItem("mode", document.body.classList);
    localStorage.setItem("checked", modeBtn.checked)

})

if(localStorage.getItem("mode") != '') {
    document.body.classList.add(localStorage.getItem("mode"));
    modeBtn.checked = localStorage.getItem("checked");
}

