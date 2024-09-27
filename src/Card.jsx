import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import React, { useEffect, useState } from 'react';
import './Card.css';

const firebaseConfig = {
    apiKey: "AIzaSyCxtHiu-P3I0Sx7RhEW0Ozo1SRxo1oCe7A",
    authDomain: "simpl3-chat.firebaseapp.com",
    projectId: "simpl3-chat",
    storageBucket: "simpl3-chat.appspot.com",
    messagingSenderId: "680152036805",
    appId: "1:680152036805:web:4e2cd11039d5cf423747ac"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Card = (props) => {
    const [image, setImage] = useState(null);
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const url = await getDownloadURL(ref(storage, `testPost/${props.data.id}`));
                setImage(url);
            } catch (error) {
                console.error("Erro ao obter a imagem:", error);
            }
        };
        fetchImage();
        setLiked(Boolean(localStorage.getItem(props.data.id)))

    }, [props.data.id]);

    function likeThis() {
        if (liked == false) {
            setLiked(true)
            localStorage.setItem(`${props.data.id}`, true)
        } else {
            setLiked(false)
            localStorage.setItem(`${props.data.id}`, false)
        }
    }

    return (
        <article>
            {image && <img src={image} alt="Imagem do post" />}
            <p style={image == null ? { margin: "10px 0px", fontSize: '22px' } : null}>{props.data.text}</p>
            <div className='cardDiv' style={image == null ? { margin: "0px 0px 10px 0px" } : null}>
                <button onClick={likeThis} className='cardButton' type="button"><i className={liked == false ? "bi bi-heart" : "bi bi-heart-fill"} style={liked == false ? null : { color: 'red' }}></i></button>
                <button className='cardButton' type="button"><i className="bi bi-share"></i></button>
            </div>
        </article>
    );
};

export default Card;
