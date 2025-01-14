// TODO: consolidate to one place
import {useEffect, useState} from "react";
import {getDatabase, onValue, ref} from "firebase/database";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ImagePage = ({sessionId}) => {
    const [images, setImages] = useState([])
    useEffect(() => {
        const sessionRef = ref(db, `sessions/${sessionId}/images`)
        onValue(sessionRef, (snapshot) => {
            let images = []
            snapshot.forEach((childSnapshot) => {
                images.push(childSnapshot.val())
            })
            setImages(images)
        })
    }, [])
    return (
        <div>
            {images.map(image => (
                <img alt="generated-image" src={image} width="256" height="256"/>
            ))}
        </div>
    )
}

export default ImagePage;