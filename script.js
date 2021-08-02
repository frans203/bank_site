const modal = document.querySelector('.modal') 
const closeModal = document.querySelector('.close-modal')
const btn1 = document.querySelectorAll('.btn-1')
const btn2 = document.querySelector('.btn-2')
const overlay = document.querySelector('.overlay')
const cont1 = document.querySelector('.h-n') 
// console.log(cont1)
const nav = document.querySelector('.header-nav')
const header = document.querySelector('.header')
const sections = document.querySelectorAll('.section')
const menuBtn = document.querySelector('.menu-btn')
// console.log(btn1)
btn1.forEach(btn => {
    btn.addEventListener('click', function(e){
    e.preventDefault()
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
    console.log('a')

}) 
})
closeModal.addEventListener('click', function(e){
    e.preventDefault()
    modal.classList.add('hidden') 
    overlay.classList.add('hidden') 
})
// window.onbeforeunload = function(){
//     window.scrollTo(0,0)
// }

//header effect 
const height = header.getBoundingClientRect().height 
const headerObsF = (entries, observer) => {
    entries.forEach(entry => {
        // console.log(entry)
        
        if(!entry.isIntersecting){
        header.classList.add('header-js')
        } 
        if(entry.isIntersecting) header.classList.remove('header-js')
    })
}

const headerObserver = new IntersectionObserver(headerObsF, {
    root: null,
    threshold: 0,
    rootMargin: `-${height}px`

})
headerObserver.observe(cont1)
//menu fade animations 
const opacity = (e, value) => {
    // console.log(e.target)
    if(e.target.classList.contains('nav-link')){
        const link = e.target
        const siblings = link.closest('.header').querySelectorAll('.nav-link')  
        // console.log(siblings)
        const logo = document.querySelector('.header img')

        siblings.forEach(s => {
            if(link !== s) s.style.opacity = value
            logo.style.opacity = value
        })
        
    }
}
header.addEventListener('mouseover', function(e){
    opacity(e, 0.5)
})
header.addEventListener('mouseout', function(e){
    opacity(e,1)
}) 
//navigation 
nav.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.classList.contains('nav-link')){
        const id = `#section${e.target.dataset.sec}`
        const goSec = document.querySelector(id)
        // console.log(goSec)
        goSec.scrollIntoView({behavior:'smooth'})

    }
}) 
btn2.addEventListener('click', function(e){
    e.preventDefault
    document.querySelector('.section1').scrollIntoView({behavior: 'smooth'})
})
//content pages  
const secObsFunc = function(entries, observer){
    const [entry] = entries 
    if(entry.isIntersecting){
        entry.target.classList.remove('sec-js')
        observer.unobserve(entry.target)
       }
}
const secObserver = new IntersectionObserver (secObsFunc, {
    root: null,
    threshold: 0.1
})
// sections.forEach(sec => {
//     sec.classList.add('sec-js')
//     secObserver.observe(sec)
// })
//lazy images
const imgData = document.querySelectorAll('img[data-src]')
console.log(imgData)
const imgObsFunc = (entries, observer) => {
    const [entry] = entries
    if(!entry.isIntersecting) return
    // console.log(entry)
    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load', function(e){
        entry.target.classList.remove('ft-img')
    })
   observer.unobserve(entry.target)
    
}
const imgDataObserver = new IntersectionObserver(imgObsFunc, {
    root: null,
    threshold: 0.3,
    rootMargin: '-100px'
})
imgData.forEach(img => imgDataObserver.observe(img)) 

//slider 
const slider = function(){
const slides = document.querySelectorAll('.slide')
console.log(slides.length)
const btnLeft = document.querySelector('.slider__btn--left') 
const btnRight = document.querySelector('.slider__btn--right') 
const dotContainer = document.querySelector('.dots')
let curSlide = 0 
function init(){
createDots()
goToSlide(0)
activateDot(0)
}
const goToSlide = slide => {
    slides.forEach((s, i) => s.style.transform = `translateX(${100*(i-slide)}%)`)
}
const nextSlide = () => {
   
    if(curSlide === slides.length - 1) {
        curSlide = 0
    }else{
        curSlide++ 
    }
    goToSlide(curSlide)
    activateDot(curSlide)
    console.log(curSlide)
}
const prevSlide = () => {
    if(curSlide === 0 ) {curSlide = slides.length - 1}
    else{ curSlide-- }
    goToSlide(curSlide)
    activateDot(curSlide)
    console.log(curSlide)
}
btnRight.addEventListener('click',nextSlide) 
btnLeft.addEventListener('click', prevSlide)
document.addEventListener("keydown", function(e){
    if(e.key === "ArrowLeft"){
        prevSlide()
    }
    if (e.key === "ArrowRight"){
        nextSlide()
    }
})
 

//dots
const createDots = function(){
    slides.forEach((_, i) => {
     dotContainer.insertAdjacentHTML('beforeend', `<button class='dots__dot' data-slide='${i}'></button>`)
    })
} 

const activateDot = function(slide){
    document.querySelectorAll(`.dots__dot`).forEach(dot => dot.classList.remove('dots__dot--active'))
    // console.log(document.querySelector(`dots__dot[data-slide='${slide}']`))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

dotContainer.addEventListener('click', function(e){
e.preventDefault() 
if(e.target.classList.contains('dots__dot')){
    curSlide = Number(e.target.dataset.slide) 
    goToSlide(curSlide)
    activateDot(curSlide)
}
})

init()
}
slider() 
//operations
const btnsOp = document.querySelector('.buttons') 
const section2 = document.querySelector('#section2')
btnsOp.addEventListener('click', function(e){
    e.preventDefault() 
    const clicked = e.target.closest('.btn')
   
    if(!clicked) return 
    console.log(clicked)
    const data = Number(clicked.dataset.tab)
    console.log()
    // document.querySelector(`.sec2-text-active`)
    document.querySelector('.sec2-text-active').classList.remove('sec2-text-active')
    document.querySelector(`.operations__content--${data}`).classList.add("sec2-text-active")
}) 

//responsive nav;
menuBtn.addEventListener('click', function(e){
    e.preventDefault() 
    nav.classList.toggle('header-nav-tog')
    
})