import cheerio from 'cheerio';

export default getLoadedHtml;

function getLoadedHtml(html) {
    return cheerio.load(html);
}