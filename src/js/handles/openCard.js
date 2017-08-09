import templatePageProduct from '../../views/prodoct/index.hbs'
import Pages from '../pages'
import Velocity from 'velocity-animate'
import Choreographer from 'choreographer-js'
import hammer from 'hammerjs'

export default function (sourceCoordinates) {

    let htmlPage = templatePageProduct(sourceCoordinates)
    let $newPage = Pages.push(htmlPage)

    document.body.style.overflow = 'hidden'

    // let choreographer = new Choreographer({
    //     animations: [
    // {
    //     range: [-1, 270],
    //     selector: $newPage.querySelector('.color'),
    //     type: 'scale',
    //     style: 'opacity',
    //     from: 0,
    //     to: 1
    // },
    // {
    //     range: [0, 270],
    //     selector: $newPage.querySelector('img'),
    //     type: 'scale',
    //     style: 'transform:translateY',
    //     from: 0,
    //     to: 100,
    //     unit: 'px'
    // }
    //     ]
    // })

    // let $cover = $newPage.querySelector('.cover')
    // $cover.style.top = '0px'
    // $cover.style.left = '0px'

    // let touch = hammer($newPage);

    // touch.on('pandown', (event) => {
    //     console.log(event);
    // });

    window.YYY = 0;

    $newPage.addEventListener('touchstart', (event) => {
        console.log(event)
        let x, y;

        let touch = event.touches[0];

        x = touch.clientX
        y = touch.clientY

        window.YYY = y;

        console.log(x, y)

        let currentTranslateY = new WebKitCSSMatrix(window.getComputedStyle($newPage).webkitTransform).m42;

        window.YYY = window.YYY - currentTranslateY;

        console.log('YYY', window.YYY);
        if($newPage.scrollTop == 0){
            $newPage.scrollTop = 1;
        }

    }, { passive: true });

    $newPage.addEventListener('touchend', (event) => {
        if ($newPage.getBoundingClientRect().top > 0) {
            console.error('sai')
            document.body.style.overflow = 'auto'
            Velocity($newPage.querySelector('.cover'), {
                height: ['180px', '50vh']
            }, {
                    duration: 200, easing: 'easeInOut', complete() {
                        $newPage.remove()
                    }
                })
            Velocity($newPage, {
                height: [sourceCoordinates.height + 'px', '100vh'],
                width: [sourceCoordinates.width + 'px', '100vw'],
                top: [sourceCoordinates.top + 'px', '0px'],
                left: [sourceCoordinates.left + 'px', '0px'],
                translateY: ['0px', $newPage.getBoundingClientRect().top + 'px'],
                scaleX: ['1', new WebKitCSSMatrix(window.getComputedStyle($newPage).webkitTransform).m22],
                scaleY: ['1', new WebKitCSSMatrix(window.getComputedStyle($newPage).webkitTransform).m22]
            }, {
                    duration: 200, easing: 'easeInOut', complete() {
                        $newPage.remove()
                    }
                })
        }
    });
    $newPage.addEventListener('touchmove', (event) => {
        console.log('getBoundingClientRect', $newPage.getBoundingClientRect().top)

        if ($newPage.getBoundingClientRect().top <= 0) {
            // $newPage.style.transform = `translateY(0px)`
            // return;
        }
        console.log('scrollTop', $newPage.scrollTop)
        if ($newPage.scrollTop == 0 && $newPage.getBoundingClientRect().top >= 0) {
            event.preventDefault();
            let x, y;

            let touch = event.touches[0];

            x = touch.clientX
            y = touch.clientY
            let distance = y - window.YYY;
            console.log('distance', 1 - (distance / 500))
            let scale = 1 - (distance / 500)

            console.log('scale', new WebKitCSSMatrix(window.getComputedStyle($newPage).webkitTransform).m22)

            if(scale <= 0.9){
                // $newPage.style.transform = `translateY(${distance}px) scale(0.9)`
                $newPage.style.transform = `translateY(${distance}px)`
            } else {
                // $newPage.querySelector('.cover').style.height = ($newPage.querySelector('.cover').getClientRects()[0].height - scale)+'px'
                // $newPage.style.transform = `translateY(${distance}px) scale(${scale})`
                $newPage.style.transform = `translateY(${distance}px)`
            }
            // $newPage.style.transform = `translateY(${distance}px)`
        } else {
            $newPage.style.transform = `translateY(0px)`
        }

    }, false);

    $newPage.onscroll = (event) => {

        // if($newPage.querySelector('.header-product').getBoundingClientRect().top <= 60){
        //     $cover.style.position = 'sticky'
        //     $cover.style.maxHeight = '60px'
        //     return;
        // } else {
        //     $cover.style.position = 'relative'
        //     $cover.style.maxHeight = '50vh'
        // }
        // choreographer.runAnimationsAt(event.target.scrollTop)

    }

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
                duration: 200, easing: 'easeInOut', complete() {
                    $newPage.remove()
                }
            })
        Velocity($newPage.querySelector('.cover'), {
            height: ['180px', '50vh']
        }, {
                duration: 200, easing: 'easeInOut', complete() {
                    $newPage.remove()
                }
            })

        document.body.style.overflow = 'auto'
    }

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