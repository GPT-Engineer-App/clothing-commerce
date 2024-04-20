import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, FormControl, FormLabel, useToast, Heading } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    const response = await fetch("https://backengine-bpel.fly.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      toast({
        title: "Login Successful",
        description: `Welcome back!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // Handle storing the access token and redirecting to the home page
    } else {
      toast({
        title: "Login Failed",
        description: `Please check your credentials and try again.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    const response = await fetch("https://backengine-bpel.fly.dev/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      toast({
        title: "Signup Successful",
        description: `Your account has been created!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // Handle redirecting to the login page or directly logging in the user
    } else {
      toast({
        title: "Signup Failed",
        description: `There was an issue creating your account.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4}>
          <Heading mb={6}>Welcome to Our Clothing Store!</Heading>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
          <Button leftIcon={<FaUserPlus />} colorScheme="green" onClick={handleSignup}>
            Signup
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
