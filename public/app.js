document.querySelectorAll('.price').forEach(item => {
    item.textContent = new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(item.textContent)
})

const card = document.getElementById('main')

if (card) {
    card.addEventListener('click', evnt => {
        console.log(evnt.target)
        if (evnt.target.classList.contains('js-remove')) {
            console.log('ok')
        }
    })
}