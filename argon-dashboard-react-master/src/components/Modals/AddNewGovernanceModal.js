import React, { useState,useEffect } from "react";
//import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
} from "reactstrap";

const AddNewGovernanceModal = ({ isOpen, toggle }) => {
  const userType = "Governance"
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userDesignation, setUserDesignation] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  /*useEffect(() => {
    const response = axios.get("http://localhost:8070/RiskOwner/getId");
    console.log(response);
    const numericPart = parseInt(response.substring(1));
    const newNumericPart = numericPart + 1;
    const newId = `R${String(newNumericPart).padStart(3, '0')}`;
    setUserID(newId);
  }, []);*/


  const handleSubmit = (e) => {

  };

  return (


    <Modal
      className="modal-dialog-centered modal-lg"
      size="sm"
      isOpen={isOpen}
      toggle={toggle}
    >
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted mt-2 mb-3">
              <bold>Add Governance</bold>
            </div>

          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">User ID : </span>
                    <div className="d-flex flex-grow-1">
                    <Button className="mr-2" color="primary" type="submit" style={{ width: "150px" }}>Get ID</Button>
                    <Input
                      className="form-control-alternative"
                      disabled
                      type="text"
                      placeholder={userID}
                    />
                  </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Password : </span>
                    <Input
                      className="form-control-alternative"
                      id="userPwd"
                      placeholder="1234"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Name : </span>
                    <Input
                      className="form-control-alternative"
                      id="userName"
                      placeholder="Enter User Name"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">E-mail : </span>
                    <Input
                      className="form-control-alternative"
                      id="userEmail"
                      placeholder="Enter Your E-mail"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">User Type : </span>
                  
                    <Input
                      className="form-control-alternative"
                      disabled
                      id="userType"
                      defaultValue={userType}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Designation : </span>
                    <Input
                      className="form-control-alternative"
                      id="designation"
                      placeholder="Ex:Project Manager"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Department : </span>
                    <Input className="form-control-alternative" type="select">
                      <option value="">Select Department</option>
                      <option value="department1">Department 1</option>
                      <option value="department2">Department 2</option>
                      <option value="department3">Department 3</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Phone : </span>
                    <Input
                      className="form-control-alternative"
                      id="userPhone"
                      placeholder="Ex:+94778388021"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default AddNewGovernanceModal;
