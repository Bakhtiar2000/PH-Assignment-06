function insertData(sortedData) {
    const cardContainer = document.getElementById('card-container');
    const boxDiv = document.createElement('div');
    boxDiv.classList.add('col');
    boxDiv.innerHTML = `
        <div class="col">
                <div class="card h-100">
                    <img src="${sortedData.image ? sortedData.image : 'Unavailable'}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <ol class="card-text">
                            <li>${sortedData.features[0]}</li>
                            <li>${sortedData.features[1]}</li>
                            <li>${sortedData.features[2]}</li>
                        </ol>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <div>
                            <p>${sortedData.name}</p>
                            <p><i class="fa-regular fa-calendar-days"></i> ${sortedData.published_in}</p>
                        </div>
                        <button onclick= "loadAiInformationById('${sortedData.id}')" href="#" class="button" data-bs-toggle="modal" data-bs-target="#aiDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        `
    cardContainer.appendChild(boxDiv);
};