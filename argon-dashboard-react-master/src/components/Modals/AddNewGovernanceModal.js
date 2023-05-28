import axios from "axios";
import React, { useState,useEffect } from "react";


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
  const [governanceID, setGovernanceID] = useState("");
  const [governanceName, setGovernanceName] = useState("");
  const [governancePwd, setGovernancePwd] = useState("");
  const [governanceDesignation, setGovernanceDesignation] = useState("");
  const [governanceMail, setGovernanceMail] = useState("");
  const [governancePhone, setGovernancePhone] = useState("");
  
  useEffect(() => {
    const response = axios.get("http://localhost:8070/Governance/getId");
    response.then((result) => {
      // Access the value of the fulfilled Promise
      const x = result.data; // Assuming the fulfilled value is assigned to x
      console.log(x); // Do something with the value
      setGovernanceID(x);
    }).catch((error) => {
      // Handle any errors that occurred during the Promise execution
      console.log(error);
    });
  }, []);


  const handleSubmit = (e) => {
      const newGovernance={
        governanceID,
        governanceName,
        governancePwd,
        governanceDesignation,
        governanceMail,
        governancePhone
      }
      const addGovernance = axios.post("http://localhost:8070/Governance/add",newGovernance);
  };

  return (


    <Modal
      className="modal-dialog-centered modal-lg"
      size="sm"
      isOpen={isOpen}
      toggle={toggle}
      onSubmit={handleSubmit}
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
                    
                    <Input
                      className="form-control-alternative"
                      disabled
                      type="text"
                      placeholder={governanceID}
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
                      value={governancePwd}
                      onChange={(e) => setGovernancePwd(e.target.value)}
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
                      value={governanceName}
                      onChange={(e) => setGovernanceName(e.target.value)}
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
                      value={governanceMail}
                      onChange={(e) => setGovernanceMail(e.target.value)}
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
                      value={governanceDesignation}
                      onChange={(e) => setGovernanceDesignation(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Phone : </span>
                    <Input
                      className="form-control-alternative"
                      id="userPhone"
                      placeholder="Ex:+94778388021"
                      type="text"
                      value={governancePhone}
                      onChange={(e) => setGovernancePhone(e.target.value)}
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
