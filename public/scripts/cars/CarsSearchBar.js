class CarsSearchBar {
    constructor(
        searchForm,
        driverInput,
        tanggalInput,
        waktuInput,
        penumpangInput,
        searchButton,
        searchResult
    ) {
        this.searchForm = searchForm;
        this.driverInput = driverInput;
        this.tanggalInput = tanggalInput;
        this.waktuInput = waktuInput;
        this.penumpangInput = penumpangInput;
        this.searchButton = searchButton;
        this.searchResult = searchResult;

        this.toggleSearchButton = this.toggleSearchButton.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    init() {
        // Set event listeners
        this.driverInput.addEventListener("change", this.toggleSelectColor);
        this.waktuInput.addEventListener("change", this.toggleSelectColor);

        this.tanggalInput.addEventListener("focus", this.onDateInputFocus);
        this.tanggalInput.addEventListener("blur", this.onDateInputBlur);

        this.driverInput.addEventListener("change", this.toggleSearchButton);
        this.tanggalInput.addEventListener("change", this.toggleSearchButton);
        this.waktuInput.addEventListener("change", this.toggleSearchButton);

        this.searchForm.addEventListener("submit", this.handleSearchSubmit);
    }

    setInitialColors() {
        // Set initial select colors
        if (this.driverInput.value) {
            this.driverInput.style.color = "black";
        } else {
            this.driverInput.style.color = "grey";
        }

        if (this.waktuInput.value) {
            this.waktuInput.style.color = "black";
        } else {
            this.waktuInput.style.color = "grey";
        }
    }

    toggleSelectColor(e) {
        if (this.value) {
            this.style.color = "black";
        } else {
            this.style.color = "grey";
        }
    }

    onDateInputFocus(e) {
        this.type = "date";
        this.showPicker();
    }

    onDateInputBlur(e) {
        this.type = "text";
    }

    toggleSearchButton(e) {
        if (this.driverInput.value && this.tanggalInput.value && this.waktuInput.value) {
            this.searchButton.disabled = false;
        } else {
            this.searchButton.disabled = true;
        }
    }

    async handleSearchSubmit(e) {
        // Prevent page refresh
        e.preventDefault();
    
        // Retrieve filters from form
        const formData = new FormData(e.target);
        let filters = Object.fromEntries(formData);
    
        // Process car filter format
        let requiredCapacity = parseInt(filters.penumpang);
        if (isNaN(requiredCapacity) || requiredCapacity < 1) {
            requiredCapacity = 1;
        }
        const dateTime = this.#createDateObject(filters.tanggal, filters.waktu);
    
        // Set url query params based on filters
        const url = new URL(window.location);
        url.searchParams.set("driver", filters.driver);
        url.searchParams.set("tanggal", filters.tanggal);
        url.searchParams.set("waktu", filters.waktu);
        url.searchParams.set("penumpang", filters.penumpang);
        window.history.pushState({}, "", url);
    
        await this.searchResult.load(dateTime, requiredCapacity);
    }

    fillFormInputs(driver, tanggal, waktu, penumpang) {
        this.driverInput.value = driver;
        this.tanggalInput.value = tanggal;
        this.waktuInput.value = waktu;
        this.penumpangInput.value = penumpang;
    }

    #createDateObject(date, time) {
        const combinedDateTime = `${date}T${time}:00:00.000+07:00`;
        return new Date(combinedDateTime);
    }
}