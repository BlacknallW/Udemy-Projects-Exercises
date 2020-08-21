import React, { useState } from "react";
import Title from "./comps/Title";
import UploadForm from "./comps/UploadForm";
import AdminConsole from "./comps/AdminConsole";
import Modal from "./comps/Modal";
import "bulma/css/bulma.css";

function App() {
    const [selectedImg, setSelectedImg] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null)
    return (
        <div className="App">
            <Title />
            {/* <UploadForm /> */}
            <div className="tile is-ancestor">
                <div className="tile is-4 is-vertical is-parent">
                    <AdminConsole
                        setSelectedImg={setSelectedImg}
                        setName={setName}
                        setEmail={setEmail}
                        setUsername={setUsername}
                    />
                </div>
                <div className="tile is-parent">
                    {selectedImg && (
                        <Modal
                            selectedImg={selectedImg}
                            setSelectedImg={setSelectedImg}
                            name={name}
                            email={email}
                            username={username}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
