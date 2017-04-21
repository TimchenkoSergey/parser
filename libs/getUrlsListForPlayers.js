import getLoadedHtml from './getLoadedHtml';
import sendRequest   from './sendRequest'

export default getUrlsList;

async function getUrlsList(url, selector) {
    let result = [];

    for (let i = 437; i < 440; i++) {
        const urlPage  = url + i;
        const urls = await getUrlsForPage(urlPage, selector);
        
        if (urls.all) {
            break;
        }
        
        result.push(...urls.links);
    }

    return result;
}

async function getUrlsForPage(url, selector) {
    const response  = await sendRequest({ url });
    let   result    = { links : [], all : false };
    let   $         = getLoadedHtml(response.body);
    const links     = $(selector);

    if (links.length === 0) {
        result.all = true;
    }

    links.each(function() {
        const link = $(this).attr('href');
        result.links.push({ link });
    });


    return result;
}