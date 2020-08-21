import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

const AdminConsole = ({ setSelectedImg, setName, setEmail, setUsername }) => {
    const { docs } = useFirestore("users");
    return (
        <>
            {docs &&
                docs.map(doc => (
                    <motion.div
                        layout
                        whileHover={{ opacity: 1 }}
                        className="tile is-child box"
                        key={doc.id}
                    >
                        <p>Username: {doc.id}</p>
                        <p>
                            Name : {doc.firstName} {doc.lastName}
                        </p>
                        <p>Email: {doc.email}</p>
                        <p>Medical School: {doc.medicalSchool}</p>
                        <p>Year: {doc.medicalSchoolYear}</p>
                        <button
                            onClick={() => {
                                setSelectedImg(doc.schoolVerification);
                                setName(doc.firstName);
                                setEmail(doc.email);
                                setUsername(doc.id)
                            }}
                            className="button"
                        >
                            School Verification
                        </button>
                    </motion.div>
                ))}
        </>
    );
};

export default AdminConsole;
