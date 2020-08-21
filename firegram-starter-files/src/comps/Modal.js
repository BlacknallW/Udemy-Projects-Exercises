import React from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { projectFirestore } from "../firebase/config";

const Modal = ({ selectedImg, setSelectedImg, name, email, username }) => {
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

    const verifyUser = async () => {
        await projectFirestore.collection("users").doc(username).set(
            {
                isVerified: true,
            },
            { merge: true }
        );
        console.log("User successfully verified!");
    };

    const handleClick = e => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedImg(null);
        }
    };

    const handleVerify = e => {
        verifyUser();
        sendVerificationEmail();
        setSelectedImg(null);
    };
    return (
        <motion.div
            className="backdrop"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.img
                src={selectedImg}
                alt="enlarged pic"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            />
            <button
                className="button is-success has-text-centered"
                style={{ display: "block", margin: "auto" }}
                onClick={() => handleVerify()}
            >
                Verify
            </button>
        </motion.div>
    );
};

export default Modal;
