const url = "https://restcountries.eu/rest/v2/all"
const countryCardContainer = document.querySelector(".country-card-container")

showAll().then(countResults)

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

  /*  console.log(data[0].alpha2Code);
    let borders = "bordures : " + data[0].borders[0]
    for (let i = 1; i < data[0].borders.length;i++) {
        borders = borders + ', ' + data[0].borders[i]
    }
    console.log(borders)*/
}

function createCountryCard(content) {
   // console.log(content)
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

async function countResults() {
    let shownCountries = await countries().then((content) => {
            return content
        }
    )
    showResults.innerText = shownCountries.length
}

