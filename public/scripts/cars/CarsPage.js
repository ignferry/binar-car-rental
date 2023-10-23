class CarsPage {  
    constructor() {
        this.cars = [];
        this.searchResult = new CarsSearchResult(
            document.getElementById("search-result-div")
        );
        this.searchBar = new CarsSearchBar(
            document.getElementById("search-form"),
            document.getElementById("input-tipe-driver"),
            document.getElementById("input-tanggal"),
            document.getElementById("input-waktu"),
            document.getElementById("input-penumpang"),
            document.getElementById("search-btn"),
            this.searchResult
        );
    }
  
    async init() {
        // Initialize search bar
        this.searchBar.init();

        // Retrieve filters from query params
        const urlSearchParams = new URLSearchParams(window.location.search);
        const filters = Object.fromEntries(urlSearchParams.entries());

        // End if filters aren't defined
        if (!filters.driver || !filters.tanggal || !filters.waktu) {
            return;
        }

        // Process car filter format
        let requiredCapacity = parseInt(filters.penumpang);
        if (isNaN(requiredCapacity) || requiredCapacity < 1) {
            requiredCapacity = 1;
        }
        const dateTime = this.#createDateObject(filters.tanggal, filters.waktu);

        // Populate search form with filter values
        this.searchBar.fillFormInputs(filters.driver, filters.tanggal, filters.waktu, requiredCapacity);
        this.searchBar.toggleSearchButton();

        this.searchBar.setInitialColors();

        this.searchResult.load(dateTime, requiredCapacity);
    }

    #createDateObject(date, time) {
        const combinedDateTime = `${date}T${time}:00:00.000+07:00`;
        return new Date(combinedDateTime);
    }
}

const carsPage = new CarsPage();

carsPage.init();