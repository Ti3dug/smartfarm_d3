const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


const firebaseConfig = {
  apiKey: "AIzaSyBgG9M6LrqzQEngs0Xt6A5QDg5LS-UzN2A",
  authDomain: "project1-ee980.firebaseapp.com",
  databaseURL: "https://project1-ee980-default-rtdb.firebaseio.com",
  projectId: "project1-ee980",
  storageBucket: "project1-ee980.appspot.com",
  messagingSenderId: "653115137440",
  appId: "1:653115137440:web:d3b57f6f10ccf4c2bfd8c5"
};
  
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  
  // Đăng ký
  const signUpForm = document.getElementById('signup-form');
  signUpForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const adcode = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    firebase.database().ref("/Adcode").on("value", function(snapshot) {
        var curtain = snapshot.val();
    if (adcode == curtain) {
        // Nếu adcode hợp lệ, thêm người dùng vào Firebase
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up:", user);
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Error signing up:", error);
            });
    } else {
        // Nếu adcode không hợp lệ, thông báo lỗi
        console.error("Invalid adcode");
        document.getElementById('error_signup').style.display = 'block'
    }
  });
  });

  // Đăng nhập
  const signInForm = document.getElementById('signin-form');
  signInForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        window.location.href = "main/index.html";
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        document.getElementById('error_signin').style.display = 'block'
      });
  });
  