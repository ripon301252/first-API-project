console.log('video')
// 1. fetch, Load and show Categories on html

//creat LoadCategories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

        // category: "Music"
        // category_id: "1001"

//creat DisplayCategories
const displayCategories = (categories) => {
    const categoriyContainer = document.getElementById('categories');

    categories.forEach( (item) => {
        console.log(item);

        //create a button
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        // add button to category container
        categoriyContainer.append(button);
    })
}

loadCategories()

const loadVideos = () => {
    // fetch the data
    fetch(' https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videos.forEach((video) => {
        console.log(video)
        const card = document.createElement('div');
        card.classList = 'card card-compact '
        card.innerHTML = `
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        videoContainer.append(card);
    })
}






loadVideos()