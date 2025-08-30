// Real Subject: The object that does the real work
class Countries {
    getCountries() {

        return ["Egypt", "USA", "UK", "Germany", "France"];
    }
}

class CountryProxy {
    constructor() {
        this.countries = new Countries();
        this.cache = null;
    }

    getCountries() {
        if (this.cache === null) {
            console.log("Cache is empty. Fetching from API.");
            this.cache = this.countries.getCountries();
        } else {
            console.log("Fetching countries from cache.");
        }
        return this.cache;
    }
}

// Client code
const countryProvider = new CountryProxy();

console.log("First request:");
console.log(countryProvider.getCountries());

console.log("\n--------------------\n");

console.log("Second request:");
console.log(countryProvider.getCountries());