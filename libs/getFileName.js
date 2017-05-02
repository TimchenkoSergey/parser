import config from '../config';

export default getFileName;

function getFileName(url) {
    if (url === '') {
        return config.get('noPhotoImage');
    }
    
    const urlParts   = url.split('/');
    const folderName = urlParts[urlParts.length - 3];
    const imgSize    = urlParts[urlParts.length - 2];
    const imgName    = urlParts[urlParts.length - 1];

    // Т.к. у изображений зачастую одинаковые названия
    // формируем уникальное название из 
    // папки где оно храниться + папки с указанием размеров + его имени
    return folderName + imgSize + imgName;
}