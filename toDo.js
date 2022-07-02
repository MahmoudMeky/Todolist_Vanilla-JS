//Getting Items
let taskField=document.querySelector("form input[type='text']");
let submitBtn=document.querySelector("form input[type='submit']");
let taskContainer=document.querySelector(".tasks");
let removeAll=document.querySelector("#remove-all");
taskField.focus();


//Creating Task List For Local Storage

// let TaskList=[{}];

TaskList=new Array();
let idCounter=0;

//Retriving Data from LocalStorage
if(window.localStorage.TaskList){
    
    TaskList=window.localStorage.TaskList
    idCounter=TaskList.length;

    //retriving Data from Local Storage
    TaskList=JSON.parse(TaskList)
    for(let i=0;i<TaskList.length;i++){
        //Creating New Task  DIV  
        let newTask= createElement("div",TaskList[i].title,"task");
        newTask.setAttribute("Data-id",TaskList[i].id)
        //Appending the Task
        taskContainer.append(newTask);

        //Remove Button
        let removeBtn= createElement("button","X");
        newTask.append(removeBtn);

          //Add Event to Remove Task
            removeBtn.addEventListener("click",function(){
            //Converting String to Array of Objects            
            localTaskList=JSON.parse(window.localStorage.TaskList);

            //Removing Item from Local Storage
            let taskIndex=localTaskList.map((el)=>el.id).indexOf(Number(this.parentNode.dataset.id));

            localTaskList.splice(taskIndex,1);

            //Removing item from HTML
            this.parentNode.remove();
            //Updating Array to Local Storage
            localTaskList=JSON.stringify(localTaskList);
            window.localStorage.setItem("TaskList",localTaskList);


            // //Hide Container if there's no Tasks
            displayNone(taskContainer);
        })
        
    }

}

let Flag2=0;
submitBtn.onclick=function(event){
    //Prevent Submiting
    event.preventDefault();


    
    if(taskField.value.trim()!==""){

    //ID Increment
    idCounter++;
    
    //Creating new Element
    let newTask= createElement("div",taskField.value,"task");
        newTask.setAttribute("Data-id",idCounter)
        taskContainer.append(newTask);

    //Adding to TaskListArray

    TaskList.push({"id":idCounter,"title":taskField.value});

    //Adding Array to Local Storage
    localTaskList=JSON.stringify(TaskList);
    window.localStorage.setItem("TaskList",localTaskList);
    //Changing Lanuage of the task
    ChangeLang(window.localStorage.Lang);

    //Remove Button
    let removeBtn= createElement("button","X");

        newTask.append(removeBtn);

        //Add Event to Remove Task
        removeBtn.addEventListener("click",function(){
            //Converting String to Array of Objects            
            localTaskList=JSON.parse(window.localStorage.TaskList);

            
            let taskIndex=localTaskList.map((el)=>el.id).indexOf(Number(this.parentNode.dataset.id));

            localTaskList.splice(taskIndex,1);

            //Removing item from HTML
            this.parentNode.remove();
            //Updating Array to Local Storage
            localTaskList=JSON.stringify(localTaskList);
            window.localStorage.setItem("TaskList",localTaskList);

            // //Hide Container if there's no Tasks
            displayNone(taskContainer);

        })
    }
    else{
        
        if(Flag2==0){
        let Container=document.querySelector(".container");

        let popup=document.createElement("div");
        let btn1=document.createElement("button");


        if(window.localStorage.Lang=="EN"){
            popup.innerHTML="Please type something";
            }else{
                popup.innerHTML="اكتب شيئاً";
        }


        popup.style.cssText="background:#eee;max-width:100%;display:flex;justify-content:center;font-size:25px;padding:10px 20px;border-radius:10px;align-items:center;gap:5px;flex-direction:column;border:2px solid green;position:absolute;top:270px;text-align:center;transition:30s";
        btn1.innerHTML="OK!";
        btn1.style.cssText="background:green;color:white;padding:5px 20px;outline:none;border:none;cursor:pointer;font-size:20px;border-radius:6px";
        popup.append(btn1);
        Container.append(popup);
        

        Flag2=1;
        


        btn1.onclick=function(){
        popup.remove();
        Flag2=0;
        taskField.focus();
        
        }


        setTimeout(function(){
            popup.remove();
            Flag2=0;
            taskField.focus();
        },1500)
}
    };
    //Clearing Input Data after entering
    taskField.value="";
    taskField.focus();
    //Hide Container if there's no Tasks
    displayNone(taskContainer);









};



//Function Creating New Element
function createElement(tagName,text,cls){
        
    



    let newTask=document.createElement(tagName);
        newTask.classList.add(cls);
        newTask.innerHTML=text;
        return newTask



};


//function to Hide Container 
function displayNone(element){
    if(element.children.length==0){
        element.style.display="none";
    }else{
        element.style.display="flex";
    }
};
displayNone(taskContainer);



