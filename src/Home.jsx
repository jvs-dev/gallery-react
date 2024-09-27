import { useEffect, useState } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import Header from './Header';
import Card from './Card';

const firebaseConfig = {
    apiKey: "AIzaSyCxtHiu-P3I0Sx7RhEW0Ozo1SRxo1oCe7A",
    authDomain: "simpl3-chat.firebaseapp.com",
    projectId: "simpl3-chat",
    storageBucket: "simpl3-chat.appspot.com",
    messagingSenderId: "680152036805",
    appId: "1:680152036805:web:4e2cd11039d5cf423747ac"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = () => {
    const [posts, setPosts] = useState([]);
    async function getData() {
        const querySnapshot = await getDocs(collection(db, "testPost"));
        const postsArray = [];
        querySnapshot.forEach((doc) => {
            postsArray.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsArray);
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <main>
            <Header />
            <section>
                {posts.map((post) => (
                    <Card key={post.id} data={post} />
                ))}
            </section>
        </main>
    );
}

export default Home;
