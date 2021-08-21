const $sliderCont = document.querySelector('.slider-container'),
      $sliderRow = document.querySelector('.slider-row'),
      $slides = document.querySelectorAll('.slider-row .slide'),
      $dotsRow = document.querySelector('.section-slider .dots-row')
      slideTarget = 150,
      slideOffset = 100

let slideWidth = $sliderCont.clientWidth - 100,
    sliderStart = false,
    startPos = 0,
    secondPos = 0,
    slideIndex = 0,
    dotsItems = ''

for (let slide of $slides) {
    slide.style.minWidth = slideWidth + 'px'
    dotsItems += '<div class="dot-item"></div>'
}

$dotsRow.innerHTML = dotsItems
const $dotsItems = document.querySelectorAll('.section-slider .dots-row .dot-item')
$dotsItems[slideIndex].classList.add('active')

const movement = (val) => {//changeIndex
    $dotsItems[slideIndex].classList.remove('active')
    if (val)
        slideIndex++
    else
        slideIndex--
    if (slideIndex > ($slides.length - 1))
        slideIndex = 0;
    if (slideIndex < 0)
        slideIndex = ($slides.length - 1)

    $dotsItems[slideIndex].classList.add('active')

    sliderController(slideIndex)
} 

const sliderController = (slide) => {
    const distance = slide * (slideWidth + slideOffset)

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

        $sliderRow.style.cssText = `transform: translateX(${-1 * (secondPos + slideIndex * (slideWidth + slideOffset))}px)`
    }
}

const end = () => {
    if (sliderStart) {
        $sliderRow.classList.add('animate')

        sliderStart = false

        if (secondPos > slideTarget && slideIndex < ($slides.length - 1))
            movement(true)
        else if (secondPos < -slideTarget && slideIndex > 0)
            movement(false)

        sliderController(slideIndex)
        secondPos = 0
    }
}

document.querySelector('.section-slider').addEventListener('click', (e) => {//buttons
    const btn = e.target.closest('button')
    if (btn) {
        if (btn.dataset.sliderMove === 'left')
            movement(false)
        else if (btn.dataset.sliderMove === 'right')
            movement(true)
    }
})

window.addEventListener('resize', () => {//resized
    $sliderRow.classList.remove('animate')

    slideWidth = $sliderCont.clientWidth - 100 

    for (let slide of $slides) {
        slide.style.minWidth = slideWidth + 'px'
    }

    sliderController(slideIndex)
})

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

document.getElementById('menu-btn').addEventListener('click', (e) => {
    document.querySelector('.mobile-nav').classList.toggle('show')
})