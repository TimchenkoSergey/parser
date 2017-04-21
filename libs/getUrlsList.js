import getLoadedHtml from './getLoadedHtml';
import sendRequest   from './sendRequest'

export default getUrlsList;

async function getUrlsList(url, selector) {
    let result = [];

    for (let i = 1; i < 2; i++) {
        const urlPage  = url + i;
        const urls = await getUrlsForPage(urlPage, selector);
        result.push(...urls.links);

        if (urls.all) {
            break;
        }
    }
    
    return result;
}

async function getUrlsForPage(url, selector) {
    const response  = await sendRequest({ url });
    let   result    = { links : [], all : false };
    let   $         = getLoadedHtml(response.body);
    const links     = $(selector);
    const nextPage  = $('.main-wrap .main ul.pager li.next a');

    if (!nextPage.text()) {
        result.all = true;
    }

    links.each(function() {
        const link = $(this).attr('href');
        result.links.push({ link });
    });

    return result;
}