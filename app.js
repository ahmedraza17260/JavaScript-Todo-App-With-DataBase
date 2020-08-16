var list = document.getElementById("list");

// console.log(firebase)

firebase.database().ref('todos').on('child_added', function (data) {
    // console.log(data.val())

    // create li tag with text node

    var li = document.createElement('li');
    var liText = document.createTextNode(data.val().value);
    // if (todo_item.value == "") {
    //     alert("Name must be filled out");
    //     return false;
    // } else {
    // li.setAttribute("class", "input");
    li.appendChild(liText);
    // }

    // create delete button

    var delBtn = document.createElement("button")
    var delText = document.createTextNode("DELETE");
    delBtn.setAttribute("class", "delBtn");
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "deleteItems(this)");
    delBtn.appendChild(delText);

    // create edit button
    var editBtn = document.createElement("button")
    var editText = document.createTextNode("EDIT");
    editBtn.setAttribute("class", "addBtn");
    editBtn.setAttribute("id", data.val().key);
    editBtn.setAttribute("onclick", "editItems(this)");
    editBtn.appendChild(editText);


    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);

})

function addTodo() {
    var todo_item = document.getElementById("todo-item");

    var database = firebase.database().ref('todos')
    var key = database.push().key;

    var todo = {
        value: todo_item.value,
        key: key
    }
    database.child(key).set(todo);

    todo_item.value = "";
}

function deleteItems(e) {
    console.log(e.id);
    firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();
}

function editItems(e) {
    var val = (e.parentNode.firstChild.nodeValue);
    var editValue = window.prompt("Enter Edit Value", val)
    var editTodo = {
        value: val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = editValue;
}

function delAllTodo() {
    firebase.database().ref('todos').remove()
    list.innerHTML = "";
}