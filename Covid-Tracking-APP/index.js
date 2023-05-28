$(document).ready(function(){
    //Get json data from API
    $.getJSON("https://data.covid19india.org/data.json",function(data){
        var states= [];
        var active= [];
        var death= [];
        var recovered= [];
        var confirmed=[];
         
        var total_active;
        var total_confirmed;
        var total_death;
        var total_recovered;

        total_active = data.statewise[0].active;
        total_confirmed = data.statewise[0].confirmed;
        total_death = data.statewise[0].deaths;
        total_recovered = data.statewise[0].recovered;

        //Enters the data into arrary
        $.each(data.statewise,function(id,obj){
            states.push(obj.state);
            active.push(obj.active);
            death.push(obj.deaths);
            recovered.push(obj.recovered);
            confirmed.push(obj.confirmed);
        });

        //remove the first data from the array

        states.shift();
        active.shift();
        death.shift();
        recovered.shift();
        confirmed.shift();

        states= states.slice(0,20);
        active= active.slice(0,20);
        death= death.slice(0,20);
        recovered= recovered.slice(0,20);
        confirmed= confirmed.slice(0,20);

        //Display the total cases
        $("#confirmed").append(total_confirmed);
        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#deceased").append(total_death);
        
        //Chart part

        var myChart = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(myChart,{
            type:"bar",
            data:{
                labels:states,
                datasets:[
                    {
                        label:"Confirmed Cases",
                        data:confirmed,
                        backgroundColor: "#f1c40f",
                        // minBarLength: 100,
                    },
                    {
                        label:"Active Cases",
                        data:active,
                        backgroundColor: "Blue",
                        // minBarLength: 100,
                    },
                    {
                        label:"Recovered",
                        data:recovered,
                        backgroundColor: "#2ecc71",
                        // minBarLength: 100,
                    },
                    {
                        label:"Total Deaths",
                        data:death,
                        backgroundColor:"#e74c3c",
                        // minBarLength: 100,
                    },
                ],
            },
            option:
            {   
                responsive:true,
                maintainAspectRatio:false,
                animation:{
                    onProgress:function(animation){
                        progress.value=animation.animationObject.currentStep/animation.animationObject.numSteps;
                    }
                },
                layout:{
                    padding:{
                        left:50,
                        right:50,
                        top:0,
                        bottom:0,
                    }
                },
            },
        });
    });
});