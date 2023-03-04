//Fetch operation using async await keywords
const loadAiInformation = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayAiInformation(data.data.tools, dataLimit);
            return data.data.tools;
        })
        .catch(error => console.log(error));
}

//Display all fetched data
const displayAiInformation = (info, dataLimit, sortDataByDate) => {

    const seeMoreButton = document.getElementById('see-more-button');

    //Restricting data upto 6
    if (info.length > 6 && dataLimit) {
        info = info.slice(0, 6);
    }
    else {
        seeMoreButton.classList.add('d-none');
    }

    const cardContainer = document.getElementById('card-container');

    document.getElementById('date-button').addEventListener('click', async () => {;
        const sortedData = info.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
        toggleSpinner(true);
        const cardContainer = document.getElementById('card-container');
        cardContainer.textContent = '';
        
        info.forEach(sortedData => {
        insertData(sortedData);
        toggleSpinner(false);
        return;
        });
    });

    //Fetching each data
    info.forEach(data => {
        insertData(data);
        toggleSpinner(false);
    });
}


// Spinner
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}


//See more button
document.getElementById('see-more-button').addEventListener('click', function () {
    toggleSpinner(true);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    loadAiInformation();
})




//Fetch operation using id parameter
const loadAiInformationById = async (id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayAiInformationById(data.data);
    }
    catch (error) {
        console.log(error);
    }
}


//Display single fetched data by id
const displayAiInformationById = (info) => {
    console.log(info);
    console.log(info.features);

    const aiDetails = document.getElementById('ai-details');
    aiDetails.innerHTML = `
        <div class="border border-danger-subtle rounded-2 p-3" style="width: 100%; background-color: #f5dfcf57;">
                    <p class="fs-4 fw-bold text-center">${info.description ? info.description : 'Description Unavailable'}</p>
                    <div class="d-flex justify-content-center align-items-center gap-3">
                        <div class="rounded-2 bg-white p-1 p-md-3 text-center text-success fw-semibold">
                            <p>${info.pricing ? info.pricing[0].price : 'Free of Cost/'}</p>
                            <p>${info.pricing ? info.pricing[0].plan : 'Basic'}</p>
                        </div>
                        <div class="rounded-2 bg-white  p-1 p-md-3 text-center text-primary fw-semibold">
                            <p>${info.pricing ? info.pricing[1].price : 'Free of Cost/'}</p>
                            <p>${info.pricing ? info.pricing[1].plan : 'Pro'}</p>
                        </div>
                        <div class="rounded-2 bg-white  p-1 p-md-3 text-center text-warning fw-semibold">
                            <p>${info.pricing ? info.pricing[2].price : 'Free of Cost/'}</p>
                            <p>${info.pricing ? info.pricing[2].plan : 'Enterprise'}</p>
                        </div>
                    </div>
            
                    <div class="mt-3 d-flex justify-content-around gap-3 text-start">
                        <div class=" p-2">
                            <h3 class="fs-3 fw-semibold">Features</h3>
                            <ul id="feature">
                            
                            
                            </ul>
                        </div>

                        <div class=" p-2">
                            <h3 class="fs-3 fw-semibold">Integrations </h3>
                            <ul id="integration">
                                

                            </ul>
                        </div>
                    </div>
                    </div>
                <div class="border border-secondary-subtle rounded-2 p-3" style="width: 100%">
                        <div class="d-flex justify-content-center position-relative">
                            <img src="${info.image_link[0]}" class="img-fluid rounded-2">
                            <div style="position:absolute; top: 1%; right:1%; transform: translate(-1%, -1%);" id="btn-accuracy" >
                            
                            </div>
                        </div>
                        <h3 class="mt-3 fs-3 fw-semibold">${info.input_output_examples ? info.input_output_examples[0].input : 'Can you give any example?'}</h3>
                        <p>${info.input_output_examples ? info.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                    </div>
        `

    //Pushing list items into feature div
    const feature = document.getElementById('feature');
    for (let i = 0; i < Object.keys(info.features).length; i++) {
        const listItem = document.createElement('li');
        listItem.innerText = `${Object.values(info.features)[i].feature_name}`
        feature.appendChild(listItem);
    }


    //Pushing list items into integration div
    const integration = document.getElementById('integration');
    if (info.integrations !== null) {
        for (let i = 0; i < info.integrations.length; i++) {
            const listItem = document.createElement('li');
            listItem.innerText = `${info.integrations[i]}`
            integration.appendChild(listItem);
        }
    }
    else {
        const listItem = document.createElement('li');
        listItem.innerText = `No Data Found`
        console.log('No data found');
        integration.appendChild(listItem);
    }

    //Pushing data into btn-accuracy
    const btnAccuracy = document.getElementById('btn-accuracy');
    const accuracyDiv = document.createElement('div');
    accuracyDiv.classList.add('bg-danger', 'text-white', 'py-1', 'px-3', 'rounded-2', 'mt-2')
    if (info.accuracy.score !== null) {
        accuracyDiv.innerHTML = `
            ${info.accuracy.score * 100 + ' % Accuracy'}
            `
        btnAccuracy.appendChild(accuracyDiv);
    }
}

//Loading information into the browser
loadAiInformation(6)
