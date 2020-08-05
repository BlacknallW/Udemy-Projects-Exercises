import React, { useState } from "react";

const UploadForm = () => {
    const [createUsername, setCreateUsername] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [createFirstName, setCreateFirstName] = useState("");
    const [createLastName, setCreateLastName] = useState("");
    const [createMedicalSchool, setCreateMedicalSchool] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ["image/png", "image/jpeg", "application/pdf"];

    const updateValues = () => {
        setCreateUsername(document.querySelector("#username").value);
        setCreatePassword(document.querySelector("#password").value);
        setCreateEmail(document.querySelector("#emailAddress").value);
        setConfirmPassword(document.querySelector("#confirmPassword").value);
        setCreateFirstName(document.querySelector("#firstname").value);
        setCreateLastName(document.querySelector("#lastname").value);
        setCreateMedicalSchool(document.querySelector("#medicalschool").value);
    };

    const changeHandler = e => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError("");
        } else {
            setFile(null);
            setError("Please select an image file (png or jpeg)");
        }
    };

    return (
        <section className="section box">
            <form>
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            id="firstname"
                            value={createFirstName}
                            onChange={e => updateValues()}
                        ></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            id="lastname"
                            value={createLastName}
                            onChange={e => updateValues()}
                        ></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            id="username"
                            value={createUsername}
                            onChange={e => updateValues()}
                        ></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="password"
                            id="password"
                            value={createPassword}
                            onChange={e => updateValues()}
                        ></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={e => updateValues()}
                        ></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="email"
                            value={createEmail}
                            onChange={e => updateValues()}
                            id="emailAddress"
                        ></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Medical School</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            id="medicalschool"
                            value={createMedicalSchool}
                            onChange={e => updateValues()}
                        ></input>
                    </div>
                </div>
                <div className="field">
                    <label for="medicalschoolyear" className="label">
                        Medical School Year
                    </label>
                    <div className="control">
                        <select
                            id="medicalschoolyear"
                            name="medicalschoolyear"
                            className="input is-rounded"
                        >
                            <option value="MS1">MS1</option>
                            <option value="MS2">MS2</option>
                            <option value="MS3">MS3</option>
                            <option value="MS4">MS4</option>
                            <option value="Resident">Resident</option>
                            <option value="Fellow">Fellow</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Medical School Verification</label>
                    <p style={{ fontSize: "12px" }}>
                        Please submit one of the following: school ID,
                        acceptance letter, unofficial transcript, or certificate
                        of enrollment
                    </p>
                    <input type="file" onChange={changeHandler} />
                    <div className="output">
                        {error && <div className="error">{error}</div>}
                        {file && (
                            <div className="file">
                                {file.name}
                            </div>
                        )}
                    </div>
                </div>{" "}
                <button type="submit" className="button is-success">
                    Create Account
                </button>
            </form>
        </section>
    );
};

export default UploadForm;