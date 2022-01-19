// selectors
const container = document.querySelector('.container')
const kutu = document.querySelectorAll('.kutu')
const info = document.querySelector('.info')
const vicSound = document.querySelector('.victory-sound')
const hitSound = document.querySelector('.hit-sound')

// değişkenler
let hareketInterval
let arabaInterval
let odunInterval
let kurbagaInterval
let araclar = [new Araba()]
let odunlar = []
let kurbaga = new Kurbaga()
let odununUstunde = false

// constructors
function Araba() {
    this.left = -150
    this.html = document.createElement('div')

    const carRand = Math.floor(Math.random() * 3 + 1)
    const lineRand = Math.floor(Math.random() * 3 + 5)

    const html = this.html
    html.classList.add('idiv')
    const ihtml = document.createElement('img')
    ihtml.setAttribute('src', `./fotolar/araba${carRand}.png`)
    ihtml.setAttribute('alt', 'araba')
    html.appendChild(ihtml)

    kutu[lineRand].appendChild(html)
}

function Odun(lineRand) {
    this.left = 500
    this.html = document.createElement('div')

    const html = this.html
    html.classList.add('odiv')
    const ihtml = document.createElement('img')
    ihtml.setAttribute('src', `./fotolar/odun.png`)
    ihtml.setAttribute('alt', 'odun')
    html.style.left = `${this.left}px`
    html.appendChild(ihtml)

    kutu[lineRand].appendChild(html)
}

function Kurbaga() {
    this.left = 220
    this.bottom = 0
    this.html = document.createElement('div')

    const html = this.html
    html.classList.add('kurbaga')
    html.style.bottom = `${this.bottom}px`
    html.style.left = `${this.left}px`
    const ihtml = document.createElement('img')
    ihtml.setAttribute('src', `./fotolar/kurbağa.png`)
    ihtml.setAttribute('alt', 'kurbağa')

    html.appendChild(ihtml)
    container.appendChild(html)
}

// fonksiyon
function odunYolla() {
    const num = Math.floor(Math.random() * 10)
    switch (num) {
        case 0:
            odunlar.push(new Odun(1))
            setTimeout(() => {
                odunlar.push(new Odun(2))
            }, 200);
            setTimeout(() => {
                odunlar.push(new Odun(3))
            }, 100)
            break
        case 1:
            odunlar.push(new Odun(1))
            setTimeout(() => {
                odunlar.push(new Odun(2))
            }, 300);
            setTimeout(() => {
                odunlar.push(new Odun(3))
            }, 500)
            break
        case 2:
            odunlar.push(new Odun(1))
            setTimeout(() => {
                odunlar.push(new Odun(2))
            }, 700);
            setTimeout(() => {
                odunlar.push(new Odun(3))
            }, 00)
            break
        case 3:
            odunlar.push(new Odun(3))
            setTimeout(() => {
                odunlar.push(new Odun(2))
            }, 500);
            setTimeout(() => {
                odunlar.push(new Odun(1))
            }, 700)
            break
        case 4:
            odunlar.push(new Odun(1))
            setTimeout(() => {
                odunlar.push(new Odun(2))
            }, 800);
            setTimeout(() => {
                odunlar.push(new Odun(3))
            }, 200)
            break
        case 5:
            odunlar.push(new Odun(1))
            setTimeout(() => {
                odunlar.push(new Odun(2))
            }, 600)
            break
        case 6:
            odunlar.push(new Odun(1))
            setTimeout(() => {
                odunlar.push(new Odun(3))
            }, 400)
            break
        case 7:
            odunlar.push(new Odun(3))
            setTimeout(() => {
                odunlar.push(new Odun(2))
            }, 300);
            break
        case 8:
            odunlar.push(new Odun(3))
            setTimeout(() => {
                odunlar.push(new Odun(1))
            }, 450);
            break
        case 9:
            odunlar.push(new Odun(2))
            setTimeout(() => {
                odunlar.push(new Odun(1))
            }, 500);
            setTimeout(() => {
                odunlar.push(new Odun(3))
            }, 500)
            break
    }
}

