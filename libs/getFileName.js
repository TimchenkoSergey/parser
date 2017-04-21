export default getFileName;

function getFileName(url) {
    if (url === '') {
        return 'no-photo-gamer.svg';
    }
    
    const urlParts = url.split('/');

    return urlParts[urlParts.length - 3] + urlParts[urlParts.length - 2] + urlParts[urlParts.length - 1];
}