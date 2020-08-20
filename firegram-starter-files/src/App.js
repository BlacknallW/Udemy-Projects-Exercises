import React, { useState } from "react";
import Title from "./comps/Title";
import UploadForm from "./comps/UploadForm";
import AdminConsole from "./comps/AdminConsole";
import Modal from "./comps/Modal";
import "bulma/css/bulma.css";

function App() {
    const [selectedImg, setSelectedImg] = useState(null);
    return (
        <div className="App">
            <Title />
            {/* <UploadForm /> */}
            <div className="tile is-ancestor">
                <div className="tile is-4 is-vertical is-parent">
                    <AdminConsole setSelectedImg={setSelectedImg} />
                </div>
                <div className="tile is-parent">
                    {selectedImg && (
                        <Modal
                            selectedImg={selectedImg}
                            setSelectedImg={setSelectedImg}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
