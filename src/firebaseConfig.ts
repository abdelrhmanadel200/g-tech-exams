import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCQS6JCM2kaUjFtATMN19v4qJX7lA7lFdE",
    authDomain: "gammal-tech-exam-202a4.firebaseapp.com",
    projectId: "gammal-tech-exam-202a4",
    storageBucket: "gammal-tech-exam-202a4.appspot.com",
    messagingSenderId: "784554865261",
    appId: "1:784554865261:web:709d08e0fb7d8558c8c564",
    measurementId: "G-WX3343LNW7"
};

const app = initializeApp(firebaseConfig);

export default app;