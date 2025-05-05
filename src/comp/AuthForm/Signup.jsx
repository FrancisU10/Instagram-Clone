
import { Input, Button, Group} from "@chakra-ui/react"
import { useState } from "react"
import { PasswordInput } from "../../components/ui/password-input";

const Signup = () => {
    const [inputs, setInputs] = useState ({
          fullName: '',
          username: '',
          email: '',
          password: ''
    })  
   
  return (
    <>
    <Input 
        placeholder="Email" 
        fontSize={14} type="email" 
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({...inputs, email:e.target.value})}    
    />
    <Input 
        placeholder="Username" 
        fontSize={14} 
        type="text" 
        size={"sm"}
        value={inputs.username}
        onChange={(e) => setInputs({...inputs, username:e.target.value})}    
    />
    <Input 
        placeholder="Full Name" 
        fontSize={14} 
        type="text" 
        size={"sm"}
        value={inputs.fullName}
        onChange={(e) => setInputs({...inputs, fullName:e.target.value})}    
    />
    <PasswordInput 
        placeholder="Password" 
        fontSize={14} 
        size={"sm"}
        value={inputs.password}
        onChange={(e) => setInputs({...inputs, password:e.target.value})} 
    />
    
    <Button w={"full"} colorPalette={"blue"} size={"sm"} fontSize={14}>
        Sign Up
    </Button>

    </>
  )
}

export default Signup