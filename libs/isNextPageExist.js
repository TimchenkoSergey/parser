export default isNextPageExist;

const NEXT_PAGE_LINK_SELECTOR = '.main-wrap .main ul.pager li.next a';

function isNextPageExist($) {
    return $(NEXT_PAGE_LINK_SELECTOR).text() ? true : false
}