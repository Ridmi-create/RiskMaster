import React, { useState,useEffect } from "react";
import Datepicker from "../../assets/Datepicker.js";
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
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

const AddNewRiskModal = ({ isOpen, toggle }) => {
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

  const [reportedDate, setReportedDate] = useState(null);

  const handleDateChange = (date) => {
    setReportedDate(date);
  };

  const [estimatedEndDate, setEstimatedEndDate] = useState(null);

  const handleEstimatedEndDateChange = (date) => {
    setEstimatedEndDate(date);
  };

  const [selectedStatus, setSelectedStatus] = useState("");

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
              <bold>Add Risk</bold>
            </div>

          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Risk Code: </span>
                    <div className="d-flex flex-grow-1">
                    <Button className="mr-2" color="primary" type="submit" style={{ width: "150px" }}>Get Code</Button>
                    <Input
                      className="form-control-alternative"
                      disabled
                      type="text"
                      placeholder="riskCode"
                    />
                  </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Project/Function: </span>
                    <Input
                      className="form-control-alternative"
                      id="userPwd"
                      placeholder="Eg : Web App"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="12">
                <FormGroup>
                    <span className="text-nowrap">Specific Risk:</span>
                    <Input
                    className="form-control-alternative"
                    id="longTextArea"
                    type="textarea"
                    rows={4}
                    placeholder="Define the Risk here.. Eg : Resource Unavailability"
                    />
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="6">
                <FormGroup>
                    <span className="text-nowrap">Risk Reported Date:</span>
                    <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Datepicker onDateChange={handleDateChange} />
                    </InputGroup>
                </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">KPI/KRI: </span>
                    <Input
                      className="form-control-alternative"
                      id="userPwd"
                      placeholder="Eg : On Time Delivery"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="4">
                  <FormGroup>
                  <span className="text-nowrap">Impact: </span>
                  <Input className="form-control-alternative" type="select">
                        <option value="">Select Value</option>
                        <option value="department1">1 : </option>
                        <option value="department2">2 : </option>
                        <option value="department3">3 : </option>
                        <option value="department3">4 : </option>
                  </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <span className="text-nowrap">Likelihood: </span>
                    <Input className="form-control-alternative" type="select">
                        <option value="">Select Value</option>
                        <option value="department1">1 : </option>
                        <option value="department2">2 : </option>
                        <option value="department3">3 : </option>
                        <option value="department3">4 : </option>
                  </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <span className="text-nowrap">RiskRating: </span>
                    <Input
                      className="form-control-alternative"
                      disabled
                      id="userPwd"
                      placeholder="16"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="12">
                <FormGroup>
                    <span className="text-nowrap">Action Plan:</span>
                    <Input
                    className="form-control-alternative"
                    id="longTextArea"
                    type="textarea"
                    rows={4}
                    placeholder="Define mitigation action plan here.. Eg : Plan discussion with team"
                    />
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="6">
                <FormGroup>
                    <span className="text-nowrap">Estimated End Date:</span>
                    <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Datepicker onDateChange={handleEstimatedEndDateChange} />
                    </InputGroup>
                </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Status: </span>
                    <Input className={`form-control-alternative ${
                        selectedStatus === "completed"
                          ? "bg-green"
                          : selectedStatus === "wip"
                          ? "bg-yellow"
                          : ""
                      }`} type="select" 
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="completed">Completed </option>
                        <option value="wip">WIP</option>
                  </Input>
                  </FormGroup>
                </Col>
                </Row>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Save Risk
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default AddNewRiskModal;
