//LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyC5WdQSn0f_up-pCkQdDhvHW4Ga0VI4Wh8",
  authDomain: "twiter-69db3.firebaseapp.com",
  databaseURL: "https://twiter-69db3-default-rtdb.firebaseio.com",
  projectId: "twiter-69db3",
  storageBucket: "twiter-69db3.appspot.com",
  messagingSenderId: "16329501552",
  appId: "1:16329501552:web:85c3065f3b2c0d6074bdb5"
};
firebase.initializeApp(firebaseConfig);
userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");
function send() {
  msg = document.getElementById('msg').value;
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0
  });
  document.getElementById('msg').value = "";
}
function getData() {
  firebase.database().ref("/" + roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebaseMessageId = childKey;
        messageData = childData;

        name = messageData['name'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = nameWithTag + messageWithTag + like_button + spanWithTag;
        document.getElementById("output").innerHTML += row;
      }
    });
  });
}
function updateLike (ASL){
button=ASL;
likes=document.getElementById(button).value;
update=Number(likes)+1;
firebase.database().ref(roomName).child(ASL).update({
  like:update});
  
}
getData();
function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
