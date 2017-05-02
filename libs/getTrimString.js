export default getTrimString;

function getTrimString(str) {
    if (!str) {
        return '';
    }
    
    return str.trim();
}