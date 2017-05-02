import Validator from '../../libs/Validator';

export default isValid;

function isValid(data, config) {
    const validator = new Validator(data, config);

    return validator.isFilled();
}