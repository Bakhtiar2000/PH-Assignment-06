//Fetch operation using async await keywords

const loadAiInformation= async()=> {
    try{
        const url= `https://openapi.programming-hero.com/api/ai/tools`;

        const res= await fetch(url);
        const data= await res.json();
        displayAiInformation(data.data.tools);
    }
    catch(error){
        console.log(error);
    }
}

const displayAiInformation= (info)=>{
    const cardContainer= document.getElementById('card-container');
    const seeMoreButton= document.getElementById('see-more-button')

    if(info.length>6){
        info= info.slice(0, 6);
    }
    else{
        seeMoreButton.classList.add('d-none');
    }
    info.forEach(data => {
        console.log(data.id);
        
        const boxDiv= document.createElement('div');
        boxDiv.classList.add('col');
        boxDiv.innerHTML=`
        <div class="col">
                <div class="card h-100">
                    <img src="${data.image? data.image: 'Unavailable'}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <ol class="card-text">
                            <li>${data.features[0]}</li>
                            <li>${data.features[1]}</li>
                            <li>${data.features[2]}</li>
                        </ol>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <div>
                            <p>${data.name}</p>
                            <p><i class="fa-regular fa-calendar-days"></i> ${data.published_in}</p>
                        </div>
                        <button onclick= "loadAiInformationById('${data.id}')" href="#" class="button" data-bs-toggle="modal" data-bs-target="#aiDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(boxDiv);
    });
    toggleSpinner(false);
}

document.getElementById('date-button').addEventListener('click', function(){
   
})

document.getElementById('see-more-button').addEventListener('click', function(){
    toggleSpinner(true);

    loadAiInformation();
})

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

loadAiInformation();



const loadAiInformationById= async(id)=> {
    try{
        const url= `https://openapi.programming-hero.com/api/ai/tool/${id}`;

        const res= await fetch(url);
        const data= await res.json();
        displayAiInformationById(data.data);
    }
    catch(error){
        console.log(error);
    }
}

const displayAiInformationById= (info)=>{
    console.log(info.features[1]);

    const aiDetails= document.getElementById('ai-details');
        aiDetails.innerHTML=`
        
        `
}

/* <div class="p-3">
        <p class="fs-2 text-center">${info.description? info.description: 'Description Unavailable'}</p>
        <div class="fs-4 d-flex justify-content-center">
            <div class="p-3 text-center text-success fw-semibold">
                <p>${info.pricing[0].price? info.pricing[0].price: 'Free of Cost/ Basic'}</p>
            </div>
            <div class="p-3 text-center text-primary fw-semibold">
                <p>${info.pricing[1].price? info.pricing[1].price: 'Free of Cost/ Pro'}</p>
            </div>
            <div class="p-3 text-center text-warning fw-semibold">
                <p>${info.pricing[2].price? info.pricing[2].price: 'Free of Cost/ Enterprize'}</p>
            </div>
        </div>

        <div>
            <div>
                <h3 class="fs-2 fw-semibold">Features</h3>
                <ul>
                    <li>${info.features[1].feature_name? info.features[1].feature_name: 'No Data Found'}</li>
                    <li>${info.features[2].feature_name? info.features[2].feature_name: 'No Data Found'}</li>
                </ul>
            </div>
            <div>
                <h3 class="fs-2 fw-semibold">Integrations </h3>
                <ul>
                    <li>${info.integrations[0].price? info.integrations[0].price: 'No Data Found'}</li>
                    <li>${info.integrations[1].price? info.integrations[1].price: 'No Data Found'}</li>
                    <li>${info.integrations[2].price? info.integrations[2].price: 'No Data Found'}</li>
                </ul>
            </div>
        </div>
        </div>
        <div class="p-3">
            <img src="${info.image_link[0]}" alt="">
        </div> */