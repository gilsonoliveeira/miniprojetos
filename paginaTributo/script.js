const images = [
    {'id': '1', 'url': './images/chester-2.jpg'},
    {'id': '2', 'url': './images/chester-1.jpg'},
    {'id': '3', 'url': './images/chester-3.jpg'},
    {'id': '4', 'url': './images/chester-4.jpg'}
];

const containerItems = document.getElementById("container-items")

const loadimages = (images,container) => {
    images.forEach(images =>{
        container.innerHTML += `
        <div class="item">
            <img src= ${images.url} />
        </div>
        `
    })
}

loadimages(images,containerItems);

let items = document.querySelectorAll(".item")

const previous = () => {
    containerItems.appendChild(items[0])
    items = document.querySelectorAll('.item')

}

const next = () => {
    const lastItem = items[items.length - 1];
    containerItems.insertBefore(lastItem,items[0]);
    items= document.querySelectorAll('.item');
}

document.getElementById('previous').addEventListener("click",previous);
document.getElementById('next').addEventListener('click',next);
