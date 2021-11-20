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
    
//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!!";

function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose : "adding room name"
      });
      localStorage.setItem("room_name", room_name);

      window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirect(this.id)'>#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirect(name){
console.log(name);
localStorage.setItem("room_name", name);
window.location = "kwitter_page.html";
}
 function logout(){
       localStorage.removeItem("user_name");
       localStorage.removeItem("room_name");
       window.location="index.html";
 }
 