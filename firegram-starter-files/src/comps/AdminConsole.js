import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const AdminConsole = ({ setSelectedImg }) => {
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);

    const sendVerificationEmail = async () => {
        const template_params = {
            email: email,
            to_name: name,
            message_html: "Congratulations! You've been verified!",
        };

        const service_id = "default_service";
        const template_id = "template_wI6uIxWm";
        const user_id = "user_f73GApkRJtLhlOTpAdhQN";
        await emailjs.send(service_id, template_id, template_params, user_id);
        console.log("Email sent successfully to ", email);
    };

    const clickHandler = () => {
        sendVerificationEmail();
    };
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
                            <p>
                                Name : {doc.firstName} {doc.lastName}
                            </p>
                            <p>Email: {doc.email}</p>
                            <p>Medical School: {doc.medicalSchool}</p>
                            <p>Year: {doc.medicalSchoolYear}</p>
                            <button
                                onClick={() =>
                                    setSelectedImg(doc.schoolVerification)
                                }
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
