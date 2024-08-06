// src/Dashboard.tsx
import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Heading,
  Icon,
  IconButton,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { FaClock, FaTachometerAlt, FaDatabase, FaSignal, FaQuestionCircle } from 'react-icons/fa';
import { usePublicClient, useReadContract, useWatchContractEvent } from 'wagmi';
import { parseAbiItem } from 'viem';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../configs/abi';

const connectedUsers = [
  { name: 'User 1', connectionTime: '2h 20m', latestActivity: 'Streaming' },
  { name: 'User 2', connectionTime: '1h 45m', latestActivity: 'Gaming' },
  { name: 'User 3', connectionTime: '3h 10m', latestActivity: 'Browsing' },
  { name: 'User 4', connectionTime: '4h 5m', latestActivity: 'Downloading' },
  { name: 'User 5', connectionTime: '30m', latestActivity: 'Idle' },
];

function OperatorPage() {
  const client = usePublicClient()
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'UserConnected',
    onLogs(logs) {
      console.log('New user connected', logs)
    },
  })

  useEffect(() => {
    const load = async () => {
      if(!client) return;
    
      const logs =  await client.getLogs({  
        address: CONTRACT_ADDRESS,
        event: parseAbiItem('event UserConnected(bytes32 indexed apId, address indexed user, uint256 connectedAt)'),
        args: {
          apId: '0x1ccb7e120bfdb43daf70b935f7a35c0b0ffd958017a5ff375cd64eaee9cd6115',
        },
        fromBlock: 0n
      })

      console.log(logs)
    }

    load();
  }, [client]);
  
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Router Dashboard</Heading>
        <IconButton aria-label="help" icon={<FaQuestionCircle />} />
      </Flex>
      <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
        <GridItem>
          <Stat p={4} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
            <Flex align="center">
              <Icon as={FaClock} boxSize={6} mr={2} />
              <Box>
                <StatLabel>Connection Uptime</StatLabel>
                <StatNumber>12h 34m</StatNumber>
                <StatHelpText>Average time</StatHelpText>
              </Box>
            </Flex>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat p={4} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
            <Flex align="center">
              <Icon as={FaTachometerAlt} boxSize={6} mr={2} />
              <Box>
                <StatLabel>Bandwidth</StatLabel>
                <StatNumber>100 Mbps</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  20% from last week
                </StatHelpText>
              </Box>
            </Flex>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat p={4} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
            <Flex align="center">
              <Icon as={FaDatabase} boxSize={6} mr={2} />
              <Box>
                <StatLabel>MB Consumed</StatLabel>
                <StatNumber>5000 MB</StatNumber>
                <StatHelpText>Today</StatHelpText>
              </Box>
            </Flex>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat p={4} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
            <Flex align="center">
              <Icon as={FaSignal} boxSize={6} mr={2} />
              <Box>
                <StatLabel>Connection Stability</StatLabel>
                <StatNumber>99.9%</StatNumber>
                <StatHelpText>Uptime</StatHelpText>
              </Box>
            </Flex>
          </Stat>
        </GridItem>
      </Grid>
      <Box mt={10}>
        <Heading size="md" mb={4}>Connected Users</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Connection Time</Th>
              <Th>Latest Activity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {connectedUsers.map((user, index) => (
              <Tr key={index}>
                <Td>{user.name}</Td>
                <Td>{user.connectionTime}</Td>
                <Td>{user.latestActivity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default OperatorPage;
