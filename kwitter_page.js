var firebaseConfig = {
    apiKey: "AIzaSyDKGrZy64Gb3l1Jqb4F1UlmhS42m-xRzQs",
    authDomain: "kwitter-final-61e15.firebaseapp.com",
    databaseURL: "https://kwitter-final-61e15-default-rtdb.firebaseio.com",
    projectId: "kwitter-final-61e15",
    storageBucket: "kwitter-final-61e15.appspot.com",
    messagingSenderId: "1092904896595",
    appId: "1:1092904896595:web:52067d75ad9821f3441ea6"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0
    });
    document.getElementById("msg").value = "";
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
Name = message_data["name"];
message = message_data["message"];
like = message_data["like"];
name_with_tag = "<h4> " + Name + "<img src='tick.png' class='user_tick'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> like: " + like + "</span></button><hr>";
row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
 } });  }); }
getData();

function updateLike(message_id){
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    Likes = document.getElementById(button_id).value;
    update_Likes = Number(Likes) + 1;
    console.log(update_Likes);
    firebase.database().ref(room_name).child(message_id).update({
        like : update_Likes
    });
}