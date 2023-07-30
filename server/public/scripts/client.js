$( document ).ready( onReady );

function onReady(){
    $( '#taskSubmit' ).on( 'click', addTask );
    $( '#taskList' ).on( 'click', '.removeBtn', removeTask );
    $( '#taskList' ).on( 'click', '.toggleCompleteBtn', toggleComplete );
    
    getTasks();
}

function addTask(){
    let taskInput = {
        task: $('#taskInput').val()
    };

    console.log( 'in addTask:', taskInput );
    
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskInput
    }).then( function( response ){
        console.log( 'back from POST:', response );
        $('input').val('');
        getTasks();
    }).catch( function( err ){
        alert( 'error adding task:', err );
    })
}

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function( response ){
        render(response);
    }).catch( function( err ){
        alert( 'Error getting tasks:', err );
    })
}

function render(tasksList) {
    let list = $( '#taskList' );
        list.empty();
        
        for( let i=0; i<tasksList.length; i++){
            list.append( `
                <li>
                    ${ tasksList[i].task }
                    <button class="removeBtn" data-id="${ tasksList[i].id}">Remove</button>
                    <button class="toggleCompleteBtn" 
                        data-id="${ tasksList[i].id}"
                        data-complete="${ tasksList[i].complete}">
                            Complete: ${ tasksList[i].complete }
                    </button>
                </li>`)
        }
}


function removeTask(){
    const id = $( this ).data( 'id' );
    console.log( 'in removeTask:', id );
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${ id }`
    }).then( function( response ){
        console.log( 'back from DELETE:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'Error with Delete:', err );
    })
}

function toggleComplete(){
    const id = $( this ).data( 'id' );
    const completeStatus = $( this ).data( 'complete' );
    console.log( 'in toggleComplete:', id, completeStatus );
    $.ajax({
        type: 'PUT',
        url: `/tasks/${ id }`,
        data: { newComplete: !completeStatus } 
    }).then( function( response ){
        console.log( 'back from PUT:', response );
        getTasks();
    }).catch( function (err){
        alert( 'error updating:', err );
    })
}