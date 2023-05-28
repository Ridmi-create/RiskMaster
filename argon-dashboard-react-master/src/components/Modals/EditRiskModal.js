import React, { useState } from "react";
import Datepicker from "../../assets/Datepicker.js";
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
  Media,
  Row,
  Col,
  CardTitle,
  Modal,
} from "reactstrap";

const EditRiskModal = ({ isOpen, toggle }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
   
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
        <CardHeader className="bg-transparent pb-5">
            <div className="text-muted mt-2 mb-3">
            <bold>Update Risk</bold>
            </div>
            <div>
            <Card className="card-stats mb-4 mb-lg-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle className="text-muted mb-0">
                    Risk Code :
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">Resource Unavailability</span>
                </div>
              </Row>
            </CardBody>
            </Card>
            </div>
        </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
          <Form>
          <Row>
            <Col md="6">
              <FormGroup>
              <span className="text-nowrap">Risk Code : </span>
                <Input
                  className="form-control-alternative"
                  disabled
                  id="exampleFormControlInput1"
                  placeholder="0001"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
              <span className="text-nowrap">Project/Function : </span>
                <Input
                  className="form-control-alternative"
                  id="exampleFormControlInput2"
                  placeholder="Web App"
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
                    placeholder="Resource Unavailability"
                    />
                </FormGroup>
                </Col>
                </Row>
          <Row>
            <Col md="6">
              <FormGroup>
              <span className="text-nowrap">Risk Reported Date : </span>
              <Input
                  className="form-control-alternative"
                  disabled
                  id="exampleFormControlInput1"
                  placeholder="05/05/2023"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
              <span className="text-nowrap">KPI/KRI : </span>
                <Input
                  className="form-control-alternative"
                  id="exampleFormControlInput2"
                  placeholder="OTD"
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
                  Update Risk
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default EditRiskModal;
