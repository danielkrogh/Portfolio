// Inputs
const pages = [
    {
        title: 'Introduktion',
        class: 'flex-50',
        contentLeft: 'Til dagligt har jeg, som Developer & Tracking Specialist hos LAZZAWEB, ansvaret for at øge effektiviteten blandt LAZZAWEBs medarbejdere gennem udvikling, tracking og diverse andre tiltag.',
        imageRight: 'https://kroghkommunikation.dk/wp-content/uploads/DKA.jpg'
    },
    {
        title: 'Projekter'
    },
    {
        title: 'Erfaring'
    },
    {
        title: 'Kontakt'
    }
]

// Create array of anchors
const anchors = pages.map(page => page.title.toLowerCase().replaceAll('æ', 'ae').replaceAll('ø', 'oe').replaceAll('å', 'aa'))



// Create sections in DOM
anchors.forEach((anchor, i) => {
    const section = document.createElement('section')
    section.setAttribute('id', anchor)
    const div = document.createElement('div')

    if (pages[i].class == 'flex-50') {
        section.setAttribute('class', 'flex-50')

        if (pages[i].contentLeft) {
            div.innerHTML += `<article><h1>${pages[i].title}</h1><p>${pages[i].contentLeft}</p></article>`
        }

        if (pages[i].imageRight) {
            div.innerHTML += `<article><img src="${pages[i].imageRight}"></article>`
        }
        
    } else {
        div.innerHTML = `<h1>${pages[i].title}<h1>`
    }
    
    section.insertAdjacentElement('beforeend', div)
    document.querySelector('#content').insertAdjacentElement('beforeend', section)
})

// Create navigation
const a = document.createElement('a')
a.setAttribute('href', `/#${anchors[0]}`)
a.innerText = 'Hjem'

let ul = document.createElement('ul')

anchors.forEach((anchor, i) => {
    let li = document.createElement('li')

    let ulA = document.createElement('a')
    ulA.setAttribute('href', `/#${anchor}`)
    ulA.innerText = pages[i].title

    li.insertAdjacentElement('beforeend', ulA)
    ul.insertAdjacentElement('beforeend', li)
})

document.querySelector('nav').insertAdjacentElement('beforeend', a)
document.querySelector('nav').insertAdjacentElement('beforeend', ul)



function handleScroll(direction) {
    if (window.location.hash) {
        let lastIndex = anchors.length - 1
        let currIndex = anchors.indexOf(window.location.hash.replace('#', ''))


        if (direction == 'down' && currIndex != lastIndex) {
            window.location.href = `#${anchors[currIndex + 1]}`
    
        } else if (direction == 'up' && currIndex != 0) {
            window.location.href = `#${anchors[currIndex - 1]}`
        }

    } else {
        if (direction == 'down') {
            window.location.href = `#${anchors[1]}`
        }
    }
}



// Handle scroll with mouse
window.addEventListener('wheel', event => {event.preventDefault()}, {passive: false})
window.addEventListener('wheel', mouseScroll)

async function mouseScroll(event) {
    window.removeEventListener('wheel', mouseScroll)

    if (event.deltaY > 0) {
        handleScroll('down')
    } else if (event.deltaY < 0) {
        handleScroll('up')
    }

    await new Promise(r => setTimeout(r, 500))

    window.addEventListener('wheel', mouseScroll)
}


// Handle keyboard
window.addEventListener('keydown', event => {
    event.preventDefault()

    if(event.key == 'ArrowDown' || event.key == 'PageDown') {
        handleScroll('down')
    } else if (event.key == 'ArrowUp' || event.key == 'PageUp') {
        handleScroll('up')
    } 
})


// Handle touchscreen
var firstTouch = 0
const content = document.querySelector('#content')

content.addEventListener('touchstart', event => {
    event.preventDefault()
    firstTouch = event.touches[0].pageY
}, {
    passive: false
})

content.addEventListener('touchend', event => {event.preventDefault()}, {passive: false})
content.addEventListener('touchend', touchScreenScroll)

async function touchScreenScroll(event) {
    content.removeEventListener('touchend', touchScreenScroll)

    if(event.changedTouches[0].pageY < firstTouch) {
        handleScroll('down')
    } else {
        handleScroll('up')
    }

    await new Promise(r => setTimeout(r, 500))

    content.addEventListener('touchend', touchScreenScroll)
}



// Mobile nav
mobileNav()

window.addEventListener('resize', () => {
    mobileNav()
})

function mobileNav() {
    const mobileNav = document.querySelector('#mobile-nav')

    if (!mobileNav && window.innerWidth <= 768) {
        let div = document.createElement('div')
        div.id = 'mobile-nav'
        div.innerText = 'NAV'

        div.addEventListener('click', () => {
            document.querySelector('header nav ul').classList.toggle('active')
        })

        document.querySelector('header nav').appendChild(div)
    } else if (mobileNav && window.innerWidth > 768) {
        mobileNav.remove()
    }    
}