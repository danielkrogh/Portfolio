// Inputs
const pages = ['her', 'går', 'det', 'godt']



// Inputs tilpasset
const anchors = pages.map(page => page.replaceAll('æ', 'ae').replaceAll('ø', 'oe').replaceAll('å', 'aa'))

// Opret sektioner
anchors.forEach((anchor, i) => {
    let section = document.createElement('section')
    section.setAttribute('id', anchor)
    section.innerText = pages[i]

    document.querySelector('#container').insertAdjacentElement('beforeend', section)
})



// Håndtering af scroll m. mus
window.addEventListener('wheel', function(event) {
    event.preventDefault()

    if (window.location.hash) {
        let lastIndex = anchors.length - 1
        let currIndex = anchors.indexOf(window.location.hash.replace('#', ''))


        if (event.deltaY > 0 && currIndex != lastIndex) {
            window.location.href = `#${anchors[currIndex + 1]}`
    
        } else if (event.deltaY < 0 && currIndex != 0) {
            window.location.href = `#${anchors[currIndex - 1]}`
        }

    } else {
        if (event.deltaY > 0) {
            window.location.href = `#${anchors[1]}`
        }
    }
    
    
}, {
    passive: false
});