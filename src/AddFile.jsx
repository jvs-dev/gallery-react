import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage, ref, uploadString } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import React, { useState } from 'react';
import Header from './Header';
import './Addfile.css';
import { NavLink } from 'react-router-dom';
import Notice from "./Notice";

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
const storage = getStorage();

const AddFile = () => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [textValue, setTextValue] = useState("");
    const [notices, setNotices] = useState(null);

    function preview(e) {
        let file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreviewUrl(imageUrl);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    async function addPost() {
        if (base64Image != null || textValue !== "") {
            const docRef = await addDoc(collection(db, "testPost"), {
                text: textValue,
            });
            if (base64Image != null) {
                let storageRef = ref(storage, `testPost/${docRef.id}`);
                uploadString(storageRef, base64Image, 'data_url').then((snapshot) => {
                    setNotices({ alert: "sucess", text: "Post adicionado com sucesso" });
                    setTextValue("");
                    setImagePreviewUrl(null);
                    setBase64Image(null);
                    setTimeout(() => {
                        setNotices(null);
                    }, 3000);
                }).catch((error) => {
                    console.error("Erro ao fazer o upload da imagem:", error);
                    setNotices({ alert: "error", text: "Falha ao adicionar post" });
                });
            } else {
                setNotices({ alert: "sucess", text: "Post adicionado com sucesso" });
                setTextValue("");
                setImagePreviewUrl(null);
                setBase64Image(null);
                setTimeout(() => {
                    setNotices(null);
                }, 3000);
            }
        }
    }

    return (
        <>
            <Header />
            <div className='addDiv'>
                <label htmlFor="addFile">
                    <img src={imagePreviewUrl} className='addPreview' />
                    <input type="file" accept="image/png, image/jpeg" id='addFile' name='addFile' onChange={preview} />
                </label>
                <textarea value={textValue} onChange={(evt) => setTextValue(evt.target.value)} name="" id="" rows={3}></textarea>
                <div className='addDiv--2'>
                    <button className='addBtn' style={{ border: 'solid 2px var(--red)' }}>
                        <NavLink to={'/'}>Cancelar</NavLink>
                    </button>
                    <button className='addBtn' style={{ background: 'var(--light-red)' }} onClick={addPost}>
                        Adicionar
                    </button>
                </div>
            </div>
            {notices != null ? <Notice alert={notices.alert} message={notices.text} /> : null}
        </>
    );
};

export default AddFile;
