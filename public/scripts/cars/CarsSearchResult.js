class CarsSearchResult {
    constructor(searchResultDiv) {
        this.cars = [];
        this.searchResultDiv = searchResultDiv;
    }

    async load(dateTime, requiredCapacity) {
        // Retrieve car data
        const fetchResponse = await fetch("/data/cars");
        const carJson = await fetchResponse.json();

        this.filterCars(carJson, dateTime, requiredCapacity);

        // Render cars
        this.searchResultDiv.innerHTML = "";
        this.cars.forEach((car) => {
            const carObject = new Car(car);
            const node = document.createElement("div");
            node.className = "col";
            node.innerHTML = carObject.render();
            this.searchResultDiv.appendChild(node);
        });
    }

    filterCars(carJson, dateTime, requiredCapacity) {
        this.cars = [];
  
        carJson.forEach((car) => {      
            if (
                dateTime > new Date(car.availableAt) 
                && car.capacity > requiredCapacity
            ) {
                this.cars.push(car);
            }
        });
    }
}