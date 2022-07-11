window.addEventListener('wheel', function(event) {
    event.preventDefault()

    

    if (window.location.hash) {
        let lastSection = document.querySelectorAll('[id*="sec-"]').length
        let currSection = parseInt(window.location.hash.split('-')[1])

        if (event.deltaY > 0 && currSection != lastSection) {
            window.location.href = `#sec-${currSection + 1}`
    
        } else if (event.deltaY < 0 && currSection != 1) {
            window.location.href = `#sec-${currSection - 1}`
        }

    } else {
        if (event.deltaY > 0) {
            window.location.href = '#sec-2'
        }
    }
    
    
}, {
    passive: false
});