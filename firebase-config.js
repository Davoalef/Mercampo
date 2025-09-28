const firebaseConfig = {
  apiKey: "AIzaSyC6W0sgtxZ1yhW4hSkKC2ANx3i7Ompjf5g",
  authDomain: "mercampo-11413.firebaseapp.com",
  projectId: "mercampo-11413",
  storageBucket: "mercampo-11413.appspot.com",
  messagingSenderId: "877456708984",
  appId: "1:877456708984:web:06c37207747c92be65248d"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Definir variables globales
const auth = firebase.auth();
const db = firebase.firestore();
