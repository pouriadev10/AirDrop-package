import React, { useCallback } from 'react';
import { 
    Text, 
    Button, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Input, 
    VStack, 
    Flex,
    Checkbox
} from '@chakra-ui/react';

/**
 * ButtonModal component represents a modal dialog that appears when an associated button is clicked, allowing users to input additional data.
 * @param {Object} label - The label configuration for the modal.
 * @param {Array} inputFields - An array of input field configurations.
 * @param {boolean} isModalOpen - A boolean indicating whether the modal is open.
 * @param {Function} setIsModalOpen - A function to set the modal open state.
 * @param {Object} formValues - The current form values.
 * @param {Function} setFormValues - A function to set the form values.
 * @param {Function} onSubmit - A function to handle the form submission.
 * @param {Object} modalProps - Additional props for the modal and its components.
 * @returns {JSX.Element} - The rendered ButtonModal component.
 */
export const ButtonModal = ({ label, inputFields, isModalOpen, setIsModalOpen, formValues, setFormValues, onSubmit, modalProps, }) => {
    const handleInputChange = useCallback((field, value) => {
        setFormValues(prevValues => ({ ...prevValues, [field.payloadName]: value }));
    }, [setFormValues]);

    const handleCheckboxChange = useCallback((field) => {
        setFormValues(prevValues => ({ 
            ...prevValues, 
            [field.payloadName]: !prevValues[field.payloadName] // toggle the boolean value
        }));
    }, [setFormValues]);

    const handleSubmit = useCallback(() => {
        onSubmit(formValues);
        setIsModalOpen(false);
    }, [formValues, onSubmit, setIsModalOpen]);

    return (
        <Flex {...modalProps?.flex}>
            <Modal {...modalProps?.modal} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader {...label.header}>
                        <Text {...label.labelProps}>{label.text}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody {...modalProps?.body}>
                        <VStack {...modalProps?.vStack} spacing={4}>
                            {inputFields.map((field) => (
                                field.fieldType == "boolean" ? (
                                    <Checkbox
                                        key={field.payloadName}
                                        isChecked={formValues[field.payloadName] || false}
                                        onChange={() => handleCheckboxChange(field)}
                                    >
                                        {field.fieldName}
                                    </Checkbox>
                                ):(
                                    <Input
                                        key={field.payloadName}
                                        placeholder={field.fieldName}
                                        value={formValues[field.payloadName] || ''}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        type={field.fieldType}
                                    />
                                )
                            ))}
                        </VStack>
                    </ModalBody>
                    <ModalFooter {...modalProps?.footer}>
                        <Button {...modalProps?.submitButton} onClick={handleSubmit}>Submit</Button>
                        <Button {...modalProps?.cancelButton} onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};