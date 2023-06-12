import React, { useState,useEffect,useContext } from "react";
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
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { LoginDataContext } from "views/examples/LoginDataContext.js";

const AddNewRiskModal = ({ isOpen, toggle }) => {
  const [riskCode, setRiskCode] = useState("");
  const [project, setProject] = useState("");
  const [specificRisk, setSpecificRisk] = useState("");
  const [riskRating, setRiskRating] = useState("");
  const [reportedDate, setReportedDate] = useState("");
  const [estimatedEndDate, setEstimatedEndDate] = useState("");
  const [impact, setImpact] = useState("");
  const [likelihood, setLikelihood] = useState("");
  const [status, setStatus] = useState("");
  const [KpiKri, setKpiKri] = useState("");
  const [actionPlan, setActionPlan] = useState("");
  const { loginData } = useContext(LoginDataContext);
  const [riskOwnerID, setRiskOwnerID] = useState(loginData.userID);
  const [departmentCode, setDepartmentCode] = useState(loginData.departmentCode);
  
    useEffect(() => {
      const response = axios.get("http://localhost:8070/Risk/getId");
      response.then((result) => {
        // Access the value of the fulfilled Promise
        const x = result.data; // Assuming the fulfilled value is assigned to x
        console.log(x); // Do something with the value
        setRiskCode(x);
      }).catch((error) => {
        // Handle any errors that occurred during the Promise execution
        console.log(error);
      });
    }, []);



  const handleSubmit = (e) => {
    const newRisk={
        riskCode,
        project,
        specificRisk,
        riskRating,
        impact,
        likelihood,
        reportedDate,
        status,
        KpiKri,
        actionPlan,
        estimatedEndDate,
        riskOwnerID,
        departmentCode
    }
    const addRisk = axios.post("http://localhost:8070/Risk/add",newRisk);
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
                    <Input
                      className="form-control-alternative"
                      disabled
                      type="text"
                      placeholder={riskCode}
                    />
                  </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Project/Function: </span>
                    <Input
                      className="form-control-alternative"
                      id="project"
                      placeholder="Eg : Web App"
                      type="text"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
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
                    id="specificRisk"
                    type="textarea"
                    rows={3}
                    placeholder="Define the Risk here.. Eg : Resource Unavailability"
                    value={specificRisk}
                    onChange={(e) => setSpecificRisk(e.target.value)}
                    />
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="6">
                <FormGroup>
                  <span className="text-nowrap">Risk Reported Date:</span>
                    <Input
                    className="form-control-alternative"
                    id="reportedDate"
                    type="text"
                    placeholder="Ex : 2023/05/15"
                    value={reportedDate}
                    onChange={(e) => setReportedDate(e.target.value)}
                    />
                </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">KPI/KRI: </span>
                    <Input
                      className="form-control-alternative"
                      id="KpiKri"
                      placeholder="Eg : On Time Delivery"
                      type="text"
                      value={KpiKri}
                      onChange={(e) => setKpiKri(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="4">
                  <FormGroup>
                  <span className="text-nowrap">Impact: </span>
                    <Input
                      className="form-control-alternative"
                      id="impact"
                      placeholder="Ex : 1"
                      type="text"
                      value={impact}
                      onChange={(e) => setImpact(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                  <span className="text-nowrap">Likelihood: </span>
                    <Input
                      className="form-control-alternative"
                      id="likelihood"
                      placeholder="Ex : 2"
                      type="text"
                      value={likelihood}
                      onChange={(e) => setLikelihood(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                  <span className="text-nowrap">Risk Rating : </span>
                    <Input
                      className="form-control-alternative"
                      id="riskRating"
                      placeholder="Impact*Likelihood"
                      type="text"
                      value={riskRating}
                      onChange={(e) => setRiskRating(e.target.value)}
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
                    id="actionPlan"
                    type="textarea"
                    rows={3}
                    placeholder="Define mitigation action plan here.. Eg : Plan discussion with team"
                    value={actionPlan}
                    onChange={(e) => setActionPlan(e.target.value)}
                    />
                </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="6">
                <FormGroup>
                  <span className="text-nowrap">Estimated End Date:</span>
                    <Input
                    className="form-control-alternative"
                    id="estimatedEndDate"
                    type="text"
                    placeholder="Ex : 2023/05/15"
                    value={estimatedEndDate}
                    onChange={(e) => setEstimatedEndDate(e.target.value)}
                    />
                </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Status: </span>
                    <Input className={`form-control-alternative ${
                        status === "completed"
                          ? "bg-green"
                          : status === "wip"
                          ? "bg-yellow"
                          : ""
                      }`} type="select" 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}>
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
