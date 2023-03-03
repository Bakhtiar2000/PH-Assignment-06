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
        // console.log(data.id);
        
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
    console.log(info);

    const aiDetails= document.getElementById('ai-details');
        aiDetails.innerHTML=`
        <div class="border border-danger-subtle rounded-2 p-3" style="width: 100%; background-color: #f5dfcf57;">
                    <p class="fs-4 fw-bold text-center">${info.description? info.description: 'Description Unavailable'}</p>
                    <div class="d-flex justify-content-center align-items-center gap-3">
                        <div class="rounded-2 bg-white p-1 p-md-3 text-center text-success fw-semibold">
                            <p>${info.pricing[0].price? info.pricing[0].price: 'Free of Cost/'}</p>
                            <p>${info.pricing[0].plan? info.pricing[0].plan: 'Basic'}</p>
                        </div>
                        <div class="rounded-2 bg-white  p-1 p-md-3 text-center text-primary fw-semibold">
                            <p>${info.pricing[1].price? info.pricing[1].price: 'Free of Cost/'}</p>
                            <p>${info.pricing[1].plan? info.pricing[1].plan: 'Pro'}</p>
                        </div>
                        <div class="rounded-2 bg-white  p-1 p-md-3 text-center text-warning fw-semibold">
                            <p>${info.pricing[2].price? info.pricing[2].price: 'Free of Cost/'}</p>
                            <p>${info.pricing[2].plan? info.pricing[2].plan: 'Enterprise'}</p>
                        </div>
                    </div>
            
                    <div class="mt-3 d-flex justify-content-around gap-3 text-start">
                        <div class=" p-2">
                            <h3 class="fs-3 fw-semibold">Features</h3>
                            <ul>
                                <li>${info.features[1].feature_name? info.features[1].feature_name: 'No Data Found'}</li>
                                <li>${info.features[2].feature_name? info.features[2].feature_name: 'No Data Found'}</li>
                                <li>${info.features[3].feature_name? info.features[3].feature_name: 'No Data Found'}</li>
                            </ul>
                        </div>
                        <div class=" p-2">
                            <h3 class="fs-3 fw-semibold">Integrations </h3>
                            <ul>
                                <li>${info.integrations[0]? info.integrations[0]: 'No Data Found'}</li>
                                <li>${info.integrations[1]? info.integrations[1]: 'No Data Found'}</li>
                                <li>${info.integrations[2]? info.integrations[2]: 'No Data Found'}</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                <div class="border border-secondary-subtle rounded-2 p-3" style="width: 100%">
                        <div class="d-flex justify-content-center position-relative">
                            <img src="${info.image_link[0]}" class="img-fluid rounded-2">
                            <div style="top: 1%; right:1%; transform: translate(-1%, -1%);" class="bg-danger text-white py-1 px-3 rounded-2 mt-2 position-absolute">${info.accuracy.score*100}% Accuracy</div>
                        </div>
                        <h3 class="mt-3 fs-3 fw-semibold">${info.input_output_examples[0].input? info.input_output_examples[0].input: 'No examples to show'}</h3>
                        <p>${info.input_output_examples[1].output? info.input_output_examples[0].output: 'No! Not Yet! Take a break!!!'}</p>
                    </div>
        `
}