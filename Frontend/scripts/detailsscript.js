let id = window.location.href.slice(-24)

let showDetails = ()=>{
    $.ajax({
        url: `http://127.0.0.1:3000/data/${id}`,
        type: "GET",
        success: (data)=>{
            if(data.details){
                console.log('data found\n',data);
                $('#form').toggle();
                $('#addDetails button').text('Edit details')
                $('#details').val(data.details)
                $('#detailstext').text(data.details)
            }else{
                console.log('no data found');
                $('#addDetails button').text('Add details')
                $('#details').val('')
                $('#detailstext').text('')
            }
        }
    })
}

let showTextBox = ()=>{
    $('#form').toggle();
}


let addDetails = ()=>{
    let data = $('#details').val();
    $('#details').val('')
    $.ajax({
        url: `http://127.0.0.1:3000/update/${id}`,
        type: "PUT",
        data: {'details': data},
        success: (data, status)=>{
            if(data){
                console.log(data)
                showDetails();
            }else{
                console.log('cant find the data')
            }
        }
    })
    return false
}

showDetails();