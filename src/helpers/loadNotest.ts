import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async (uid = "") => {
    if (!uid) throw new Error("The UID of user not exist")
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef);
    const notes: TNote[] = []

    docs.forEach(doc => {
        notes.push({
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            date: doc.data().date,
            imagesUrls: doc.data().imagesUrls,
        })
    })
    return notes;
}