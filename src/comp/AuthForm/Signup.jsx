import { Input, Button, Alert } from "@chakra-ui/react";
import { useState } from "react";
import { PasswordInput } from "../../components/ui/password-input";
import useSignupWithEmailAndPassword from "../../hooks/useSignupWithEmailAndPassword";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });

  const { loading, error, signup } = useSignupWithEmailAndPassword();

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        size="sm"
        value={inputs.email}
        onChange={(e) =>
          setInputs({
            ...inputs,
            email: e.target.value.toLowerCase().replace(/\s/g, "")
          })
        }
      />
      <Input
        placeholder="Username"
        fontSize={14}
        type="text"
        size="sm"
        value={inputs.username}
        onChange={(e) =>
          setInputs({
            ...inputs,
            username: e.target.value.toLowerCase().replace(/\s/g, "")
          })
        }
      />
      <Input
        placeholder="Full Name"
        fontSize={14}
        type="text"
        size="sm"
        value={inputs.fullName}
        onChange={(e) =>
          setInputs({
            ...inputs,
            fullName: e.target.value
          })
        }
      />
      <PasswordInput
        placeholder="Password"
        fontSize={14}
        size="sm"
        value={inputs.password}
        onChange={(e) =>
          setInputs({
            ...inputs,
            password: e.target.value
          })
        }
      />

      {error && (
        <Alert.Root status="error" fontSize={13} p={2} borderRadius={4}>
          <Alert.Indicator />
          {error.message}
        </Alert.Root>
      )}

      <Button
        w="full"
        colorPalette="blue"
        size="sm"
        fontSize={14}
        loading={loading}
        onClick={() => signup(inputs)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;