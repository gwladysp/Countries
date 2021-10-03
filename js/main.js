const url = "https://restcountries.com/v3.1/all"
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

    for (let i = 0; i < countries.length; i++) {
        countries[i].addEventListener('click', function() {
            let countryName = this.getElementsByTagName('h2')[0].innerText
            for (let j = 0; j < data.length; j++) {
                if (data[i].name.common === countryName) {
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
    const population = content.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    let div = `<div class='country bg-white dark:bg-blue-800 shadow-xl mt-8 cursor-pointer rounded-md hover:scale-110' style='width: 300px' data-region="${content.region.toLowerCase()}" data-name="${content.name.common}">
        <img class='w-full rounded-t-md' src='${content.flags.svg}' alt='${content.flag}'>    
        <div class='p-6 dark:text-blue-100'>
            <h2 class='text-center font-bold text-xl mb-4'>${content.name.common}</h2>
            <p>Population : ${population || ' undefined'}</p>
            <p>Region :  ${content.region || ' undefined'}</p>
            <p>Capital : ${content.capital || ' undefined'}</p>
        </div>
    </div>`
    countryCardContainer.insertAdjacentHTML('beforeend', div)
}

function createCountryInfo(country, countries) {
    let countryLanguage = ""
    console.log(country)
    country.altSpellings.forEach(language => countryLanguage = countryLanguage + ", " + language)
    countryLanguage = countryLanguage.substring(1)

    let population = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    let countryBorders = ""
    if (country.borders) {
        Object.keys(country.borders).forEach(function(key) {
            for (let j = 0; j < countries.length; j++) {
                if (countries[j].cca3 === country.borders[key]) {
                    countryBorders += "<span class='bg-gray-300 dark:bg-blue-700 py-2 px-6 mr-4 cursor-pointer text-gray-800 dark:text-white inline-block mb-2' data-countryBorders=" + countries[j].name.common + ">" + countries[j].name.common + "</span>"
                    break;
                }
            }
        })
    }

    let currencies = ""
    Object.keys(country.currencies).forEach(function(key) {
        currencies += key + " ";
    })

    let nativeName = ""
    Object.keys(country.name.nativeName).forEach(function(key) {
        nativeName = country.name.nativeName[key].common + ` (${key})`
    })

    let div = `<div class='flex items-center mx-auto'> 
        <img class='w-2/5'  src='${country.flags.svg}' alt='${country.flag}'>
        <div class=' pl-8 text-blue-900 dark:text-blue-200 w-1/2'>
            <h1 class='text-2xl font-semibold mb-8'>${country.name.common}</h1>
            <div class='flex justify-between leading-8'>
                <div class='w-1/2'>
                    <p><span class='font-bold'>Native name : </span>${nativeName}</p>
                    <p><span class='font-bold'>Population : </span>${population || ' undefined'}</p>
                    <p><span class='font-bold'>Region : </span>${country.region || ' undefined'}</p>
                    <p><span class='font-bold'>Sub Region : </span>${country.subregion || ' undefined'}</p>
                    <p><span class='font-bold'>Capital : </span>${country.capital || ' undefined'}</p>
                </div>
                <div class='w-1/2'>
                    <p><span class='font-bold'>Top Level Domain : </span>${country.tld || ' undefined'}</p>
                    <p><span class='font-bold'>Currencies : </span>${currencies}</p>
                    <p><span class='font-bold'>Languages : </span>${countryLanguage || ' undefined'}</p>
                </div>
            </div>
        </div>
    </div>
    <div class='mt-12 text-blue-900 dark:text-blue-200'><span class='font-bold mr-4'>Border countries :</span>${countryBorders || ' none'}</div>
    <a href="${country.maps.googleMaps}" target="_blank" class="flex py-2 mt-6 font-light text-blue-900 dark:text-blue-200 font-bold cursor-pointer">
    <svg class="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    See on Google Maps</a>`

    document.querySelector(".country-info").insertAdjacentHTML('beforeend', div)

    document.querySelectorAll("[data-countryBorders]").forEach(borders => borders.addEventListener('click', function() {
            for (let j = 0; j < countries.length; j++) {
                if (borders.innerText.toLowerCase() === countries[j].name.common.toLowerCase()) {
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
