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
        console.log(data);
        
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
                        <button class="button"><i class="fa-solid fa-arrow-right"></i></button>
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