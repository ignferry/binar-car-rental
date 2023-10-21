class Car extends Component {
    constructor({
      id,
      plate,
      manufacture,
      model,
      image,
      rentPerDay,
      capacity,
      description,
      transmission,
      available,
      type,
      year,
      options,
      specs,
      availableAt,
    }) {
      super();
  
      this.id = id;
      this.plate = plate;
      this.manufacture = manufacture;
      this.model = model;
      this.image = image;
      this.rentPerDay = rentPerDay;
      this.capacity = capacity;
      this.description = description;
      this.transmission = transmission;
      this.available = available;
      this.type = type;
      this.year = year;
      this.options = options;
      this.specs = specs;
      this.availableAt = availableAt;
    }
  
    #numToString(number) {
      let numStr = number.toString();
      let res = "";
  
      for (let i = numStr.length -1; i >= 0; i--) {
        res = numStr[i] + res;
        if ((numStr.length - i) % 3 === 0 && i != 0) {
          res = "." + res;
        }
      }
  
      return res;
    }
  
    render() {
      return `
        <div class="card h-100 p-1 shadow-sm">
            <div class="card-body">
                <img src="${this.image}" class="mb-3 img-fluid car-img">
                <div class="car-props">
                  <span class="car-nama-tipe d-block pb-2">${this.manufacture} ${this.model} / ${this.type}</span>
                  <span class="car-harga d-block pb-2 fw-bold">Rp ${this.#numToString(this.rentPerDay)} / hari</span>
                  <p class="car-desc">${this.description}</p>
                  <div class="d-flex car-prop pb-2">
                      <img src="./assets/fi_users.png" class="img-fluid pe-2">
                      <span class="">${this.capacity} orang</span>
                  </div>
                  <div class="d-flex car-prop pb-2">
                      <img src="./assets/fi_settings.png" class="img-fluid pe-2">
                      <span>${this.transmission}</span>
                  </div>
                  <div class="d-flex car-prop pb-2">
                      <img src="./assets/fi_calendar.png" class="img-fluid pe-2">
                      <span>Tahun ${this.year}</span>
                  </div>
                </div>
                <button class="w-100 btn btn-success mt-2">Pilih Mobil</button>
            </div>
        </div>
      `;
    }
  }
  