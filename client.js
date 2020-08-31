// Code functions

createCode = (code, creator, libs) => {
  $.ajax({
    url: "https://padscape.herokuapp.com/code/",
    type: "post",
    data: `Code=${code}&Creator=${creator}&Libraries=${libs}`,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
  });
};

updateCode = (id, code, creator, libs) => {
  $.ajax({
    url: `https://padscape.herokuapp.com/code/${id}`,
    type: "put",
    data: `Code=${code}&Creator=${creator}&Libraries=${libs}`,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
  });
};

deleteCode = (id) => {
  $.ajax({
    url: `https://padscape.herokuapp.com/code/${id}`,
    type: "delete",
  });
};

getCode = (id) => {
  $.ajax({
    url: `https://padscape.herokuapp.com/code/${id}`,
    type: "get",
    success: (data) => {
      console.log(data);
    },
  });
};

getCode = () => {
  $.ajax({
    url: `https://padscape.herokuapp.com/code/`,
    type: "get",
    success: (data) => {
      console.log(data);
    },
  });
};

// User functions

createUser = (username, password) => {
  $.ajax({
    url: "https://padscape.herokuapp.com/user/",
    type: "post",
    data: `Username=${username}&Password=${password}`,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    success: (data) => {
      console.log(data);
    },
  });
};

loginUser = (username, password) => {
  $.ajax({
    url: "https://padscape.herokuapp.com/user/login/",
    type: "post",
    data: `Username=${username}&Password=${password}`,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    success: (data) => {
      console.log(data);
    },
  });
};

updateUser = (username, password, token) => {
  $.ajax({
    url: `https://padscape.herokuapp.com/user/`,
    type: "put",
    data: `Username=${username}&Password=${password}&Key=${token}`,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    success: (data) => {
      console.log(data);
    },
  });
};

deleteUser = (token) => {
  $.ajax({
    url: `https://padscape.herokuapp.com/user/`,
    type: "delete",
    data: `Key=${token}`,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
  });
};

getUser = (username) => {
  $.ajax({
    url: `https://padscape.herokuapp.com/user/${username}`,
    type: "get",
    success: (data) => {
      console.log(data);
    },
  });
};

getUser = () => {
  $.ajax({
    url: `https://padscape.herokuapp.com/user/`,
    type: "get",
    success: (data) => {
      console.log(data);
    },
  });
};