//Remove all function
let FLAG=0;
removeAll.onclick=function(e){
    e.preventDefault();
    if(FLAG==0){
        let Container=document.querySelector(".container");

        let popup=document.createElement("div");
        let btn1=document.createElement("button");
        let btn2=document.createElement("button");
        let Buttons=document.createElement("div");
        
        if(window.localStorage.Lang=="EN"){
        popup.innerHTML="Are you sure to Remove All Tasks?";
        btn1.innerHTML="Delete";
        btn2.innerHTML="Cancel";
        }else{
        popup.innerHTML="هل أنت متأكد من حذف كل المهام؟";
        btn1.innerHTML="حذف";
        btn2.innerHTML="إلغاء";
        }

        popup.style.cssText="background:#eee;max-width:100%;display:flex;justify-content:center;font-size:20px;padding:20px;border-radius:10px;align-items:center;gap:5px;flex-direction:column;border:2px solid #b11d1d;position:absolute;top:270px;text-align:center;transition:30s";
        btn1.style.cssText="background:#b11d1d;color:white;padding:4px 30px;outline:none;border:none;cursor:pointer;font-size:20px;border-radius:6px;margin-top:5px";
        btn2.style.cssText="background:green;color:white;padding:4px 30px;outline:none;border:none;cursor:pointer;font-size:20px;border-radius:6px;margin-top:5px";
        Buttons.style.cssText="display:flex;gap:30px"
        Buttons.append(btn1,btn2);
        popup.append(Buttons);
        Container.append(popup);
        


        btn1.onclick=function(){
        window.localStorage.removeItem("TaskList");
        // window.location.reload();
        taskContainer.innerHTML="";
        displayNone(taskContainer);
        popup.remove();
        anyPopUp(".container","Done!!",350);
        FLAG=0;
        }

        btn2.onclick=function(){
        popup.remove();
        FLAG=0;
        }
        
        setTimeout(function(){
            popup.remove();
            FLAG=0;
            taskField.focus();
        },3000)



        FLAG=1;
    }
};





//Setting COlor Changer
let options=document.querySelector("#customize");
let colorsContainer=document.querySelector("#colorChanger");
let colors=document.querySelectorAll("#colorChanger li");

options.onclick=function(){
    if(    colorsContainer.style.display=="flex"  ){
    colorsContainer.style.display="none";}
    else{
        colorsContainer.style.display="flex";

    }
    
for(let i =0;i<colors.length;i++){
    colors[i].style.backgroundColor=colors[i].getAttribute("value");
    colors[i].addEventListener("click",function(){
        document.styleSheets[0].cssRules[0].style.cssText=`--mainColor: ${colors[i].getAttribute("value")};`
        window.localStorage.setItem("color",colors[i].getAttribute("value"))
    })
};
}

//Retriving Color from Local Storage
if(window.localStorage.color){
document.styleSheets[0].cssRules[0].style.cssText=`--mainColor: ${window.localStorage.color};`}



//Welcome Screen
if(!window.localStorage.userName){

popUpName()

}else{
taskField.placeholder=`Welcome, ${window.localStorage.userName}. Add Task!`;
};

//Edit Name

let editName=document.querySelector("#colorChanger span");

editName.onclick=function(){
    popUpName()
};


function popUpName(){
    let Container=document.querySelector(".container");
    let popup=document.createElement("div");
    let userName=document.createElement("input");
    let btn1=document.createElement("button");
    let error=document.createElement("h4");


    if(window.localStorage.Lang=="EN"){
        popup.innerHTML="Hello ! Please Enter your name";
        btn1.innerHTML="Ok";
        error.innerHTML="Sorry,Name Can't be empty!"
        }else{
        popup.innerHTML="مرحباً ! من فضلك أدخل اسمك";
        btn1.innerHTML="تأكيد";
        error.innerHTML="يرجى ادخال اسمك"
    }

    popup.style.cssText="background:#eee;max-width:100%;display:flex;justify-content:center;font-size:20px;padding:20px;border-radius:10px;align-items:center;gap:5px;flex-direction:column;border:2px solid #b11d1d;position:absolute;top:270px;text-align:center;transition:30s";
    btn1.style.cssText="background:#b11d1d;color:white;padding:4px 30px;outline:none;border:none;cursor:pointer;font-size:20px;border-radius:6px;margin-top:5px";
    userName.style.cssText="border:none;outline:none;width:100%;font-size:24px;padding-left:20px;text-align:center;"
    error.style.cssText="color:red;display:none"
    
    popup.append(userName);
    popup.append(error);
    popup.append(btn1);
    Container.append(popup);
    
    btn1.onclick=function(){
        
    if(userName.value.trim()!==""){

    window.localStorage.setItem("userName",userName.value.split(" ")[0])

    popup.remove();

    if(window.localStorage.Lang=="EN"){
        taskField.placeholder=`Welcome, ${userName.value.split(" ")[0]}. Add Task!`;
    }else{
        taskField.placeholder=`مرحباً  ${userName.value.split(" ")[0]}. أضف مهمة!`;
    }

    }else{
        error.style.display="block"
    }
    }

}