function carpismaKontrol() {
    const kurbagaB = kurbaga.html.getBoundingClientRect().bottom
    const kurbagaR = kurbaga.html.getBoundingClientRect().right
    for (let i of araclar) {
        const iB = i.html.getBoundingClientRect().bottom
        const iR = i.html.getBoundingClientRect().right
        const iW = i.html.getBoundingClientRect().width

        if (kurbagaB < iB + 5 && kurbagaB > iB - 15 && kurbagaR - 50 <= iR && kurbagaR >= iR - iW) {
            clearInterval(hareketInterval)
            clearInterval(arabaInterval)
            hitSound.play()
            setTimeout(() => { location.reload() }, 500)
        }

    }

    if (kurbagaR - 50 <= 100) {
        clearInterval(hareketInterval)
        clearInterval(arabaInterval)
        hitSound.play()
        setTimeout(() => { location.reload() }, 500)
    }

}

function odunKontrol() {
    let lock = false
    const kurbagaBottom = kurbaga.html.getBoundingClientRect().bottom
    const kurbagaLeft = kurbaga.html.getBoundingClientRect().left
    const denizBottom = kutu[3].getBoundingClientRect().bottom
    const denizTop = kutu[1].getBoundingClientRect().top
    if (kurbagaBottom <= denizBottom && kurbagaBottom - 50 >= denizTop) {
        for (let i of odunlar) {
            const odunLeft = i.html.getBoundingClientRect().left
            const odunBottom = i.html.getBoundingClientRect().bottom
            if (kurbagaBottom <= odunBottom && kurbagaBottom >= odunBottom - 40 && kurbagaLeft >= odunLeft - 10 && kurbagaLeft <= odunLeft + 200) {
                kurbaga.left -= 1
                kurbaga.html.style.left = `${kurbaga.left}px`
                console.log('moving');
                lock = true
                break
            }
        }
        if (!lock) {
            clearInterval(hareketInterval)
            setTimeout(() => {
                location.reload()
            }, 300)
        }
    }
}

function bitisKontrol() {
    const kurbagaBottom = kurbaga.html.getBoundingClientRect().bottom

    if (kurbagaBottom <= 122) {
        clearInterval(hareketInterval)
        vicSound.play()
        setTimeout(() => {
            location.reload()
        }, 2200)
    }
}

// event listener
document.addEventListener('keyup', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (kurbaga.bottom < 500) {
                kurbaga.html.childNodes[0].style.transform = 'rotate(0deg)'
                kurbaga.bottom += 68
                kurbaga.html.style.bottom = `${kurbaga.bottom}px`
            }
            break
        case 'ArrowDown':
            if (kurbaga.bottom > 65) {
                kurbaga.html.childNodes[0].style.transform = 'rotate(180deg)'
                kurbaga.bottom -= 68
                kurbaga.html.style.bottom = `${kurbaga.bottom}px`
            }
            break
        case 'ArrowLeft':
            if (kurbaga.left > 50) {
                kurbaga.html.childNodes[0].style.transform = 'rotate(-90deg)'
                kurbaga.left -= 50
                kurbaga.html.style.left = `${kurbaga.left}px`
            }
            break
        case 'ArrowRight':
            if (kurbaga.left < 430) {
                kurbaga.html.childNodes[0].style.transform = 'rotate(90deg)'
                kurbaga.left += 50
                kurbaga.html.style.left = `${kurbaga.left}px`
            }
            break
    }

})

// interval
hareketInterval = setInterval(function() {
    for (let i of araclar) {
        i.left += 1
        i.html.style.left = `${i.left}px`
        if (i.left >= 500) {
            i.html.remove()
            araclar.shift()
        }

        // araçları sonradan display none başlatıp, sonradan display block yapmazsak yeni araçlar yüklenirken görsel bir hata oluşuyor
        if (i.left >= -140) {
            i.html.style.display = 'block'
        }
    }

    for (let i of odunlar) {
        i.left -= 1
        i.html.style.left = `${i.left}px`
        if (i.left == -220) {
            i.html.remove()
            odunlar.shift()
        }
    }
    carpismaKontrol()
    odunKontrol()
    bitisKontrol()
}, 10)

arabaInterval = setInterval(function() {
    araclar.push(new Araba())
}, 2000)

odunInterval = setInterval(function() {
    odunYolla()
}, 5000)