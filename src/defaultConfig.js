export const defaultConfig = {
  backendUrl: "http://127.0.0.1:8000/",
  airdropAppRoot: "airdrop",
  authAppRoot: "bc-auth",
  authNetwork: "solana",
  authProvider: "devnet",
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
  }
}