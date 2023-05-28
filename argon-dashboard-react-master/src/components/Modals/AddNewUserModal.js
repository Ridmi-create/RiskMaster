import React, { useState, useEffect } from "react";
import axios from "axios";
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

const AddNewUserModal = ({ isOpen, toggle }) => {
  const userType = "Risk Owner"
  const [riskOwnerID, setUserID] = useState("");
  const [riskOwnerName, setUserName] = useState("");
  const [riskOwnerPwd, setUserPwd] = useState("");
  const [riskOwnerDesignation, setUserDesignation] = useState("");
  const [riskOwnerMail, setUserMail] = useState("");
  const [riskOwnerPhone, setUserPhone] = useState("");
  const [departmentNames, setDepartmentNames] = useState([]);
  const [departmentCode, setSelectedDepartment] = useState('');

  useEffect(() => {
    const response = axios.get("http://localhost:8070/RiskOwner/getId");
    response.then((result) => {
      // Access the value of the fulfilled Promise
      const x = result.data; // Assuming the fulfilled value is assigned to x
      console.log(x); // Do something with the value
      setUserID(x);
    }).catch((error) => {
      // Handle any errors that occurred during the Promise execution
      console.log(error);
    });

    const fetchDepartments = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get('http://localhost:8070/Department/names');

        // Extract the department names from the response
        const { data } = response;
        setDepartmentNames(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();

  }, []);


  const handleSubmit = (e) => {
    const newRiskOwner = {
      riskOwnerID,
      riskOwnerName,
      riskOwnerPwd,
      riskOwnerDesignation,
      riskOwnerMail,
      riskOwnerPhone,
      departmentCode
    };
    const addRiskOwner = axios.post("http://localhost:8070/RiskOwner/add",newRiskOwner);
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
              <bold>Add Risk Owner</bold>
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
                        placeholder={riskOwnerID}
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
                      value={riskOwnerPwd}
                      onChange={(e) => setUserPwd(e.target.value)}
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
                      value={riskOwnerName}
                      onChange={(e) => setUserName(e.target.value)}
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
                      value={riskOwnerMail}
                      onChange={(e) => setUserMail(e.target.value)}
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
                      value={riskOwnerDesignation}
                      onChange={(e) => setUserDesignation(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Department : </span>
                    <Input className="form-control-alternative" type="select" value={departmentNames.departmentCode} onChange={(e) => setSelectedDepartment(e.target.value)}>
                      <option value="">Select Department</option>
                      {departmentNames.map((departmentName) => (
                        <option key={departmentName.departmentCode} value={departmentName.departmentCode}>
                          {departmentName.departmentName}
                        </option>
                      ))}
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
                      value={riskOwnerPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
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

export default AddNewUserModal;
