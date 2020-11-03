const countrySearch = document.querySelector("#countrySearch");
const showResults = document.querySelector("[data-action='count-results']")
const selectRegion = document.querySelector("#region-search")

selectRegion.addEventListener('change', function(e) {
    const countries = document.querySelectorAll("[data-region]")
    if (this.value) {
        countries.forEach(getCountry, [this.value, "region"])
    } else {
        countries.forEach(country => country.classList.remove('hidden'))
    }
})

countrySearch.addEventListener('keyup', showCountries)
countrySearch.addEventListener('search', showCountries)

function showCountries() {
    const countries = document.querySelectorAll("[data-name]")
    countries.forEach(getCountry, [countrySearch.value.toLowerCase(), "name"])
}

function getCountry(countries) {
    let search = (this[1] === "region" ? countries.dataset.region.toLowerCase() : countries.dataset.name.toLowerCase())

    if (!search.includes(this[0].valueOf())) {
        countries.classList.add("hidden")
    } else {
        countries.classList.remove("hidden")
    }
    showResults.innerText = document.querySelectorAll(".country:not(.hidden)").length

}

/* function getCountry(countries) {
    {
        if (!countries.dataset.name.toLowerCase().includes(countrySearch.value.toLowerCase())) {
            countries.classList.add("hidden")
        } else {
            countries.classList.remove("hidden")
        }
        showResults.innerText = document.querySelectorAll(".country:not(.hidden)").length
    }
} */