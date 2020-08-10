import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";

const useStorage = file => {
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    // references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("users");

    storageRef.put(file).then(
        snapshot => {
            console.log("Uploaded file successfully");
        },
        err => {
            setError(err);
        },
        async () => {
            const url = await storageRef.getDownloadURL();
            collectionRef.add({ url });
            setUrl(url);
        }
    );

    return { url, error };
};

export default useStorage;
