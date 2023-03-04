function processData(data) {
    const cardContainer = document.getElementById('card-container');
    const boxDiv = document.createElement('div');
    boxDiv.classList.add('col');
    boxDiv.innerHTML = `
        <div class="col">
                <div class="card h-100">
                    <img src="${data.image ? data.image : 'Unavailable'}" class="card-img-top" alt="...">
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
};