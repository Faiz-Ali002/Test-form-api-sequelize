$(document).ready(function () {
  console.log("ready!");

  $.get("http://localhost:8000/users", function (data, status) {
    console.log(data);
  });
});

let identity = null;
let u_id = null;
let up_id = null;
function logout() {
  localStorage.removeItem(1);
  var element1 = document.getElementById("login-form");
  element1.classList.remove("delt");
  element1.classList.add("show");
  var element1 = document.getElementById("tabledata");
  element1.classList.remove("show");
  element1.classList.add("delt");
}
function showtable() {
  var output = document.getElementById("output");
  $.get("http://localhost:8000/users", function (data, status) {
    console.log("data---", data);
    let iterative_html = "";
    for (let i = 0; i < data.length; i++) {
      let id = data[i].id;
      let fname = data[i].first_name;
      let lname = data[i].last_name;
      let email = data[i].email;

      let gender = data[i].gender;
      let dob = data[i].dob;
      let phoneno = data[i].phoneno;
      let carCount = data[i].Cars.length;
      iterative_html += `
      <tr>
        <td>${id}</td>
        <td>${fname}</td>
        <td>${lname}</td>
        <td>${email}</td>
        <td>${gender}</td>
        <td>${phoneno}</td>
        <td>${carCount}</td>
        <td><button type="button"id="del" class="btn btn-outline-danger"  onClick="del('${id}')">Delete</button>
          <button type="button"id="del" class="btn btn-outline-success"  onClick="edit('${id}', '${fname}','${lname}','${email}', '${gender}','${phoneno}')">Edit</button>
          <button type="button"id="del" class="btn btn-outline-primary"  onClick="addCar('${id}','${fname}')">AddCar</button>
          <button type="button"id="del" class="btn btn-outline-success"  onClick="showCar('${id}')">Cars</button>
          </td>
        
      </tr>`;
    }

    let htm = `
    <table class="main">
        <tbody>
            <tr>
             <th>ID</th><th>First Name</th> <th>Last Name</th> <th> Email Address</th> <th> Gender </th> <th> Phone No </th><th>Cars</th><th>Action</th>
            </tr>
            ${iterative_html}
        </tbody>
    </table>`;
    output.innerHTML = htm;
  });
}
function showCar(id) {
  var output = document.getElementById("output");
  $.get(`http://localhost:8000/users/${id}/cars`, function (data, status) {
    let iterative_html = "";
    for (let i = 0; i < data.length; i++) {
      let id = data[i].id;
      let carName = data[i].carName;
      let model = data[i].model;
      let color = data[i].color;

      let userId = data[i].userId;

      iterative_html += `
      <tr>
        <td>${id}</td>
        <td>${carName}</td>
        <td>${model}</td>
        <td>${color}</td>
        <td>${userId}</td>
       
        <td><button type="button"id="del" class="btn btn-outline-danger"  onClick="delCar('${id}','${userId}')">Delete</button>
          <button type="button"id="del" class="btn btn-outline-success"  onClick="updCar('${id}','${userId}','${carName}','${model}','${color}')">Edit</button>
          <button type="button"id="del" class="btn btn-outline-primary"  onClick="showtable()">Cancle</button>
         
          </td>
        
      </tr>`;
    }

    let htm = `
    <table class="main">
        <tbody>
            <tr>
             <th>ID</th><th>Car Name</th> <th>Model</th> <th> Color</th> <th> UserId </th> <th>Action</th>
            </tr>
            ${iterative_html}
        </tbody>
    </table>`;
    output.innerHTML = htm;
  });
}

function delCar(id, userId) {
  $.ajax({
    url: `http://localhost:8000/users/${userId}/cars/${id}`,
    type: "DELETE",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    // headers: { "Content-Type": "application/json" },
    success: function (resp, status) {
      alert(`ID ${id} is DELETED successfully !`);
    },

    error: function (error) {
      alert("ID is not found !");
    },
  });
  showCar(userId);
}
function addCar(id, fname) {
  u_id = id;
  document.getElementById("cfname").value = fname;
  var element2 = document.getElementById("tabledata");
  element2.classList.remove("col-md-12");
  element2.classList.add("col-md-7");

  var element3 = document.getElementById("car-form");
  element3.classList.remove("delt");
  element3.classList.add("col-md-5");
  element3.classList.add("show");
}

function updCar(id, userId, carName, model, color) {
  u_id = id;
  up_id = userId;
  document.getElementById("cfname").value = userId;
  document.getElementById("carName").value = carName;
  document.getElementById("model").value = model;
  document.getElementById("color").value = color;
  var element2 = document.getElementById("tabledata");
  element2.classList.remove("col-md-12");
  element2.classList.add("col-md-7");

  var element3 = document.getElementById("car-form");
  element3.classList.remove("delt");
  element3.classList.add("col-md-5");
  element3.classList.add("show");
}

