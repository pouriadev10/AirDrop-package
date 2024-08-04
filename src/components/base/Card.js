import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { GetProgramAccount } from '../../api';
import { useConfig } from '../..';
import { CardItem } from './CardItem';

/**
 * AirdropCard component displays an airdrop card with account details and associated items.
 * @param {string} authToken - The authentication token.
 * @param {string} wallet - The wallet identifier.
 * @param {Object} label - The label configuration for the card.
 * @param {Object} flexProps - Additional props for the Flex container.
 * @param {Object} boxProps - Additional props for the Box container.
 * @param {string} accountTypeName - The type name of the account.
 * @param {Array} items - An array of item configurations to be displayed in the card.
 * @returns {JSX.Element} - The rendered AirdropCard component.
 */
export const AirdropCard = ({ authToken, wallet, label, flexProps, boxProps, accountTypeName, items }) => {
    const config = useConfig();
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            console.log('Fetching account...');
            const account = await GetProgramAccount(
                config.backendUrl,
                config.airdropAppRoot,
                authToken,
                config.programId,
                accountTypeName,
            );
            console.log('Account fetched:', account);
            setAccount(account);
        };

        fetchAccount();
    }, [config, authToken, accountTypeName]);
   
    return (
        <Flex {...flexProps}>
            <Box {...boxProps}>
                <Text {...label.labelProps} >{label.text}</Text>
                {items.map((item, index) => (
                    <CardItem
                        key={index} // Ensure each item has a unique key
                        authToken={authToken}
                        wallet={wallet}
                        account={account}
                        detail={item.detail}
                        buttons={item.buttons}
                        flexProps={item.flexProps}
                        boxProps={item.boxProps}
                    />
                ))}
            </Box>
        </Flex>
    );
};