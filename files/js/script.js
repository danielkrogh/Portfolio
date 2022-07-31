// Inputs
const pages = ['information', 'projekter', 'erfaring', 'kontakt']



// Create array of anchors
const anchors = pages.map(page => page.toLowerCase().replaceAll('æ', 'ae').replaceAll('ø', 'oe').replaceAll('å', 'aa'))

// Create sections in DOM
anchors.forEach((anchor, i) => {
    let section = document.createElement('section')
    section.setAttribute('id', anchor)
    section.innerText = pages[i]

    document.querySelector('#content').insertAdjacentElement('beforeend', section)
})

// Create navigation
let ul = document.createElement('ul')

anchors.forEach((anchor, i) => {
    let li = document.createElement('li')

    let a = document.createElement('a')
    a.setAttribute('href', `/#${anchor}`)
    a.innerText = pages[i]

    li.insertAdjacentElement('beforeend', a)
    ul.insertAdjacentElement('beforeend', li)
})

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