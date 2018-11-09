class FeatureType {
    constructor(name,classD, description) {
        this.name = name;
        this.classD = classD 
        this.description = JSON.parse(description);
    }
}

export default FeatureType;