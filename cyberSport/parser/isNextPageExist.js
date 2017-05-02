export default isNextPageExist;

const NEXT_PAGE_LINK_SELECTOR = 'ul.pager li.next a';

function isNextPageExist($) {
    return $(NEXT_PAGE_LINK_SELECTOR).text() ? true : false
}