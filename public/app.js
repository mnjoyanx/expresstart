document.querySelectorAll('.price').forEach(item => {
    item.textContent = new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(item.textContent)
})

const card = document.getElementById('main')

if (card) {
    card.addEventListener('click', evnt => {
        let _id = evnt.target.dataset.id
        if (evnt.target.classList.contains('js-remove')) {
            fetch('/card/remove/' + _id, {
                method: 'delete'
            }).then(res => {
                return res.json()
            }).then(book => {
                console.log(book, 'boook')
                if(book.items.length) {
                    const html = book.items.map(item => {
                        return `
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6 text-left whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="mr-2">
                                📚
                            </div>
                            <span class="font-medium">${ item.title }</span>
                        </div>
                    </td>
                    <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                            <div class="mr-2">
                                <img class="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"/>
                            </div>
                            <span class="price">${ item.price }</span>
                        </div>
                    </td>
                    <td class="py-3 px-6 text-center">
                        <div class="flex items-center justify-center">
                            <img class="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125" src="https://randomuser.me/api/portraits/men/1.jpg"/>
                        </div>
                    </td>
                    <td class="py-3 px-6 text-center">
                        <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"> ${item.count} </span>
                    </td>
                    <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center">
                            <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <button class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 js-remove" data-id="${item._id}">
                                remove
                            </button>
                        </div>
                    </td>
                </tr>
                    `
                    }).join('')
                    card.querySelector('tbody').innerHTML = html
                    card.querySelector('.price.main').textContent =  book.price 
                } else {    
                    card.innerHTML = `<p>Card is Empty</p>`
                }
            })
        }
    })
}