import getLoadedHtml   from '../../libs/getLoadedHtml';
import sendRequest     from '../../libs/sendRequest';
import isNextPageExist from './isNextPageExist';

export default getUrlsList;

async function getUrlsList(url, selector) {
    let result = [];

    for (let i = 1; ; i++) {
        const urlPage = url + i;
        const urls    = await getUrlsForPage(urlPage, selector);

        result.push(...urls.links);
        
        if (urls.all) {
            break;
        }
    }
    console.log(result.length);
    return result;
}

async function getUrlsForPage(url, selector) {
    let   result    = { links : [], all : false };
    const response  = await sendRequest({ url });
    const $         = getLoadedHtml(response.body);
    const links     = $(selector);

    if (links.length === 0 || !isNextPageExist($)) {
        result.all = true;
    }

    links.each(function() {
        const link = $(this).attr('href');
        result.links.push({ link });
    });
    
    return result;
}