const $pageWrapper = document.querySelector('.wrapper-pages')

export default {
    push(htmlPage) {
        $pageWrapper.insertAdjacentHTML('beforeend', htmlPage)
        return $pageWrapper.lastElementChild
    }
}