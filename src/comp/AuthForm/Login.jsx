import { Input, Button, Alert } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { loading, error, login } = useLogin();

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
            email: e.target.value.toLowerCase().replace(/\s/g, ""),
          })
        }
        onKeyDown={(e) => {
          const isLetter = /^[A-Z]$/.test(e.key);
          const isSpace = e.key === " ";

          if (isLetter || isSpace) {
            e.preventDefault();
          }
        }}
      />
      <Input
        placeholder="Password"
        fontSize={14}
        type="password"
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
        onClick={() => login(inputs)}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;