let taskList = new Array();

let input = ()=>{
    let newTask = $("form input").val();
    if(newTask!=''){
        $("form input").val('');
        let username = window.location.href.slice('http://127.0.0.1:3000/'.length)
        console.log(username)
        $.post(`http://127.0.0.1:3000/${username}/addTask`,
                {
                    username: username,
                    task: newTask
                },
                (data,status)=>{
                    if(data.save){
                        getTaskList();
                    }
                }
        )
    }
    return false            // the prevent the form from refreshing
}

let getTaskList = ()=>{
    let username = window.location.href.slice('http://127.0.0.1:3000/'.length)
    $.get(`http://127.0.0.1:3000/${username}/tasksList`, (data, status) => {
        console.log(data);
        taskList = data.taskList;

        $('.taskList ul').empty();

        taskList.forEach((task,index)=>{
            console.log(task.task)
            taskElement = `<li><span class="list-group-item" id=d${task._id}>${task.task}</span><button id=i${task._id}>Delete</button></li>`;
            $('.taskList ul').append(taskElement)
            console.log(task._id)
            $(`#i${task._id}`).click(()=>{
                $.ajax({
                    url: `http://127.0.0.1:3000/delete/${task._id}`,
                    type: 'DELETE',
                    success: (result)=>{
                        if(result.delete){
                            getTaskList();
                        }else{
                            alert('cant delete the task');
                        }
                    }
                })
            })

            $(`#d${task._id}`).click(()=>{
                window.location.href = `http://127.0.0.1:3000/details/${task._id}`
            })
        })
    })
}


$(document).ready(getTaskList)