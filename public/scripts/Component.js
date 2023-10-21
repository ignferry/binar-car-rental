class Component {
    constructor() {
        if (this.constructor === Component) {
            throw new Error("Cannot instantiate abstract class Component");
        }
    }

    render() {
        throw new Error("Method render is not implemented");
    }
}