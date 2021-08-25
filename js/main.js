//Slider
const $sliderCont = document.querySelector('.slider-container'),
      $sliderRow = document.querySelector('.slider-row'),
      $slides = document.querySelectorAll('.slider-row .slide'),
      $dotsRow = document.querySelector('.section-slider .dots-row')
      slideTarget = 150,
      sliderPaddings = 100,
      slideGap = 100

let slideWidth = $sliderCont.clientWidth - sliderPaddings,
    sliderStart = false,
    startPos = 0,
    secondPos = 0,
    slideIndex = 0,
    dotsItems = ''

//Count dots items
for (let i = 0; i < $slides.length; i++) {
    dotsItems += '<div class="dot-item"></div>'
}
$dotsRow.innerHTML = dotsItems
const $dotsItems = document.querySelectorAll('.section-slider .dots-row .dot-item')
$dotsItems[slideIndex].classList.add('active')

const calcSlideWidth = (width) => {
    $slides.forEach(slide => {
        slide.style.width = width + 'px'
    })
}

const changeSlideIndex = (val) => {
    $dotsItems[slideIndex].classList.remove('active')
    if (val) {
        slideIndex++
    }
    else {
        slideIndex--
    }

    if (slideIndex > ($slides.length - 1)) {
        slideIndex = 0
    }
    if (slideIndex < 0) {
        slideIndex = ($slides.length - 1)
    }

    $dotsItems[slideIndex].classList.add('active')

    sliderControllerTransform(slideIndex)
} 

const sliderControllerTransform = (slide) => {
    const distance = slide * (slideWidth + slideGap)

    $sliderRow.style.cssText = `transform: translateX(${-1 * (distance)}px)`
}

const start = (e) => {
    sliderStart = true
    $sliderRow.classList.remove('animate')
    startPos = e.pageX  
}

const move = (e) => {
    if (sliderStart) {
        secondPos = - e.pageX + startPos

        $sliderRow.style.cssText = `transform: translateX(${-1 * (secondPos + slideIndex * (slideWidth + slideGap))}px)`
    }
}

const end = () => {
    if (sliderStart) {
        $sliderRow.classList.add('animate')

        sliderStart = false

        if (secondPos > slideTarget && slideIndex < ($slides.length - 1)) {
            changeSlideIndex(true)
        }
        else if (secondPos < -slideTarget && slideIndex > 0) {
            changeSlideIndex(false)
        }
   
        sliderControllerTransform(slideIndex)
        secondPos = 0
    }
}

calcSlideWidth(slideWidth)

$sliderCont.addEventListener('mousedown', (e) => {//mouse
    start(e)
})
window.addEventListener('mousemove', (e) => {
    move(e)
})
window.addEventListener('mouseup', () => {
    end()
})

$sliderCont.addEventListener('touchstart', (e) => {//touch
    start(e.touches[0])
})
window.addEventListener('touchmove', (e) => {
    move(e.touches[0])
})

window.addEventListener('touchend', () => {
    end()
})

window.addEventListener('resize', () => {//resized
    $sliderRow.classList.remove('animate')

    slideWidth = $sliderCont.clientWidth - sliderPaddings 

    calcSlideWidth(slideWidth)

    sliderControllerTransform(slideIndex)
})

//SliderButtons
document.querySelector('.section-slider').addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if (btn) {
        if (btn.dataset.sliderMove === 'left') {
            changeSlideIndex(false)
        }
        else if (btn.dataset.sliderMove === 'right') {
            changeSlideIndex(true)
        }
    }
})


//MobileMenu
document.getElementById('menu-btn').addEventListener('click', (e) => {
    document.querySelector('.mobile-nav').classList.toggle('show')
})