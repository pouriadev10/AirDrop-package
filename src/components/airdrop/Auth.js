import React, { useState } from "react";
import { blockchainLogin, blockchainSignup } from '../../api';
import { Button, Text, ButtonModal, Flex } from '../base';
import { useConfig } from "../../../ConfigContext";

/**
 * Login component allows users to log in using their wallet.
 * This component is configurable in Configurations.
 * @param {Object} wallet - The user's wallet identifier.
 * @param {Function} setAuthToken - A function to set the authentication token upon successful login.
 * @returns {JSX.Element} - The rendered Login component.
 */
export const Login = ({ wallet, setAuthToken }) => {
    const config = useConfig();
    const loginComponent = config.loginComponent;

    const login = async () => {
        const result = await blockchainLogin(
            config.backendUrl,
            config.authAppRoot,
            wallet,
            config.authNetwork,
            config.authProvider,
        );
        if (result.success) {
            const authToken = "Token " + result.key;
            setAuthToken(authToken);
        }
    };

    return (
        <Button {...loginComponent.buttonProps} onClick={login}>
            <Text {...loginComponent.label.labelProps}>
                {loginComponent.label.text}
            </Text>
        </Button>
    );
};

/**
 * Signup component allows users to sign up using their wallet and additional form data.
 * This component is configurable in Configurations.
 * @param {Object} wallet - The user's wallet identifier.
 * @param {Function} setAuthToken - A function to set the authentication token upon successful signup.
 * @returns {JSX.Element} - The rendered Signup component.
 */
export const Signup = ({ wallet, setAuthToken }) => {
    const config = useConfig();
    const signupComponent = config.signupComponent;
    const modalData = signupComponent.modalData;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({});

    const signup = async () => {
        const result = await blockchainSignup(
            config.backendUrl,
            config.authAppRoot,
            wallet,
            config.authNetwork,
            config.authProvider,
            formValues,
        );
        if (result.success) {
            const authToken = "Token " + result.key;
            setAuthToken(authToken);
        }
    };

    return (
        <>
            <Button {...signupComponent.buttonProps} onClick={() => setIsModalOpen(true)}>
                <Text {...signupComponent.label.labelProps}>
                    {signupComponent.label.text}
                </Text>
            </Button>
            <ButtonModal
                label={modalData.label}
                inputFields={modalData.inputFields}
                isModalOpen={isModalOpen}
                modalProps={modalData.modalProps}
                setIsModalOpen={setIsModalOpen}
                formValues={formValues}
                setFormValues={setFormValues}
                onSubmit={signup}
            />
        </>
    );
};