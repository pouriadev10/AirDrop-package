import React, { useState, useEffect } from 'react';
import { GetUserInstructionCalls, AssembleInstructionCallTransaction } from '../../api/instruction';
import { SignAndSendTransaction } from '../../api/transaction';
import { useConfig } from '../..';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Checkbox } from '@chakra-ui/react';

export const InstructionCalls = ({ authToken, wallet, instructionType, instructionStatus, boxProps, tableProps }) => {
    const [userCalls, setUserCalls] = useState([]);
    const config = useConfig();

    if (instructionType === "task_caller" || instructionType === "task_initializer") {
        var instructionFields = ["id", "task", "transaction status", "timestamp"];
    } else {
        var instructionFields = ["id", "transaction status", "timestamp"];
    }

    useEffect(() => {
        const fetchUserInstructionCalls = async () => {
            const userInstructionCalls = await GetUserInstructionCalls(config.backendUrl, config.airdropAppRoot, authToken, instructionType, instructionStatus);
            // Ensure transactions are in an array
            const formattedCalls = userInstructionCalls.map(call => ({
                ...call,
                transactions: [call.transactions].filter(Boolean) // Filter out null or undefined transactions
            }));
            setUserCalls(formattedCalls || []);
        };

        fetchUserInstructionCalls();
    }, [config.backendUrl, config.airdropAppRoot, authToken, instructionType, instructionStatus]);

    const getTransactionStatus = (call) => {
        if (!call.transaction) {
            return "NA";
        } else {
            return call.transaction.status;
        }
        }
    const getButtonLabel = (call) => {
        const status = getTransactionStatus(call);
        switch (status) {
            case "NA":
                return "Assemble and Send"
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
        }
    };

    const handleButtonClick = async (call) => {
        console.log(call)
        if (!call.transaction || call.transaction.status === "failed") {
            await AssembleInstructionCallTransaction(config.backendUrl, config.airdropAppRoot, authToken, wallet, call.id);

        } else if (call.transaction && call.transaction.status === "assembled") {
            await SignAndSendTransaction(config.backendUrl, config.airdropAppRoot, authToken, wallet, call.transaction.id);

        } else if (call.transaction.status === "pending" || call.transaction.status === "confirmed") {
            // Do noting, waiting.

        } else if (call.transaction && call.transaction.status === "finalized") {
            const url = `https://explorer.solana.com/tx/${call.transaction.transaction_hash}?cluster=devnet`;
            window.open(url, '_blank');
        }
    };

    return (
        <Box {...boxProps} >
            <Table {...tableProps?.Table}>
                <Thead {...tableProps?.Thead}>
                    <Tr {...tableProps?.Tr}>
                        {instructionFields.map((field) => (
                            <Th key={field} {...tableProps?.Th}>{field}</Th>
                        ))}
                        <Th {...tableProps?.Th}>Action</Th>
                    </Tr>
                </Thead>
                <Tbody {...tableProps?.Tbody}>
                    {userCalls.map((call) => (
                        <React.Fragment key={call.id}>
                            <Tr {...tableProps?.Tr}>
                                {instructionFields.map((field) => (
                                    <Td key={`${call.id}-${field}`} {...tableProps?.Td}>
                                        {field === "transaction status" ? getTransactionStatus(call) : call[field]}
                                    </Td>
                                ))}
                                <Td {...tableProps?.Td}>
                                    <Button  {...tableProps?.actionButton} onClick={async () => handleButtonClick(call)}>
                                        {getButtonLabel(call)}
                                    </Button>
                                </Td>
                            </Tr>
                        </React.Fragment>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
