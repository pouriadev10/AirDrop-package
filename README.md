
# Airdrop SDK

A React SDK for integrating airdrop functionalities into your application.

## Installation

```bash
npm install {airdrop-sdk-tgz}
```

## Usage

### Configuration

Wrap your application with `ConfigProvider` to provide configuration settings,
Also You have add following additional providers for using our components:

```javascript
import React from 'react';
import { ConfigProvider } from 'airdrop-sdk';
import { ConfigProvider, SolanaWalletProvider, SolanaModalProvider } from "airdrop-sdk";
import { ChakraProvider } from "@chakra-ui/react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "airdrop-sdk";

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
]
function App() {
  return (
    <React.StrictMode>
    <ConfigProvider>
      <ChakraProvider>
        <SolanaWalletProvider wallets={wallets}>
          <SolanaModalProvider>
             <YourAppComponents />
          </SolanaModalProvider>
        </SolanaWalletProvider>
      </ChakraProvider>
    </ConfigProvider>
  </React.StrictMode>
     
  );
}

export default App;
```
see the [defaultConfig](#defaultconfig)
### Customize The Config

You can create your own configuration file and register it in ConfigProvider, also u can inherit from defaultConfig and make particular changes to it:
e.g. sdkConfigOverride:
```javascript
import defaultConfig from 'airdrop-sdk/lib/defaultConfig';

const sdkConfig = defaultConfig;

sdkConfig.backendUrl = 'localhost:4000';
sdkConfig.airdropAppRoot = 'airdrop';
sdkConfig.authAppRoot = 'blockchain-auth';

```
```javascript
import React from 'react';
import { ConfigProvider } from 'airdrop-sdk';
import { sdkConfig } from './sdkConfigOverride';

function App() {
  return (
    <ConfigProvider config={sdkConfig}>
      <YourAppComponents />
    </ConfigProvider>
  );
}

export default App;
```

### API
You can use our api methods within your own componetnts:

#### blockchainLogin:

/**
 * Blockchain Login
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {object} wallet - Wallet object
 * @param {string} network - Network name
 * @param {string} provider - Provider name
 * @returns {Promise<object>} - Login result
 */

#### blockchainSignup:

/**
 * Blockchain Signup
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {object} wallet - Wallet object
 * @param {string} network - Network name
 * @param {string} provider - Provider name
 * @param {object} authData - Additional authentication data
 * @returns {Promise<object>} - Signup result
 */

#### CallProgramInstruction:
/**
 * Call a Program Instruction
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {object} wallet - Wallet object
 * @param {string} programId - Program ID
 * @param {string} instructionName - Instruction name
 * @param {object} [data={}] - Additional data
 * @returns {Promise<string|null>} - Transaction signature or null if failed
 */

#### GetProgramAccount:
/**
 * Get Program Account
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} programId - Program ID
 * @param {string} accountTypeName - Account type name
 * @returns {Promise<object>} - Program account details
 */
#### getProgramTransaction:
/**
 * Get Transaction for a Program
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} programId - Program ID
 * @param {string} signature - Transaction signature
 * @param {string} [commitment="confirmed"] - Commitment level
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<object>} - Transaction details
 */
#### getProgramParsedTransaction:
/**
 * Get Parsed Transaction for a Program
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} programId - Program ID
 * @param {string} signature - Transaction signature
 * @param {string} [commitment="confirmed"] - Commitment level
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<object>} - Parsed transaction details
 */

#### CreateATA:
/**
 * Create an Associated Token Account (ATA)
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {object} wallet - Wallet object
 * @param {string} mintTokenId - Mint token ID
 * @returns {Promise<string|null>} - Transaction signature or null if failed
 */


#### getUserATA:
/**
 * Get User Associated Token Address (ATA)
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} mintTokenId - Mint token ID
 * @returns {Promise<string|null>} - User ATA address or null if not found
 */


#### getTokenTransaction:
/**
 * Get Transaction for a Token
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} mintTokenId - Mint token ID
 * @param {string} signature - Transaction signature
 * @param {string} [commitment="confirmed"] - Commitment level
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<object>} - Transaction details
 */
#### getTokenParsedTransaction:

/**
 * Get Parsed Transaction for a Token
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} mintTokenId - Mint token ID
 * @param {string} signature - Transaction signature
 * @param {string} [commitment="confirmed"] - Commitment level
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<object>} - Parsed transaction details
 */

#### GetUserTransactionsList:
/**
 * Get User Transactions List
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @returns {Promise<object>} - List of user transactions
 */
### Components

#### pre-built components:
    You can import pre-built componetnts from 'airdrop-sdk/lib/components'
- useWallet component is used for connecting users wallet and returns wallet object
- Login: 
    - @param: wallet - pass the returned wallet object from useWallet
    - @param: setAuthToken - pass the function which will set the authToken
- Signup:
    - @param: wallet - pass the returned wallet object from useWallet
    - @param: setAuthToken - pass the function which will set the authToken
- AdminDashboard:
    - @param: authToken - pass the authToken which was set by Login or Signup
    - @param: wallet - pass the returned wallet object from useWallet
- AirdropDashboard:
    - @param: authToken - pass the authToken which was set by Login or Signup
    - @param: wallet - pass the returned wallet object from useWallet


#### custom components:
    You can use our general component and helper functions to generate a configurable component.
    comopent path: 'airdrop-sdk/lib/component/base';
    helpers path: 'airdrop-sdk/lib/utils/componentHelper.js';


## Directory Structure

- **index.js**: Main entry point.
- **ConfigContext.js**: Configuration context provider.
- **defaultConfig.js**: Default configuration settings.
- **src/api**: API functions for authentication, program, token, and transaction.
- **src/utils**: Utility functions.
- **src/components**: Pre-built React components.



### defaultConfig:
```javascript
export const defaultConfig = {
  backendUrl: "http://127.0.0.1:8000/",
  airdropAppRoot: "airdrop",
  authAppRoot: "bc-auth",
  authNetwork: "solana",
  authProvider: "devnet",
  defaultProgramId: 1,
  loginComponent: {
    label: {
      text: "Login with Blockchain",
    },
    buttonProps:{
      colorScheme: "purple",
    }
  },

  signupComponent: {
    label: {
      text: "Signup with Blockchain",
    },
    buttonProps:{
      colorScheme: "purple",
    },
    modalData: {
      label: {
        text: "Signup",
      },
      inputFields: [{ fieldName: "username", fieldType: "string"}],
      modalProps: {
        flex: {},
        modal: {},
        header: {},
        body: {},
        vStack: {},
        footer: {},
        submitButton: {
          colorScheme: "blue",
          mr: "5px"
        },
        cancelButton: {
          variant: "outline",
          colorScheme: "gray",
          _hover: { bg: "red.500", color: "white" },
          ml: "5px",
        }
      }
    }
  },

  programId: 1,
  mintTokenId: 1,
  airdropDashboardComponent: {
    programId: 1,
    label: {
      text: "Airdrop Dashboard",
      labelProps: {
        textAlign: "center",
        fontSize: "2xl",
        fontWeight: "bold",
        mb: "4",
        colorScheme: "blue"
      }
    },
    flexProps:{
      justifyContent: "center",
    },
    boxProps: {
      bg: "gray.100",
      w: "700px",
      border: "1px solid gray.500",
      borderRadius: "md",
      p: 6,
      my: 4,
      boxShadow: "md",
      gap: "10px"
    },
    accountTypeName: "UserState",
    items: [
      {
        detail: {
          label: {
            text: "Staked Sol",
            labelProps: {
              fontWeight: "medium",
              fontSize: "xl",
            }
          },
          accountField: "staked_lamports_amount",
          decimalCount: 9,
          defaultValue: 0,
          valueProps: {
            color: "blue.600",
            fontWeight: "medium",
            fontSize: "xl",
            ml: "7px"
          },
          flexProps: {
            p: 4,
            border: "1px solid gray",
            borderRadius: "md",
            boxShadow: "sm"
          }
        },
        buttons: [{
          label: {
            text: "Stake",
            labelProps:{
              fontWeight: "bold",
              color: "white"
            }
          },
          instructionName: "stake_sol",
          modalData:{
            label: {
              text: "Staked Sol"
            },
            inputFields: [{ fieldName: "amount", fieldType: "float", decimalCount: 9 }],
            modalProps: {
              flex: {},
              modal: {},
              header: {},
              body: {},
              vStack: {},
              footer: {},
              submitButton: {
                colorScheme: "blue",
                mr: "5px"
              },
              cancelButton: {
                variant: "outline",
                colorScheme: "gray",
                _hover: { bg: "red.500", color: "white" },
                ml: "5px",
              }
            }
          },
          buttonProps: {
            w:'180px',
            colorScheme: "purple"
          }
        }],
        flexProps: {
          justifyContent: "center",
          mt: "10px"
        },
        boxProps: {
          display: "flex",
          w: "650px"
        }
      },
      {
        detail: {
          label: {
            text: "Airdrop Balance",
            labelProps: {
              fontWeight: "medium",
              fontSize: "xl",
            }
          },
          accountField: "airdrop_balance",
          decimalCount: 9,
          defaultValue: 0,
          valueProps: {
            color: "blue.600",
            fontWeight: "medium",
            fontSize: "xl",
            ml: "7px"
          },
          flexProps: {
            p: 4,
            border: "1px solid gray",
            borderRadius: "md",
            boxShadow: "sm"
          }
        },
        buttons: [{
          label: {
            text: "Refresh Balance",
            labelProps:{
              colorScheme: "blue"
            }
          },
          instructionName: "refresh_airdrop_balance",
          buttonProps: {
            w:'180px',
            colorScheme: "purple"
          }
        }],
        flexProps: {
          justifyContent: "center",
          mt: "10px"
        },
        boxProps: {
          display: "flex",
          w: "650px"
        }
      },
      {
        detail: {
          label: {
            text: "Transaction Count",
            labelProps: {
              fontWeight: "medium",
              fontSize: "xl",
            }
          },
          accountField: "transaction_count",
          defaultValue: 0,
          valueProps: {
            color: "blue.600",
            fontWeight: "medium",
            fontSize: "xl",
            ml: "7px"
          },
          flexProps: {
            p: 4,
            border: "1px solid gray",
            borderRadius: "md",
            boxShadow: "sm"
          }
        },
        buttons: [{
          label: {
            text: "Claim Airdrop",
            labelProps: {
              colorScheme: "orange"
            }
          },
          instructionName: "claim_airdrop",
          modalData: {
            label: {
              text: "Claim"
            },
            inputFields: [{ fieldName: "amount", fieldType: "float", decimalCount: 9 }],
            modalProps: {
              flex: {},
              modal: {},
              header: {},
              body: {},
              vStack: {},
              footer: {},
              submitButton: {
                colorScheme: "blue",
                mr: "5px"
              },
              cancelButton: {
                variant: "outline",
                colorScheme: "gray",
                _hover: { bg: "red.500", color: "white" },
                ml: "5px",
              }
            }
          },
          additionalInstructionData: [{
            fieldName: "user_token_account",
            methodName: "getUserATA"
          }],
          buttonProps: {
            w:'180px',
            colorScheme: "purple"
          }
        }],
        flexProps: {
          justifyContent: "center",
          mt: "10px"
        },
        boxProps: {
          display: "flex",
          w: "650px"
        }
      }
    ]
  },
  adminDashboardComponent: {
    label: {
      text: "Airdrop Admin Dashboard",
      labelProps: {
        textAlign: "center",
        fontSize: "2xl",
        fontWeight: "bold",
        mb: "4"
      }
    },
    flexProps: {
      justifyContent: "center",
    },
    boxProps: {
      bg: "gray.100",
      w: "700px",
      border: "1px solid gray.500",
      borderRadius: "md",
      p: 6,
      my: 4,
      boxShadow: "md",
    },
    accountTypeName: "MasterState",
    items: [
      {
        detail: {
          label: {
            text: "Total staked SOL",
            labelProps: {
              fontWeight: "medium",
              fontSize: "xl",
            }
          },
          accountField: "total_staked",
          decimalCount: 9,
          defaultValue: 0,
          valueProps: {
            color: "blue.600",
            fontWeight: "medium",
            fontSize: "xl",
            ml: "7px"
          },
          flexProps: {
            p: 4,
            border: "1px solid gray",
            borderRadius: "md",
            boxShadow: "sm"
          }
        },
        flexProps: {
          justifyContent: "center",
          mt: "10px",
        },
        boxProps: {
          display: "flex",
          w: "650px"
        }
      },
      {
        detail: {
          label: {
            text: "Total Airdrop",
            labelProps: {
              fontWeight: "medium",
              fontSize: "xl",
            }
          },
          accountField: "total_airdrop",
          decimalCount: 9,
          defaultValue: 0,
          valueProps: {
            color: "blue.600",
            fontWeight: "medium",
            fontSize: "xl",
            ml: "7px"
          },
          flexProps: {
            p: 4,
            border: "1px solid gray",
            borderRadius: "md",
            boxShadow: "sm"
          }
        },
        flexProps: {
          justifyContent: "center",
          mt: "10px",
        },
        boxProps: {
          display: "flex",
          w: "650px"
        }
      },
      {
        detail: {
          label: {
            text: "Total Transaction Count",
            labelProps: {
              fontWeight: "medium",
              fontSize: "xl",
            }
          },
          accountField: "total_transactions",
          defaultValue: 0,
          valueProps: {
            color: "blue.600",
            fontWeight: "medium",
            fontSize: "xl",
            ml: "7px"
          },
          flexProps: {
            p: 4,
            border: "1px solid gray",
            borderRadius: "md",
            boxShadow: "sm"
          }
        },
        flexProps: {
          justifyContent: "center",
          mt: "10px",
        },
        boxProps: {
          display: "flex",
          w: "650px"
        }
      }
    ]
  },
  allTasks: {
    taskStatus: ["active", "inactive", "pending_initialization", "failed_initialization"],
    showInstructionCalls: true,
    
  },
  createTask: {
    label: {
      text: "Create New Task",
    }
  },
  privateInstructionCalls: {
    instructionType: "private",
    instructionStatus: ["assembled", "failed", "finalized"],
  },
  publicInstructionCalls: {
    instructionType: "public",
    instructionStatus: ["assembled", "failed", "finalized"],
  },
  taskInstructionCalls: {
    instructionType: "task_caller",
    instructionStatus: ["assembled", "failed", "finalized"],
  }
}
```

