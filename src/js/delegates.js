import openCard from './handles/openCard'

export default function () {

    function handleCard(event) {
        let $card = event.target
        if(!$card.classList.contains('.card')){
            $card = $card.closest('.card')
        }

        let $img = $card.querySelector('img')
        
        let sourceCoordinates = $card.getBoundingClientRect()

        openCard(sourceCoordinates)

    }

    const $cards = document.querySelectorAll('.list-cards .card')

    $cards.forEach($card => {
        $card.onmousedown = handleCard
    })

}
