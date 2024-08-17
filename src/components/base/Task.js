import React, { useState, useEffect, useCallback } from 'react';
import { useConfig } from '../..';
import { AssembleInstructionCallTransaction } from '../../api/instruction';
import { GetProgramList } from '../../api/program';
import { GetTaskList, CreateTask } from '../../api/task';
import { SignAndSendTransaction } from '../../api/transaction';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Collapse, IconButton, Select, Text, Input, Flex, Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Checkbox,
    VStack,  } from '@chakra-ui/react';
import { ButtonModal } from './ButtonModal';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { parseFormValues, getInstructionAdditionalData } from '../../utils/componentHelper';

export const TaskList = ({ authToken, wallet, taskStatus, showInstructionCalls, boxProps, tableProps, collapseProps }) => {
    const [tasks, setTasks] = useState([]);
    const [openTaskId, setOpenTaskId] = useState(0); // Single state to track the open task
    const config = useConfig();

    useEffect(() => {
        const fetchUserInstructionCalls = async () => {
            const taskList = await GetTaskList(config.backendUrl, config.airdropAppRoot, authToken, taskStatus);
            const formattedCalls = taskList.map(call => ({
                ...call,
                transactions: [call.transactions].filter(Boolean) // Filter out null or undefined transactions
            }));
            setTasks(formattedCalls || []);
        };

        fetchUserInstructionCalls();
    }, [config.backendUrl, config.airdropAppRoot, authToken, taskStatus]);

    const getTransactionStatus = (call) => {
        if (!call.transaction) {
            return "NA";
        } else {
            return call.transaction.status;
        }
    };

    const getButtonLabel = (call) => {
        const status = getTransactionStatus(call);
        switch (status) {
            case "NA":
                return "Assemble and Send";
            case "assembled":
                return "Sign and Send";
            case "pending":
                return <>Pending To Confirm</>;
            case "confirmed":
                return <>Pending To Finalize</>;
            case "finalized":
                return "Explore";
            case "failed":
                return "Resign and Send";
            default:
                return "Unknown Status";
        }
    };

    const handleButtonClick = async (call) => {
        console.log(call);
        if (!call.transaction || call.transaction.status === "failed") {
            await AssembleInstructionCallTransaction(config.backendUrl, config.airdropAppRoot, authToken, wallet, call.id);
        } else if (call.transaction && call.transaction.status === "assembled") {
            await SignAndSendTransaction(config.backendUrl, config.airdropAppRoot, authToken, wallet, call.transaction.id);
        } else if (call.transaction.status === "pending" || call.transaction.status === "confirmed") {
            // Do nothing, waiting.
        } else if (call.transaction && call.transaction.status === "finalized") {
            const url = `https://explorer.solana.com/tx/${call.transaction.transaction_hash}?cluster=devnet`;
            window.open(url, '_blank');
        }
    };

    const toggleTaskInstructions = (taskId) => {
        if (openTaskId === taskId) {
            setOpenTaskId(0);
        } else {
            setOpenTaskId(taskId);
        }
        // setOpenTaskId(prevState => {
        //     const newOpenTaskId = (prevState === taskId ? 0 : taskId);
        //     return newOpenTaskId;
        // });
        console.log('------------------------Toggling task. Previous state:', openTaskId);
    };
    

    return (
        <Box {...boxProps}>
            <Table {...tableProps?.Table}>
                <Thead {...tableProps?.Table}>
                    <Tr {...tableProps?.Table}>
                        <Th {...tableProps?.Th}>ID</Th>
                        <Th {...tableProps?.Th}>Name</Th>
                        <Th {...tableProps?.Th}>Program Name</Th>
                        <Th {...tableProps?.Th}>Public Key</Th>
                        <Th {...tableProps?.Th}>Status</Th>
                        {showInstructionCalls && <Th>Instructions</Th>}
                    </Tr>
                </Thead>
                <Tbody {...tableProps?.Tbody}>
                    {tasks.map((task) => (
                        <React.Fragment key={task.id}>
                            <Tr {...tableProps?.Tr}>
                                <Td {...tableProps?.Td}>{task.id}</Td>
                                <Td {...tableProps?.Td}>{task.name}</Td>
                                <Td {...tableProps?.Td}>{task.program_name}</Td>
                                <Td {...tableProps?.Td}>{task.public_key}</Td>
                                <Td {...tableProps?.Td}>{task.task_status}</Td>
                                {showInstructionCalls && (
                                    <Td {...tableProps?.Td}>
                                        <IconButton
                                            aria-label="Toggle Instructions"
                                            icon={openTaskId === task.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                            onClick={() => toggleTaskInstructions(task.id)} // Toggle this task's instructions
                                        />
                                    </Td>
                                )}
                            </Tr>
                            {showInstructionCalls && (
                                <Tr {...tableProps?.Tr}>
                                    <Td {...tableProps?.Td} colSpan={7}>
                                        <Collapse in={task.id === openTaskId} animateOpacity {...collapseProps?.Collapse}>
                                            <Box {...collapseProps?.Box}>
                                                {task.instruction_calls && task.instruction_calls.length > 0 ? (
                                                    <Table {...collapseProps?.Table}>
                                                        <Thead {...collapseProps?.Thead}>
                                                            <Tr {...collapseProps?.Tr}>
                                                                <Th {...collapseProps?.Th}>Instruction ID</Th>
                                                                <Th {...collapseProps?.Th}>Transaction Status</Th>
                                                                <Th {...collapseProps?.Th}>Timestamp</Th>
                                                                <Th {...collapseProps?.Th}>Action</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody {...collapseProps?.Tbody}>
                                                            {task.instruction_calls.map((instruction) => (
                                                                <Tr key={instruction.id} {...collapseProps?.Tr}>
                                                                    <Td {...collapseProps?.Td}>{instruction.id}</Td>
                                                                    <Td {...collapseProps?.Td}>{getTransactionStatus(instruction)}</Td>
                                                                    <Td {...collapseProps?.Td}>{instruction.timestamp}</Td>
                                                                    <Td {...collapseProps?.Td}>
                                                                        <Button {...collapseProps?.actionButton} onClick={async () => handleButtonClick(instruction)}>
                                                                            {getButtonLabel(instruction)}
                                                                        </Button>
                                                                    </Td>
                                                                </Tr>
                                                            ))}
                                                        </Tbody>
                                                    </Table>
                                                ) : (
                                                    <Box {...collapseProps?.Box}>No instructions available for this task.</Box>
                                                )}
                                            </Box>
                                        </Collapse>
                                    </Td>
                                </Tr>
                            )}
                        </React.Fragment>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};


export const TaskCreateButton = ({ 
    authToken, 
    wallet, 
    label, 
    flexProps, 
    buttonProps, 
    modalData = null 
}) => {
    const config = useConfig();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [programId, setProgramId] = useState('');
    const [taskName, setTaskName] = useState('');
    const [programList, setProgramList] = useState([]);

    // Fetch the program list when the component mounts
    useEffect(() => {
        const fetchProgramList = async () => {
            try {
                const programs = await GetProgramList(
                    config.backendUrl, config.airdropAppRoot, authToken
                );
                setProgramList(programs);
            } catch (error) {
                console.error('Error fetching program list:', error);
            }
        };

        fetchProgramList();
    }, [authToken]);

    const submission = useCallback(async () => {
        try {
            await CreateTask(
                config.backendUrl,
                config.airdropAppRoot,
                authToken,
                wallet,
                programId,
                taskName,
                formValues
            );
        } catch (error) {
            console.error('Error during submission:', error);
        }
    }, [programId, taskName, formValues, modalData, config, authToken, wallet]);

    const buttonClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCheckboxChange = useCallback((field) => {
        setFormValues(prevValues => ({ 
            ...prevValues, 
            [field.payloadName]: !prevValues[field.payloadName] // toggle the boolean value
        }));
    }, [setFormValues]);

    const handleInputChange = useCallback((field, value) => {
        if (field === "program") {
            setProgramId(value);
        } else if (field === "name") {
            setTaskName(value);
        } else {
            setFormValues(prevValues => ({ ...prevValues, [field.payloadName]: value }));
        }
    }, [setFormValues]);

    return (
        <Flex {...flexProps}>
            <Button {...buttonProps} onClick={buttonClick}>
                <Text {...label.labelProps}>{label.text}</Text>
            </Button>
            <Flex {...modalData?.modalProps?.flex}>
                <Modal {...modalData?.modalProps?.modal} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader {...modalData?.label.header}>
                            <Text {...modalData?.label.labelProps}>{modalData?.label.text}</Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody {...modalData?.modalProps?.body}>
                            <VStack {...modalData?.modalProps?.vStack} spacing={4}>
                                <Select
                                    key="program"
                                    placeholder="Select program"
                                    value={programId}
                                    onChange={(e) => handleInputChange("program", e.target.value)}
                                >
                                    {programList.map(program => (
                                        <option key={program.id} value={program.id}>
                                            {program.name}
                                        </option>
                                    ))}
                                </Select>
                                <Input
                                    key="name"
                                    placeholder="Task name"
                                    value={taskName}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                                {modalData?.inputFields?.map((field) => (
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
                        <ModalFooter {...modalData?.modalProps?.footer}>
                            <Button {...modalData?.modalProps?.submitButton} onClick={submission}>Submit</Button>
                            <Button {...modalData?.modalProps?.cancelButton} onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </Flex>
    );
};