import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState } from "react";

const Login = () => {
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState('');
  const history = useHistory();

  const handleUserIDChange = (e) => {
    setUserID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (userType === "Admin") {
      try {
        const adminID = userID;
        const adminPwd = userPassword;
        const newLog = {
          adminID,
          adminPwd
        };
        console.log(newLog);

        const response = await axios.post("http://localhost:8070/Admin/login", newLog);

        if (response && response.data && response.data.token) {
          const { token } = response.data;

          // Store the token in local storage or state for future requests
          // Example: localStorage.setItem('token', token);

          // Redirect the user to the dashboard or protected route
          history.push('/admin/index');
        } else {
          setError('Invalid response format');
        }
        

      } catch (e) {
        setError(e.response.data.message);
        alert(error);
      }
      
    }
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5"></CardHeader>
          <CardBody>
            <div className="text-center text-muted mb-4">
              <h1 className="text-black">Sign in!</h1>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="UserID"
                    type="String"
                    autoComplete="001"
                    value={userID} onChange={handleUserIDChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"                    
                    value={userPassword} onChange={handlePasswordChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <select className="form-control mt-1"
                    onChange={(e) => {
                      setUserType(e.target.value);
                    }}>
                    <option selected>Select User Type</option>
                    <option value="Admin">Admin</option>
                    <option value="RiskOwner">Risk Owner</option>
                    <option value="RiskGovernance">Risk Governance</option>
                  </select>
                </InputGroup>
              </FormGroup>

              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>

        </Row>
      </Col>
    </>
  );
};

export default Login;
