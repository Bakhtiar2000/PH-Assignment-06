//Fetch operation using async await keywords

const loadAiInformation= async()=> {
    try{
        const url= `https://openapi.programming-hero.com/api/ai/tools`;

        const res= await fetch(url);
        const data= await res.json();
        displayAiInformation(data.data);
    }
    catch(error){
        console.log(error);
    }
}

const displayAiInformation= (data)=>{
    console.log(data);
}

loadAiInformation();