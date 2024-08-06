import {
  Box,
  Button,
  Heading,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePrivy } from '@privy-io/react-auth';
import { useWriteContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../configs/abi';
import { anvil } from 'viem/chains';

function UserPage() {
  const { ready, authenticated, login } = usePrivy();
  const { writeContract } = useWriteContract();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.500', 'gray.400');

  const start = async () => {
    try {
      const result = await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'connect',
        args: ['0x1ccb7e120bfdb43daf70b935f7a35c0b0ffd958017a5ff375cd64eaee9cd6115'],
        account: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      p={4}
    >
      {ready ? (
        <VStack
          spacing={6}
          p={8}
          bg={boxBg}
          boxShadow="lg"
          borderRadius="lg"
          w="full"
          maxW="md"
          textAlign="center"
        >
          {' '}
          <VStack>
            <Heading as="h2" size="lg" color="gray.400">
              Welcome to
            </Heading>
            <Heading as="h1" size="2xl">
              EthSim Network
            </Heading>
          </VStack>
          {!authenticated ? (
            <>
              <Text fontSize="lg" color={textColor}>
                Please connect to start browsing
              </Text>
              <Button colorScheme="blue" onClick={login} size="lg">
                Connect
              </Button>
            </>
          ) : (
            <>
              <Text fontSize="lg" color={textColor}>
                Please confirm your signin to start browsing
              </Text>
              <Button colorScheme="blue" onClick={start} size="lg">
                Start
              </Button>
            </>
          )}
        </VStack>
      ) : (
        <Spinner />
      )}
    </Box>
  );
}

export default UserPage;