//anyColor
let colorWrap=document.querySelector("#colorChanger div input");

colorWrap.oninput=function(){
    colorWrap.parentElement.style.background=colorWrap.value;
    document.styleSheets[0].cssRules[0].style.cssText=`--mainColor: ${colorWrap.value};`
        window.localStorage.setItem("color",colorWrap.value);
}




//Languages

let langBtn=document.querySelector("#languages");

langBtn.onclick=function(e){
    e.preventDefault();
    console.log(window.localStorage.Lang==="EN");
    //It's Arabic
    if(window.localStorage.Lang=="EN"){ //Means IT's English
        ChangeLang("AR");
        //Adding Language to Local Storage
        window.localStorage.setItem("Lang","AR");
        langBtn.innerHTML="EN";
    }
    else{
        ChangeLang("EN");
        //Adding Language to Local Storage
        window.localStorage.setItem("Lang","EN");
        langBtn.innerHTML="AR";
    };
    

}

function ChangeLang(Language){
    let title=document.querySelector(".container h3");
    let allTasks=document.querySelectorAll(".tasks .task");
    
    if(Language=="AR"){
        title.innerHTML="قائمة المهام";
        removeAll.innerHTML="حذف الكل";
        submitBtn.value="إضافة";
        taskField.style.direction="rtl";
        taskField.style.order="1";
        langBtn.style.order="-1";

        if(window.localStorage.userName){
            taskField.placeholder=`مرحباً  ${window.localStorage.userName}. أضف مهمة!`;
        }
        else{
            taskField.placeholder=`مرحباً. أضف مهمة!`;
        }


        //looping through Tasks
        for(let i=0;i<allTasks.length;i++){
            allTasks[i].style.direction="rtl";
        }
        //Changing Before Task CSS
        document.styleSheets[0].addRule('.task:before', 'right: 0;');
        document.styleSheets[0].addRule('.task', 'padding-left: 0;');
        document.styleSheets[0].addRule('.task', 'padding-right: 45px;');
        document.styleSheets[0].addRule('.tasks button', 'margin-left:0;');
        document.styleSheets[0].addRule('form input[type="submit"]', 'order:1!important;');

        langBtn.innerHTML="EN";
    }

    else{
        title.innerHTML="To Do List";
        removeAll.innerHTML="Delete All";
        submitBtn.value="Add Task";
        taskField.style.direction="ltr";
        taskField.style.order="-1";
        taskField.placeholder=`Welcome, ${window.localStorage.userName}. Add Task!`;
        langBtn.style.order="1";

        if(window.localStorage.userName){
            taskField.placeholder=`Welcome, ${window.localStorage.userName}. Add Task!`;        }
        else{
            taskField.placeholder=`Welcome, Add Task!`;        }




        //looping through Tasks
        for(let i=0;i<allTasks.length;i++){
            allTasks[i].style.direction="ltr";
        }
        //Changing Before Task CSS
        document.styleSheets[0].addRule('.task:before', 'right: unset;');
        document.styleSheets[0].addRule('.task', 'padding-left:45px;');
        document.styleSheets[0].addRule('.task', 'padding-right: unset;');
        document.styleSheets[0].addRule('.tasks button', 'margin-left:unset;');
        document.styleSheets[0].addRule('form input[type="submit"]', 'order:unset!important;');
        langBtn.innerHTML="AR";
    }

};

ChangeLang(window.localStorage.Lang);














//Check if Done!
function checkDone(){
    let allTasks=document.querySelectorAll(".tasks .task");
    for(let i =0;i<allTasks.length;i++){
        allTasks[i].onclick=function(){
            
            let LocalStorageList=window.localStorage.TaskList;
            console.log(LocalStorageList);
            LocalStorageList=JSON.parse(LocalStorageList);
            console.log(this.dataset.id)
            
            let taskIndex=LocalStorageList.map((el)=>el.id).indexOf(Number(this.dataset.id));
            
            LocalStorageList[taskIndex].checked=true;

            LocalStorageList=JSON.stringify(LocalStorageList);

            window.localStorage.setItem("TaskList",LocalStorageList)


            if(this.style.background=="red"){
                this.style.background="white";
                this.style.color="black";

                // window.localStorage.TaskList[taskIndex].Checked=1;
            }else{
                this.style.background="red";
                this.style.color="white";
            }
        }
}
};












function anyPopUp(parentDiv,Msg="Default MSG",elapseTime){
    let Container=document.querySelector(parentDiv);
    let popup=document.createElement("div");


    popup.innerHTML=Msg;


    popup.style.cssText="background:var(--mainColor);color:white;max-width:100%;display:flex;justify-content:center;font-size:20px;padding:20px;border-radius:15px 0 ;align-items:center;gap:5px;flex-direction:column;position:absolute;top:50%;left:50%;text-align:center;transition:30s;transform:translate(-50%,-50%);padding:15px 60px;";


    
    Container.append(popup);
    
    setTimeout(function(){
        popup.remove()
    },elapseTime)
};
