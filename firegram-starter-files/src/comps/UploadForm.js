import React, { useState } from "react";
import {
    projectFirestore,
    timestamp,
    projectStorage,
    projectAuth,
} from "../firebase/config";
import emailjs from "emailjs-com";

const UploadForm = () => {
    const [createUsername, setCreateUsername] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [createFirstName, setCreateFirstName] = useState("");
    const [createLastName, setCreateLastName] = useState("");
    const [createMedicalSchoolYear, setCreateMedicalSchoolYear] = useState("");
    const [createMedicalSchool, setCreateMedicalSchool] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);

    const types = ["image/png", "image/jpeg", "application/pdf"];

    const updateValues = () => {
        setCreateUsername(document.querySelector("#username").value);
        setCreatePassword(document.querySelector("#password").value);
        setCreateEmail(document.querySelector("#emailAddress").value);
        setConfirmPassword(document.querySelector("#confirmPassword").value);
        setCreateFirstName(document.querySelector("#firstname").value);
        setCreateLastName(document.querySelector("#lastname").value);
        setCreateMedicalSchool(document.querySelector("#medicalschool").value);
        setCreateMedicalSchoolYear(
            document.querySelector("#medicalschoolyear").value
        );
    };

    const fileStorage = file => {
        let storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore
            .collection("users")
            .doc(createUsername);
        storageRef.put(file).then(async () => {
            const url = await storageRef.getDownloadURL();
            collectionRef.set(
                {
                    schoolVerification: url,
                    creationDate: timestamp(),
                },
                { merge: true }
            );
            console.log(url);
        });
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

    const sendVerificationEmail = async () => {
        const template_params = {
            email: createEmail,
            to_name: createFirstName,
            message_html: "Welcome to GABA!",
        };

        const service_id = "default_service";
        const template_id = "template_wI6uIxWm";
        const user_id = "user_f73GApkRJtLhlOTpAdhQN";
        await emailjs.send(service_id, template_id, template_params, user_id);
        console.log("Email sent successfully to ", createEmail);
    };

    const createUser = async () => {
        await projectAuth.createUserWithEmailAndPassword(
            createEmail,
            createPassword
        );
    };

    const userDatabaseEntry = async () => {
        await projectFirestore.collection("users").doc(createUsername).set(
            {
                username: createUsername,
                email: createEmail,
                firstName: createFirstName,
                lastName: createLastName,
                medicalSchool: createMedicalSchool,
                medicalSchoolYear: createMedicalSchoolYear,
                isVerified: false,
            },
            { merge: true }
        );
        console.log("Document successfully written!");
    };

    const submitHandler = e => {
        e.preventDefault();
        try {
            createUser()
                .catch(error => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    setValidationError(errorMessage);
                    console.error(`Error Code: ${errorCode}. ${errorMessage}`);
                    throw error;
                })
                .then(() => {
                    fileStorage(file);
                })
                .catch(error => {
                    console.error(error);
                })
                .then(async () => {
                    await userDatabaseEntry();
                })
                .catch(error => {
                    console.error(error);
                })
                .then(() => {
                    sendVerificationEmail();
                })
                .catch(error => {
                    console.error("Error sending email", error);
                });
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    return (
        <section className="section box">
            <p className="has-text-centered" style={{ color: "red" }}>
                All fields are required for submission.
            </p>
            <form>
                <section className="field">
                    <label htmlFor="firstname" className="label">
                        First Name
                    </label>
                    <section className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            id="firstname"
                            value={createFirstName}
                            onChange={e => updateValues()}
                            required
                        ></input>
                    </section>
                </section>
                <section className="field">
                    <label htmlFor="lastname" className="label">
                        Last Name
                    </label>
                    <section className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            id="lastname"
                            value={createLastName}
                            onChange={e => updateValues()}
                            required
                        ></input>
                    </section>
                </section>
                <section className="field">
                    <label htmlFor="username" className="label">
                        Username
                    </label>
                    <section className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            id="username"
                            value={createUsername}
                            onChange={e => updateValues()}
                            required
                        ></input>
                    </section>
                </section>
                <section className="field">
                    <label htmlFor="password" className="label">
                        Password
                    </label>
                    <section className="control">
                        <input
                            className="input is-rounded"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={createPassword}
                            onChange={e => updateValues()}
                            required
                        ></input>
                    </section>
                </section>
                <section className="field">
                    <label htmlFor="confirmpassword" className="label">
                        Confirm Password
                    </label>
                    <section className="control">
                        <input
                            className="input is-rounded"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={e => updateValues()}
                            required
                        ></input>
                        {createPassword !== confirmPassword ? (
                            <p>Your passwords don't match.</p>
                        ) : (
                            <p></p>
                        )}
                    </section>
                </section>
                <section className="field">
                    <label htmlFor="emailAddress" className="label">
                        Email Address
                    </label>
                    <section className="control">
                        <input
                            className="input is-rounded"
                            type="email"
                            autoComplete="email"
                            value={createEmail}
                            onChange={e => updateValues()}
                            id="emailAddress"
                            required
                        ></input>
                        {validationError ? <p>{validationError}</p> : <p></p>}
                    </section>
                </section>
                <section className="field">
                    <label htmlFor="medicalschool" className="label">
                        Medical School
                    </label>
                    <section className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            id="medicalschool"
                            value={createMedicalSchool}
                            onChange={e => updateValues()}
                            required
                        ></input>
                    </section>
                </section>
                <section className="field">
                    <label htmlFor="medicalschoolyear" className="label">
                        Medical School Year
                    </label>
                    <section className="control">
                        <select
                            id="medicalschoolyear"
                            name="medicalschoolyear"
                            className="input is-rounded"
                            onChange={e => updateValues()}
                        >
                            <option value="MS1">MS1</option>
                            <option value="MS2">MS2</option>
                            <option value="MS3">MS3</option>
                            <option value="MS4">MS4</option>
                            <option value="Resident">Resident</option>
                            <option value="Fellow">Fellow</option>
                        </select>
                    </section>
                </section>
                <section className="field">
                    <label htmlFor="filesubmission" className="label">
                        Medical School Verification
                    </label>
                    <p style={{ fontSize: "12px" }}>
                        Please submit one of the following: school ID,
                        acceptance letter, unofficial transcript, or certificate
                        of enrollment.
                    </p>
                    <input
                        type="file"
                        onChange={changeHandler}
                        required
                        id="filesubmission"
                    />
                    <section className="output">
                        {error && <section className="error">{error}</section>}
                        {file && (
                            <section className="file">{file.name}</section>
                        )}
                    </section>
                </section>{" "}
                <button
                    type="submit"
                    className="button is-success"
                    onClick={submitHandler}
                >
                    Create Account
                </button>
            </form>
        </section>
    );
};

export default UploadForm;
