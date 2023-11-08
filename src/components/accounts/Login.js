import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React, { useContext, useState } from "react";
import { API } from "../../Utils/handleApi";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  margin-top: 100px;
  box-shadow: 5px 2px 5px 2px rgb(0, 0, 0, 0.6);
`;
const Image = styled("img")({
  width: 300,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const SignButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Login = ({isUserAuthenticated}) => {
  const imageURL =
    "https://png.pngtree.com/png-vector/20220810/ourmid/pngtree-blogging-concept-picture-writer-laptop-png-image_5722986.png";
  const [account, setAccount] = useState("login");
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [loginData,setLoginData] = useState({
    username:'',
    password:''
  })
  const [error, setError] = useState("");
  const {setAccountData} = useContext(DataContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      let response = await API.userSignup(signupData);
      if (response?.isSuccess) {
        setSignupData({ name: "", username: "", password: "" });
        setAccount("login");
        setError("");
      }
    } catch (error) {
      setError("Something Went Wrong! Please Try Later");
    }
  }

  const handleLogin = async () => {
    try{
    let response = await API.userLogin(loginData);
    if (response?.isSuccess) {
      setError("");
      sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
      setAccountData({username:response.data.username,name:response.data.name})
      isUserAuthenticated(true);
      navigate('/');
    }
  }catch(error){
    setError("Something Went Wrong! Please Try Later");
  }
  }

  return (
    <> 
      <Component>
        <Box>
          <Image src={imageURL} alt="login" />
          {account === "login" ? (
            <Wrapper>
              <TextField
              onChange={(e)=> setLoginData({ ...loginData, [e.target.name]: e.target.value })}
               name="username" value={loginData.username} variant="standard" placeholder="Enter Your Username" />
              <TextField
              value={loginData.password}
              onChange={(e)=> setLoginData({ ...loginData, [e.target.name]: e.target.value })}
              name="password"
                variant="standard"
                placeholder="Enter Your Password"
                type="password"
              />
              <LoginButton variant="contained" onClick={handleLogin}>Login</LoginButton>
              <Typography textAlign={"center"} color={"#878787"} fontSize={14}>
                OR
              </Typography>
              <SignButton variant="text" onClick={() => setAccount("signup")}>
                Create AN ACCOUNT
              </SignButton>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                placeholder="Enter Your Name"
                name="name"
                required
                onChange={handleChange}
              />
              <TextField
              required
                variant="standard"
                placeholder="Enter Your Username"
                name="username"
                onChange={handleChange}
              />
              <TextField
              required
                onChange={handleChange}
                name="password"
                variant="standard"
                placeholder="Enter Your Password"
                type="password"
              />
              {error && <Error>{error}</Error>}
              <SignButton variant="text" onClick={handleSignup}>
                Sign Up
              </SignButton>
              <Typography textAlign={"center"} color={"#878787"} fontSize={14}>
                OR
              </Typography>
              <LoginButton
                variant="contained"
                onClick={() => setAccount("login")}
              >
                Already have an account? Login{" "}
              </LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </>
  );
};

export default Login;
