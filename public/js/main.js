const url = "https://restcountries.eu/rest/v2/all"
const countryCardContainer = document.querySelector(".country-card-container")
const searchContainer = document.querySelector(".search-container")
const countryInfoContainer = document.querySelector(".country-info-container")
const back = document.querySelector("[data-action='back']")

showAll().then(countResults)


back.addEventListener('click', function() {
    countryCardContainer.classList.remove('hidden')
    searchContainer.classList.remove('hidden')
    countryInfoContainer.classList.add('hidden')
    document.querySelector(".country-info").innerHTML = ""
})

function countries() {
    return fetch(url).then(res => res.json())
        .then(function(content) {
            return content;
        })
}


async function showAll() {
    let data = await countries().then((content) => {
        return content
        }
    )
    for (let i = 0; i < data.length;i++) {
        createCountryCard(data[i])
    }
    getInfo(data)
}


function getInfo(data) {
    const countries = document.querySelectorAll('.country')
    for (let i = 0; i < countries.length;i++) {
        countries[i].addEventListener('click', function() {
            let countryName = this.getElementsByTagName('h2')[0].innerText

            for (let j = 0; j < data.length; j++) {
                if (data[i].name === countryName) {
                    createCountryInfo(data[i], data)
                    break;
                }
            }

            countryCardContainer.classList.add('hidden')
            searchContainer.classList.add('hidden')
            countryInfoContainer.classList.remove('hidden')
        })
    }
}

function createCountryCard(content) {
    if (!content.region) {
        content.region = "undefined"
    }

    let div = "            <div class='country bg-blue-200 mt-8' style='width: 300px' data-region=" + content.region.toLowerCase() + " data-name=" + content.name + "\">" +
        "                <img class='w-full' src='" + content.flag + "' alt=''>" +
        "                <div class='p-6'>" +
        "                    <h2 class='text-center font-bold mb-4'>" + content.name + "</h2>" +
        "                    <p>Population : " + content.population + "</p>" +
        "                    <p>Region : " + content.region + "</p>" +
        "                    <p>Capital : " + content.capital + "</p>" +
        "                </div>" +
        "            </div>"

    countryCardContainer.insertAdjacentHTML('beforeend', div)

}

function createCountryInfo(country, countries) {
    let countryLanguage = ""
    country.altSpellings.forEach(language => countryLanguage = countryLanguage + ", " + language)

    let countryBorders = ""
    for (let i = 0; i < country.borders.length; i++) {
        for (let j = 0; j < countries.length; j++) {
            if (countries[j].alpha3Code === country.borders[i]) {
                countryBorders = countryBorders + "<span class='bg-blue-700 py-2 px-6 mx-3' data-countryBorders=" + countries[j].name + ">" + countries[j].name + "</span>"
                break;
            }
        }
    }

    let div = "<img class='w-1/2' src='" + country.flag + "' alt=\"\">\n" +
        "                <div>\n" +
        "                    <h1>" + country.name + "</h1>\n" +
        "                    <div>\n" +
        "                        <p>Native name : " + country.name + "</p>\n" +
        "                        <p>Population : " + country.population + "</p>\n" +
        "                        <p>Region : " + country.region + "</p>\n" +
        "                        <p>Sub Region : " + country.subregion + "</p>\n" +
        "                        <p>Capital : " + country.capital + "</p>\n" +
        "                        <p>Top Level Domain : " + country.name + "</p>\n" +
        "                        <p>Currencies : " + country.name + "</p>\n" +
        "                        <p>Languages : " + countryLanguage + "</p>\n" +
        "                    </div>\n" +
        "                    <p>Border countries : " + countryBorders + "</p>\n" +
        "                </div>"
    document.querySelector(".country-info").insertAdjacentHTML('beforeend', div)

    document.querySelectorAll("[data-countryBorders]").forEach(borders => borders.addEventListener('click', function() {
            for (let j = 0; j < countries.length; j++) {
                if (borders.innerText.toLowerCase() === countries[j].name.toLowerCase()) {
                    console.log(document.querySelector(".country-info"))
                    document.querySelector(".country-info").innerHTML = ""
                    createCountryInfo(countries[j], countries)
                }
            }
        }
    ))


}

async function countResults() {
    let shownCountries = await countries().then((content) => {
            return content
        }
    )
    showResults.innerText = shownCountries.length
}
