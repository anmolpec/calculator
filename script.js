let btns=document.querySelectorAll("button");
[...btns].forEach(btn=>{
    btn.addEventListener("click", (x)=>{
        let inputChar=x.target;
        let currentExp=document.querySelector("#expression");
        checkInput(inputChar, currentExp);
    });
});


function checkInput(char, string){
    if(char.parentNode.classList.contains("digits")){
        checkForDigits(char, string);
    }
    else if(char.parentNode.classList.contains("operators")){
        checkForOperators(char, string);
    }
    else if(char.parentNode.classList.contains("clearBtns")){
        checkForClear(char, string);
    }
}

function checkForDigits(digit, string){
    let exp=string;
    if(digit.id=="."){
        let temp=exp.textContent;
        for(let i=temp.length;i>=0;i--){
            if(temp[i]=="."){
                break;
            }
            else if(["+","-","X","/","%"].includes(temp[i])||i==0){
                exp.textContent+='.';
                break;
            }
        }
    }     
    else if(digit.id=="del"){
        exp.textContent=exp.textContent.slice(0,exp.textContent.length-1);
    }
    else{
        exp.textContent=exp.textContent+digit.id;
    }
}

function checkForOperators(operator, string){
    let temp=string.textContent
    if(temp.length==0||["+","-","x","/","%","."].includes(temp[temp.length-1])){
        if(operator.id=="sub"){
            if(["+","-","x","/","%","."].includes(temp[temp.length-2])){
                string=string;
            }
            else if(temp[temp.length-1]=="."){
                string=string;
            }
            else{
                string.textContent=string.textContent+"-";
            }
        }
    }
    else{
        if(operator.id=="equal"){
            evaluate(temp);
            return;
        }
        let symbol=symbolVal(operator);
        string.textContent=string.textContent+symbol;
    }
}

function symbolVal(x){
    switch(x.id){
        case "add":return "+";
        case "sub":return "-";
        case "prod":return "x";
        case "div":return "/";
        case "mod":return "%";
        default:console.log("error");
    }
}

function evaluate(string){
    //console.log(string);
    let temp=string;
    let numArray=temp.split("+").join(",").split("-").join(",").split("/").join(",").split("x").join(",").split("%").join(",").split(",");
    //console.table(numArray);
    for(let i=1;i<numArray.length;i++){
        if(numArray[i]==""){
            numArray.splice(i,1);
            i--;
        }
    }
    let opArray=[];
    opArray=[...string].filter((char)=>{
        if(["+","-","x","/","%"].includes(char)){
            return char;
        }
    });
    //console.table(opArray);
    let finalArray=[];
    for( opi=0, numi=0;string.length>0;){
        if(numi<numArray.length && string.indexOf(numArray[numi])==0){
            finalArray.push(numArray[numi]);
            string=string.substr(numArray[numi].length);
            numi++;
        }
        else if(opi<opArray.length && string.indexOf(opArray[opi])==0){
            finalArray.push(opArray[opi]);
            string=string.substr(opArray[opi].length);
            opi++;
        }
        //console.log(string);
    }
    if(finalArray[0]=="")finalArray[0]="0";
    //console.table(finalArray);
    let num=[];
    let op=[];
    let ans;
    do{
        //console.table(finalArray);
        //console.table(num);
        //console.table(op);

        if(finalArray.length>0){
            if(opArray.includes(finalArray[0])){
                if(finalArray[1]=="-"){
                    finalArray[2]="-"+finalArray[2];
                    finalArray[1]=finalArray[0];
                    //console.log(finalArray[1]);
                    //console.table(finalArray);
                    finalArray.shift();
                    //console.log(finalArray[0]);
                    //console.table(finalArray);
                    //console.log(Number(finalArray[1]));
                }
                if(["x","/","%"].includes(finalArray[0])){
                    let a=num.pop();
                    let b=finalArray[1];
                    let c;
                    switch(finalArray[0]){
                        case "x":c=prod(Number(a),Number(b));break;
                        case "/":c=div(Number(a),Number(b));break;
                        case "%":c=mod(Number(a),Number(b));break;
                    }
                    num.push(c);
                    finalArray.shift();
                    finalArray.shift();
                }
                else{
                    op.push(finalArray[0]);
                    finalArray.shift(); 
                }
            }
            else{
                num.push(finalArray[0]);
                finalArray.shift();
            }
        }
        else{
            num.reverse();
            op.reverse();
            while(num.length>1){
                //console.table(num);
                let a=num.pop();
                let b=num.pop();
                //console.table(op);
                let operator=op.pop();
                let c;
                //console.log(a,Number(b),operator);
                switch(operator){
                    case "+":c=add(Number(a),Number(b));break;
                    case "-":c=sub(Number(a),Number(b));break;    
                }
                num.push(c);
            }
            ans=num.pop();
        }
        //console.table( op);
    }while(num.length>0);
    //console.log(ans);
    document.querySelector("#previous").textContent=ans;
}

function checkForClear(btn, string){
    if(btn.id=="clear"){
        string.textContent="";
    }
    else if(btn.id=="allClear"){
        string.textContent="";
        document.querySelector("#previous").textContent="ANS";
    }
}

function add(a,b){
    return a+b;
}
function sub(a,b){
    //console.log(a,b);
    return a-b;
}
function prod(a,b){
    return a*b;
}
function div(a,b){
    if(b!=0){
        return a/b;
    }
    else{
        alert("Division by 0 is not allowed");
    }
}
function mod(a,b){
    return a%b;
}