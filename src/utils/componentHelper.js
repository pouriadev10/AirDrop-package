import { useConfig } from "../ConfigContext";
import { getUserATA } from "../api";
import { AirdropCard, CardItem, ItemButton, ButtonModal, InstructionCalls, TaskList, TaskCreateButton } from "../components/base";

/**
 * Parses a value based on its type and optionally scales it by a decimal count.
 * @param {string|number} value - The value to be parsed.
 * @param {string} type - The type of the value ('float', 'int', or any other type).
 * @param {number} [decimalCount] - The number of decimal places to scale the value by.
 * @returns {number|string} - The parsed value.
 */
export const parseValue = (value, type, decimalCount) => {
    let parsedValue;

    if (type === 'float') {
        parsedValue = parseFloat(value);
    } else if (type === 'int') {
        parsedValue = parseInt(value, 10);
    } else {
        parsedValue = value;
    }

    if (decimalCount) {
        parsedValue = parsedValue * 10 ** decimalCount;
    }
    return parsedValue;
};

/**
 * Parses form values based on the input fields' configurations.
 * @param {Object} formValues - The form values to be parsed.
 * @param {Array} inputFields - An array of input field configurations.
 * @returns {Object} - The parsed form values.
 */
export const parseFormValues = (formValues, inputFields) => {
    const parsedValues = {};
    inputFields.forEach((field) => {
        parsedValues[field.fieldName] = parseValue(formValues[field.fieldName], field.fieldType, field.decimalCount);
    });
    return parsedValues;
};

/**
 * Fetches additional data for instructions using specified methods.
 * @param {Object} config - The configuration object.
 * @param {string} authToken - The authentication token.
 * @param {string} wallet - The wallet identifier.
 * @param {Array} additionalData - An array of additional data configurations.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 */
export const getInstructionAdditionalData = async (config, authToken, wallet, additionalData) => {
    const fetchedData = {};
    
    for (const data of additionalData) {
        const methodParams = await getMethodParams(data.methodName, config, authToken, wallet, data.extraParams)
        const method = getMethod(data.methodName);
        if (method) {
            fetchedData[data.fieldName] = await method(...methodParams);
        } else {
            console.error(`Method ${data.methodName} not found`);
        }
    }
    return fetchedData;
};

/**
 * Retrieves a method by its name.
 * @param {string} methodName - The name of the method to retrieve.
 * @returns {Function|undefined} - The method function or undefined if not found.
 */
export const getMethod = (methodName) => {
    const methods = {
        "getUserATA": getUserATA
    };
    return methods[methodName];
};

/**
 * Constructs the parameters for a method call.
 * @param {string} method - The name of the method.
 * @param {Object} config - The configuration object.
 * @param {string} authToken - The authentication token.
 * @param {string} wallet - The wallet identifier.
 * @param {Object} extraParams - Additional parameters for the method.
 * @returns {Promise<Array>} - A promise that resolves to the method parameters.
 */
const getMethodParams = async (method, config, authToken, wallet, extraParams) => {
    const constantParams = [
        config.backendUrl,
        config.airdropAppRoot,
        authToken,
    ]
    const otherParams = {
        "getUserATA": [config.mintTokenId,],
    }
    return constantParams.concat(otherParams[method]);
};

/**
 * Generates a card component based on a configuration key.
 * @param {string} configKey - The key to retrieve the card configuration from the config.
 * @returns {Function} - A React component that renders the card.
 */
export const GenerateCardComponent = async (configKey) => {
    const Component = ({ authToken, wallet }) => {
        const config = useConfig();
        const cardDetail = config[configKey];
        if (!cardDetail.programId) {
            cardDetail.programId = config.defaultProgramId;
        }
        return (
            <>
                <AirdropCard 
                    authToken={authToken}
                    wallet={wallet}
                    label={cardDetail.label}
                    flexProps={cardDetail.flexProps}
                    boxProps={cardDetail.boxProps}
                    accountTypeName={cardDetail.accountTypeName}
                    items={cardDetail.items}
                    programId={cardDetail.programId}
                />
            </>
        );
    };
    return Component;
    
};


export const GenerateInstructionCallsComponent = async (configKey) => {
    const Component = ({ authToken, wallet }) => {
        const config = useConfig();
        const instructionDetail = config[configKey];
        return (
            <>
                <InstructionCalls 
                    authToken={authToken}
                    wallet={wallet}
                    instructionType={instructionDetail.instructionType}
                    instructionStatus={instructionDetail.instructionStatus}
                    label={instructionDetail.label}
                    boxProps={instructionDetail.boxProps}
                    tableProps={instructionDetail.tableProps}
                />
            </>
        );
    }
    return Component;
}


export const GenerateTaskListComponent = async (configKey) => {
    const Component = ({ authToken, wallet }) => {
        const config = useConfig();
        const taskListDetail = config[configKey];
        return (
            <>
                <TaskList 
                    authToken={authToken}
                    wallet={wallet}
                    taskStatus={taskListDetail.taskStatus}
                    showInstructionCalls={taskListDetail.showInstructionCalls}
                    boxProps={taskListDetail.boxProps}
                    tableProps={taskListDetail.tableProps}
                    collapseProps={taskListDetail.collapseProps}
                />
            </>
        )
    }
    return Component;
}

export const GenerateTaskCreateButtonComponent = async (configKey) => {
    const Component = ({ authToken, wallet }) => {
        const config = useConfig();
        const buttonDetail = config[configKey];
        return (
            <>
                <TaskCreateButton 
                    authToken={authToken}
                    wallet={wallet}
                    label={buttonDetail.label}
                    flexProps={buttonDetail.flexProps}
                    buttonProps={buttonDetail.buttonProps}
                    modalData={buttonDetail.modalData}
                />
            </>
        )
    }
    return Component;
}