function updateCar() {
  let req = {
    carName: document.getElementById("carName").value,
    model: document.getElementById("model").value,
    color: document.getElementById("color").value,
  };
  $.ajax({
    url: `http://localhost:8000/users/${up_id}/cars/${u_id}`,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(req),
    // headers: { "Content-Type": "application/json" },
    success: function (resp, status) {
      alert(`Data is UPDATED successfully !`);
      nulldata1();

      cancelCar();
      showCar();
    },

    error: function (error) {
      alert("Not Updated !");
    },
  });
  showCar(up_id);
  u_id = null;
  up_id = null;
}

function addCar1() {
  let id = u_id;
  var token = localStorage.getItem(1);
  let req = {
    carName: document.getElementById("carName").value,
    model: document.getElementById("model").value,
    color: document.getElementById("color").value,
  };
  $.ajax({
    url: `http://localhost:8000/users/${id}/cars`,
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(req),
    headers: { Authorization: token },
    success: function (resp, status) {
      alert(`New CAR is ADDED successfully !`);
      nulldata1();
      cancelCar();
      showtable();
      token = null;
    },

    error: function (error) {
      alert("CAR is not ADDED !");
    },
  });
  u_id = null;
}

function nulldata1() {
  document.getElementById("carName").value = null;
  document.getElementById("model").value = null;
  document.getElementById("color").value = null;
}

function del(key) {
  let id = key;
  console.log(id);
  var token = localStorage.getItem(1);
  console.log(token);
  $.ajax({
    url: `http://localhost:8000/users/${id}`,
    type: "DELETE",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    headers: { Authorization: token },
    success: function (resp, status) {
      alert(`ID ${id} is DELETED successfully !`);
      token = null;
    },

    error: function (error) {
      alert("ID is not found !");
    },
  });
  showtable();
}

function inputData() {
  if (identity != null) {
    console.log(identity);
    let req = {
      // id= identity,
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      phoneno: document.getElementById("phoneno").value,
    };
    var token = localStorage.getItem(1);
    $.ajax({
      url: `http://localhost:8000/users/${identity}`,
      type: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(req),
      headers: { Authorization: token },
      success: function (resp, status) {
        alert(`Data is UPDATED successfully !`);
        token = null;
        showtable();

        nulldata();
        cancel();
      },

      error: function (error) {
        alert("Email is already exist !");
      },
    });
    identity = null;
    // cancel();
  }
  // console.log(event);
  else {
    let req = {
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      phoneno: document.getElementById("phoneno").value,
    };
    if (req.fname != "" && req.lname != "" && req.email != "") {
      var token = localStorage.getItem(1);
      console.log(token);
      $.ajax({
        url: `http://localhost:8000/users`,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(req),
        headers: { Authorization: token },
        success: function (resp, status) {
          alert(`New data is ADDED successfully !`);
          showtable();
          token = null;
          nulldata();
          cancel();
        },

        error: function (error) {
          alert("Email is already exist !");
        },
      });
    } else {
      alert("Fields are Empty !");
    }
  }
}

function edit(id, fname, lname, email, gender, dob, phoneno) {
  show();

  identity = id;
  document.getElementById("fname").value = fname;
  document.getElementById("lname").value = lname;
  document.getElementById("email").value = email;
  document.getElementById("gender").value = gender;
  document.getElementById("dob").value = dob;
  document.getElementById("phoneno").value = phoneno;
}
function nulldata() {
  document.getElementById("fname").value = null;
  document.getElementById("lname").value = null;
  document.getElementById("email").value = null;
  document.getElementById("gender").value = null;
  document.getElementById("dob").value = null;
  document.getElementById("phoneno").value = null;
}
function cancelCar() {
  var element = document.getElementById("tabledata");
  element.classList.add("col-md-12");

  var element1 = document.getElementById("car-form");
  element1.classList.remove("col-md-5");
  element1.classList.remove("show");
  element1.classList.add("delt");
}
function show() {
  var element2 = document.getElementById("tabledata");
  element2.classList.remove("col-md-12");
  element2.classList.add("col-md-7");

  var element = document.getElementById("formtable");
  element.classList.remove("delt");
  element.classList.add("col-md-5");
  element.classList.add("show");
}
function cancel() {
  // var element2 = document.getElementById("tabledata");
  // element2.classList.remove("col-md-7");

  var element = document.getElementById("tabledata");
  element.classList.add("col-md-12");
  var element1 = document.getElementById("formtable");
  element1.classList.remove("col-md-5");
  element1.classList.remove("show");
  element1.classList.add("delt");
}

function login1() {
  let req = {
    username: document.getElementById("login").value,
    email: document.getElementById("loginemail").value,
  };
  $.ajax({
    url: "http://localhost:8000/login",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(req),
    // headers: { "Content-Type": "application/json" },
    success: function (resp, status) {
      alert(`LogIn successfully !`);
      console.log(resp.token);
      let key = resp.token;
      localStorage.setItem(1, key);
      var element1 = document.getElementById("login-form");
      element1.classList.remove("show");
      element1.classList.add("delt");
      var element1 = document.getElementById("tabledata");
      element1.classList.remove("delt");
      element1.classList.add("show");
      showtable();
    },

    error: function (error) {
      alert("unable to LogIn !");
    },
  });
}
