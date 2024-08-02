import React from 'react';
import { Box, Text, Flex, Spacer } from '@chakra-ui/react';
import { ItemButton } from './ItemButton';

/**
 * CardItem component displays a single item within an airdrop card, including details and associated buttons.
 * @param {string} authToken - The authentication token.
 * @param {string} wallet - The wallet identifier.
 * @param {Object} account - The account data.
 * @param {Object} [detail=null] - The detail configuration for the item.
 * @param {Array} [buttons=null] - An array of button configurations to be displayed with the item.
 * @param {Object} flexProps - Additional props for the Flex container.
 * @param {Object} boxProps - Additional props for the Box container.
 * @returns {JSX.Element} - The rendered CardItem component.
 */
export const CardItem = ({ authToken, wallet, account, detail = null, buttons = null, flexProps, boxProps }) => {
    const getValue = () => {
        const value = account[detail.accountField]
        if (detail.decimalCount) {
            return value / 10 ** detail.decimalCount;
        }
        return value;
    };
    return (
        <Flex {...flexProps}>
            <Box {...boxProps}>
                {detail && (
                    <>
                        <Text {...detail.label.labelProps}>{detail.label.text}:</Text>
                        <Text {...detail.valueProps}>{account ? getValue()  : detail.defaultValue}</Text>
                    </>
                )}
                {buttons && (
                    <>
                        {detail && (
                            <Spacer />
                        )}
                        {buttons.map((button, index) => (
                            <ItemButton
                                key={index} // Ensure each button has a unique key
                                authToken={authToken}
                                wallet={wallet}
                                label={button.label}
                                buttonProps={button.buttonProps}
                                instructionName={button.instructionName}
                                modalData={button.modalData}
                                additionalInstructionData={button.additionalInstructionData}
                            />
                        ))}
                    </>
                )}
            </Box>
        </Flex>
    );
};