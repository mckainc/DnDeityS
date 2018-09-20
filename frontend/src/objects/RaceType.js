class RaceType {
    constructor(name, description) {
        this.name = name;
        this.description = JSON.parse(description);
    }
}

export default RaceType;