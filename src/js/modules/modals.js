const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, clooseClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector)
        const modal = document.querySelector(modalSelector)
        const close = document.querySelector(closeSelector)
        const windows = document.querySelectorAll('[data-modal]')
        const scroll = calcScroll()

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault()
                }

                windows.forEach(item => {
                    item.style.display = 'none'
                })
                modal.style.display = "block"
                document.body.style.overflow = "hidden"
                document.body.style.marginRight = `${scroll}px`
            })
        })


        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none'
            })
            modal.style.display = "none"
            document.body.style.overflow = ""
            document.body.style.marginRight = `0px`

        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal && clooseClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none'
                })
                modal.style.display = "none"
                document.body.style.overflow = ""
                document.body.style.marginRight = `0px`
            }
        })
    }
    function showModalByTime(selector, time) {
        setTimeout(function () {
            let display

            document.querySelectorAll("[data-modal]").forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block'
                }
            })
            if (!display) {
                document.querySelector(selector).style.display = 'block'
                document.body.style.overflow = "hidden"
            }
        }, time)
    }

    function calcScroll() {
        let div = document.createElement('div')
        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflowY = 'scroll'
        div.style.visibility = 'hidden'

        document.body.appendChild(div)
        let crollWidth = div.offsetWidth - div.clientWidth

        div.remove()

        return crollWidth
    }


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close')
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')

    showModalByTime('button-consultation ', 60000)
}
export default modals