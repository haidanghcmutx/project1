const carousel = document.querySelector(".carousel")
const arrowBtns = document.querySelectorAll(".wrapper i")
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children]


let isDragging = false, startX, startScrollLeft, timeoutId
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentElement("afterbegin", card.outerHTML)
})

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentElement("beforeend", card.outerHTML)
})

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
       carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
    })
}) 

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging")
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft
}
const dragging = (e) => {
      if(!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
    }

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging")
}

const infinityScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove('no-transition')
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove('no-transition')
    }
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(()=> 
        carousel.scrollLeft += firstCardWidth, 2500)
}

carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("scroll", infinityScroll)
document.addEventListener("mouseup", dragStop)