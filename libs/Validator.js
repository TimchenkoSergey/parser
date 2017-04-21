export default class Validator {
    constructor(data, config) {
        this.data   = data;
        this.config = config;
    }
    
    isFilled() {
        let result = true;

        for (let item in this.data) {
            const checker = this.config[item];
            const field   = this.data[item];

            if (!this[checker](field)) {
                result = false;
                break;
            }
        }
        
        return result;
    }

    isNumber(number) {
        return !isNaN(number);
    }

    isNonEmpty(string) {
        return string !== '';
    }
}