
function getTimeString(time){
    // get Hour and rest seconds
    // const year = parseInt (86400 * 360) ${year}year 
    // const month = parseInt (day / 30)  ${month}month
    const day = parseInt (time / 86400); // 86400 second = 1 day 
    // let remainingSecond1 = time % 86400     
    
    const hour = parseInt (time / 3600); // 3600 second = 1 hour
    let remainingSecond = time % 3600;
    const minute = parseInt (remainingSecond / 60);
    remainingSecond = remainingSecond % 60;

    return `  ${day} day ${hour} hour ${minute} minute  ${remainingSecond} second ago`
}

// remove Active class
const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn")
    for (let btn of buttons){
        btn.classList.remove('active');
    }
}


// 1. fetch, Load and show Categories on html
//create LoadCategories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

        // category: "Music"
        // category_id: "1001"

//create DisplayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach( (item) => {
        //create a button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =`
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
        `
        
        // add button to category container
        categoryContainer.append(buttonContainer);
    })
}


const loadVideos = (searchText = "") => {
    // fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
}

const loadCategoryVideos = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // sobaik active class remove koro
            removeActiveClass()

            // id er class k active koro
            const actiiveBtn = document.getElementById(`btn-${id}`);
            actiiveBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))
}

// Load Details
const loadDetails = async (videoId) =>{
    // console.log(videoId);
    const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res. json();
    displayDetails(data.video);
}

// display details
const displayDetails = (video) => {
    // console.log(video)
    const detailContainer = document.getElementById('modal-content');
    detailContainer.innerHTML = `
        <img src=${video.thumbnail}/>
        <p>${video.description}</p>

    `;


    // way-1
        // document.getElementById('showModalData').click();

    // way-2
        document.getElementById('customModal').showModal();
}

// const cardDemo = (
//     {
//         category_id: "1003",
//         video_id: "aaac",
//         thumbnail: "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//         title: "Laugh at My Pain",
//         authors: [
//             {
//                 profile_picture: "https://i.ibb.co/XVHM7NP/kevin.jpg",
//                 profile_name: "Kevin Hart",
//                 verified: false
//             }
//         ],
//         others: {
//             views: "1.1K",
//             posted_date: "13885"
//         },
//         description: "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
//     }
// )


const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if(videos.length == 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col mx-[500px] justify-center item-center">
            <img class="w-56" src= "Icon.png" />
        </div>
        <h2 class=" ml-[450px] text-2xl font-bold "> No Content Here in this Category! </h2>
        `;
        return;
    }
    else{
        videoContainer.classList.add('grid')
    }
   

    videos.forEach((video) => {
        // console.log(video)
        const card = document.createElement('div');
        card.classList = 'card card-compact '
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img
            src=${video.thumbnail}
            class="h-full w-full object-cover"
            alt="Shoes" />
            ${
                video.others.posted_date?.length === 0
                ? ""
                : `<span class="absolute right-2 bottom-2 bg-black text-xs text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
            }
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src= ${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400"> ${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified == true
                    ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" /> `
                    : ""}
                    
                </div>
               
                <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error mt-2">Details</button></p>
            </div>
        </div>
        `
        videoContainer.append(card);
    })
}


// document.getElementById('search-input').addEventListener('keyup',function{})
document.getElementById('search-input').addEventListener('keyup',(e)=>{
    loadVideos(e.target.value)
});

loadCategories()
loadVideos()



