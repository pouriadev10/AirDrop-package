import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, VStack, Flex, Spacer
} from '@chakra-ui/react';
import { CallProgramInstruction, GetProgramAccount } from '../api';
import { parseFormValues, getInstructionAdditionalData } from '../utils/componentHelper';
import { useConfig } from '../..';

