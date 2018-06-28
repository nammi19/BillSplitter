window.onload = function init(){
    createPeopleElements();
};

function tipCalc(){
    var bill = document.getElementById("bill").value;
    var tip = document.getElementById("tip").value;
    var calcTip =Math.round(100*((bill*tip)/100))/100;
    document.getElementById("calTip").innerHTML= "  = $" +calcTip.toFixed(2);
    return calcTip;
}

function totalBillCalc(){
    var billTotal = Number(document.getElementById("bill").value); // ensures number and not string;full value wanted; not just the interger. that's why no parseInt
    if(document.getElementById("tipCheck").checked ==true){
        billTotal += tipCalc();
    }
    var fullBill = (Math.round(100*billTotal)/100).toFixed(2);
    return fullBill;
}

            
function setTotalBill(fullBill){
    var totalBillElement = document.getElementById("totalBill");
    totalBillElement.innerHTML= "Total Bill : $"+ fullBill;
}
            
function setPersonalBill(){
    if(is100Percent()){
        calculateAndSetEachPersonsBill(totalBillCalc());
    }else{
        alert("All Person's Percentage of the Bill Together Must Equal to 100%");
    }
}
            
function createPeopleElements(){
    //based on the nuber of people, create relevant number of
    //form (to be visually better and manage easier),
    //inputs (for each, create one that takes names (text) and another that takes percentage(number),
    //and label (to show what individual owes to the bill) 
    clearPeoplesDiv();//clear the div containing people so that it is refreshed each time
    var totalPpl = document.getElementById("totalPeople").value;
    var quotient = Math.floor(100/totalPpl);
	var remainder = (100%totalPpl);
    //loop for totalPpl amount
    for (i=1;i<=totalPpl;i++){
        //create elements form, input, input, label
        var personForm = document.createElement("form");
        var peopleNameInput = document.createElement("input");
        var peoplePercentInput = document.createElement("input");
        var peopleOwed = document.createElement("label");
        //set needed attributes for each such as id(should be made unique by adding i), class, type, value etc
        personForm.setAttribute("id","personForm"+i);
        personForm.setAttribute("class","personForm");
                    
        peopleNameInput.setAttribute("id","peopleName"+i);
        peopleNameInput.setAttribute("class","peopleName");
        peopleNameInput.setAttribute("type","text");
        peopleNameInput.setAttribute("value","person "+i);

        peoplePercentInput.addEventListener("change", updatePercentage);
        peoplePercentInput.addEventListener("change", setPersonalBill);
        peoplePercentInput.addEventListener("focus", getStartingValue);
                    
        peoplePercentInput.setAttribute("id","peoplePercent"+i);
        peoplePercentInput.setAttribute("class","peoplePercent");
        peoplePercentInput.setAttribute("type","number");
        peoplePercentInput.setAttribute("step","1");
        peoplePercentInput.setAttribute("min","0");
        peoplePercentInput.setAttribute("max","100");
        //since we are assigning intial percentage based on total people,
        //we have to account for 2 situation:
        //1) 100 is perfectly divisible by total people: we simply assign the quotient to each
        //2) not perfectly divisible: i) we assign only the quotient to all percentage input except last
        // to the last one, we add both the quotient and remainder (this is done in the inner if-else statement
        //within the else part of outer if-else statemetn. As long as i < totalPpl, we know it is not the last one
        //.when i=totalPpl, we know, it is the last one.)
        /*if (100 % totalPpl==0){
            peoplePercentInput.setAttribute("value",100/totalPpl);
        }else{
            if (i<totalPpl){
                peoplePercentInput.setAttribute("value",Math.floor(100/totalPpl));
            }else{
                peoplePercentInput.setAttribute("value",Math.floor(100/totalPpl)+(100%totalPpl));
            }
        }*/
        
        if(remainder>0){
			peoplePercentInput.setAttribute("value",quotient+1);
		}else{
			peoplePercentInput.setAttribute("value",quotient);
		}
		remainder--;
                    
        peopleOwed.setAttribute("id","peopleOwed"+i);
        peopleOwed.setAttribute("class","peopleOwed");
                    
        //add to input, input, label to personForm
        personForm.appendChild(peopleNameInput);
        personForm.appendChild(peoplePercentInput);
        personForm.appendChild(peopleOwed);
                    
        //add form to people div
        var pplDiv = document.getElementById('peoplesDiv');
        pplDiv.appendChild(personForm);
                    
        //assign value
        document.getElementById("peopleOwed"+i).innerHTML="=  $0.00";
                    
        }
    }

    function submit(){
    var report = "THIS IS THE RECEIPT.\n"+document.getElementById("totalBill").innerHTML;//add to this by getting values
    for(i=1;i<=document.getElementById("totalPeople").value;i++){
        var name = document.getElementById("peopleName"+i).value;
        var owed = document.getElementById("peopleOwed"+i).textContent;
        report+="\n"+name+" pays "+owed.substr(2,owed.length);
    }
    
    alert(report);
    }
            
    function clearPeoplesDiv(){
    document.getElementById('peoplesDiv').innerHTML = "";
    }
            
    function is100Percent(){
        var totalPercent = Number(0);
        for (i=1;i<=document.getElementById("totalPeople").value;i++){
        totalPercent += Number(document.getElementById("peoplePercent"+i).value);
    }
    return totalPercent > 99.9 && totalPercent <= 100.1; //return totalPercent == 100;
    }
            
    function calculateAndSetEachPersonsBill(fBill){
    for (i=1;i<=document.getElementById("totalPeople").value;i++){
        var percent = Number(document.getElementById("peoplePercent"+i).value);
        var individiualBill = (percent*fBill)/100;
        document.getElementById("peopleOwed"+i).innerHTML = "=  $"+(Math.round(100*individiualBill)/100).toFixed(2);
    }
    }

        var initialPercentage;
            function getStartingValue(){
                initialPercentage= this.value;
                console.log(initialPercentage);
            }

     function updatePercentage(){
                var totalPpl = parseInt(document.getElementById("totalPeople").value);
                var diffPercentage = (initialPercentage - this.value)/(totalPpl-1);
                for (var i =1; i<=totalPpl;i++) {
                
                    if(this.id != "peoplePercent"+i){
                        document.getElementById("peoplePercent"+i).value = parseFloat(document.getElementById("peoplePercent"+i).value) + diffPercentage;

                    }
                }        
            }

    function allreset(){
                document.getElementById("bill").value = "0.00";
                document.getElementById("tip").value = "0";
                document.getElementById("totalBill").innerHTML = "Total Bill : $0.00";
                document.getElementById("calTip").innerHTML = " = $0.00";
                document.getElementById("tipCheck").checked = false;
                document.getElementById("totalPeople").value ="1";
                createPeopleElements()

            }


