import React, { useState, useCallback } from 'react';
import { Text, Button, Flex } from '@chakra-ui/react';
import { CallProgramInstruction } from '../../api';
import { parseFormValues, getInstructionAdditionalData } from '../../utils/componentHelper';
import { useConfig } from '../..';
import { ButtonModal } from './ButtonModal';

/**
 * ItemButton component represents a button within a card item, which can trigger an instruction and optionally open a modal for additional input.
 * @param {string} authToken - The authentication token.
 * @param {string} wallet - The wallet identifier.
 * @param {Object} label - The label configuration for the button.
 * @param {Object} flexProps - Additional props for the Flex container.
 * @param {Object} buttonProps - Additional props for the Button component.
 * @param {string} instructionName - The name of the instruction to be called.
 * @param {Object} [modalData=null] - The modal configuration for additional input fields.
 * @param {Array} [additionalInstructionData=[]] - Additional data required for the instruction.
 * @returns {JSX.Element} - The rendered ItemButton component.
 */
export const ItemButton = ({ programId, authToken, wallet, label, flexProps, buttonProps, instructionName, modalData = null, additionalInstructionData = [] }) => {
    const config = useConfig();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({});

    const submission = useCallback(async () => {
        try {
            let data = {};
            if (modalData) {
                const parsedData = await parseFormValues(formValues, modalData.inputFields);
                data = parsedData;
            }
            if (additionalInstructionData) {
                const fetchedData = await getInstructionAdditionalData(config, authToken, wallet, additionalInstructionData);
                data = { ...data, ...fetchedData };
            }
       
            await CallProgramInstruction(
                config.backendUrl,
                config.airdropAppRoot,
                authToken,
                wallet,
                programId,
                instructionName,
                data,
            );
        } catch (error) {
            console.error('Error during submission:', error);
        }
    }, [formValues, modalData, additionalInstructionData, instructionName]);

    const buttonClick = useCallback(() => {
        if (modalData) {
            setIsModalOpen(true);
        } else {
            submission();
        }
    }, [modalData, submission]);

    return (
        <Flex {...flexProps}>
            <Button {...buttonProps} onClick={buttonClick}>
                <Text {...label.labelProps} >{label.text}</Text>
            </Button>
            {modalData && (
                <ButtonModal
                    label={modalData.label}
                    inputFields={modalData.inputFields}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    onSubmit={submission}
                    flexProps={modalData.flexProps}
                    modalProps={modalData.modalProps}
                />
            )}
        </Flex>
    );
};