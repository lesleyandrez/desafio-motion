import templatePageProduct from '../../views/prodoct/index.hbs'
import Pages from '../pages'
import Velocity from 'velocity-animate'

export default function (sourceCoordinates) {

    let htmlPage = templatePageProduct(sourceCoordinates)
    let $newPage = Pages.push(htmlPage)

    $newPage.onmousedown = () => {
        Velocity($newPage.querySelectorAll('p'), {
            opacity: [0, 1]
        }, { duration: 0 })
        Velocity($newPage, {
            height: [sourceCoordinates.height + 'px', '100vh'],
            width: [sourceCoordinates.width + 'px', '100vw'],
            top: [sourceCoordinates.top + 'px', '0px'],
            left: [sourceCoordinates.left + 'px', '0px']
        }, {
                duration: 100, easing: 'easeInOut', complete() {
                    setTimeout(() => {
                        $newPage.remove()
                    }, 500);
                }
            })
        Velocity($newPage.querySelector('.cover'), {
            height: ['180px', '50vh']
        }, {
                duration: 100, easing: 'easeInOut', complete() {
                    setTimeout(() => {
                        $newPage.remove()
                    }, 500);
                }
            })
    }

    console.log(sourceCoordinates)

    Velocity($newPage, {
        height: ['100vh', sourceCoordinates.height + 'px'],
        width: ['100vw', sourceCoordinates.width + 'px'],
        top: ['0px', sourceCoordinates.top + 'px'],
        left: ['0px', sourceCoordinates.left + 'px']
    }, { duration: 300, display: 'block', easing: 'easeIn' })

    Velocity($newPage.querySelector('.cover'), {
        height: ['50vh', '180px']
    }, { duration: 300, easing: 'easeIn' })

}