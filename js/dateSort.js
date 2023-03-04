document.getElementById('date-button').addEventListener('click', function(){
    const loadAiInformation= async(dataLimit)=> {
        try{
            const url= `https://openapi.programming-hero.com/api/ai/tools`;
    
            const res= await fetch(url);
            const data= await res.json();
            displayAiInformation(data.data.tools, dataLimit);
        }
        catch(error){
            console.log(error);
        }
    }
   

});




// const newInfo= info.sort((a,b)=>
// new Date(a.published_in)- new Date(b.published_in))
// displayAiInformation(newInfo);