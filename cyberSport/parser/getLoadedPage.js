import sendRequest   from '../../libs/sendRequest';
import getLoadedHtml from '../../libs/getLoadedHtml';
import config        from '../../config';

export default getLoadedPage;

async function getLoadedPage(link) {
    const response  = await sendRequest(config.get('baseUrl') + link);
    
    return getLoadedHtml(response.body);
}