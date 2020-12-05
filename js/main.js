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
   /* if (!content.region) {
        content.region = "undefined"
    } */

    const population = content.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

    let div = `<div class='country bg-white dark:bg-blue-800 shadow-xl mt-8 cursor-pointer rounded-md' style='width: 300px' data-region="${content.region.toLowerCase()}" data-name="${content.name}">
        <img class='w-full rounded-t-md' src='${content.flag}' alt=''>    
        <div class='p-6 dark:text-blue-100'>
            <h2 class='text-center font-bold text-xl mb-4'>${content.name}</h2>
            <p>Population : ${content.population}</p>
            <p>Region :  ${content.region}</p>
            <p>Capital : ${content.capital}</p>
        </div>
    </div>
`
    countryCardContainer.insertAdjacentHTML('beforeend', div)
}

function createCountryInfo(country, countries) {
    let countryLanguage = ""
    country.altSpellings.forEach(language => countryLanguage = countryLanguage + ", " + language)

    let population = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    let countryBorders = ""
    for (let i = 0; i < country.borders.length; i++) {
        for (let j = 0; j < countries.length; j++) {
            if (countries[j].alpha3Code === country.borders[i]) {
                countryBorders = countryBorders + "<span class='bg-gray-300 dark:bg-blue-700 py-2 px-6 mx-3  cursor-pointer text-gray-800 dark:text-white' data-countryBorders=" + countries[j].name + ">" + countries[j].name + "</span>"
                break;
            }
        }
    }
    let div = `<div class='flex items-center mx-auto'> 
        <img class='w-2/5' src="${country.flag}" alt="">
        <div class=' pl-8 text-blue-900 dark:text-blue-200 w-1/2'>
            <h1 class='text-2xl font-semibold mb-8'>${country.name}</h1>
            <div class='flex justify-between leading-8'>
                <div class='w-1/2'>
                    <p><span class='font-bold'>Native name :</span>${country.name}</p>
                    <p><span class='font-bold'>Population :</span>${population}</p>
                    <p><span class='font-bold'>Region :</span>${country.region}</p>
                    <p><span class='font-bold'>Sub Region :</span>${country.subregion}</p>
                    <p><span class='font-bold'>Capital :</span>${country.capital}</p>
                </div>
                <div class='w-1/2'>
                    <p><span class='font-bold'>Top Level Domain :</span>${country.name}</p>
                    <p><span class='font-bold'>Currencies :</span>${country.name}</p>
                    <p><span class='font-bold'>Languages :</span>${countryLanguage}</p>
                </div>
            </div>
        </div>
    </div>
    <div class='mt-12 text-blue-900 dark:text-blue-200'><span class='font-bold'>Border countries :</span>${countryBorders}</div>`

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
