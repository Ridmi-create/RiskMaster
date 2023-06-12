import React, { useState,useEffect } from "react";
import axios from "axios";
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
  Table,
} from "reactstrap";

const ReportsModal = ({ isOpen, toggle,selectedID,toggleModal }) => {
  const [rgsDate, setRGSDate] = useState("");
  const [idnRisk, setIdnRisk] = useState("");
  const [idnImpLike, setIdnImplike] = useState("");
  const [idnKpiKri, setIdnKpiKri] = useState("");
  const [mitigationTimeline, setMitigationTimeline] = useState("");
  const [rgsValue, setRGSValue] = useState("");
  const [remarks, setRemarks] = useState("");
  

  

  function getBackgroundColor(value) {
    if (value >= 4.25) {
      return 'green';
    } else if (value >= 3 && value < 4.25) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  //Fetch RGS
  useEffect(() => {
    const fetchRGS = async () => {
      try {
        const response = await fetch(`http://localhost:8070/RGS/get/${selectedID}`); // Replace '/api/riskOwners' with your actual API endpoint to fetch risk owners
        const data = await response.json();
        console.log(data);
        
        setRGSDate(data.rgsDate);
        setIdnRisk(data.idnRisk);
        setIdnImplike(data.idnImpLike);
        setIdnKpiKri(data.idnKpiKri);
        setMitigationTimeline(data.mitigationTimeline);
        setRGSValue(data.rgsValue);
        setRemarks(data.remarks);

      } catch (error) {
        console.error('Error fetching risk owners:', error);
      }
      //const rgsDate = RGSs.rgsDate;
      //console.log(rgsDate); // Output: John Doe

    };

    fetchRGS();
  }, []);

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
            <bold>RGS</bold>
            </div>
            <div>
            <Card className="card-stats mb-3 mb-lg-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle className="text-muted mb-0">
                    RGS Date : {rgsDate}
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">Risk Governance Score : {rgsValue}</span>
                </div>
              </Row>
            </CardBody>
            </Card>
            </div>
        </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
          <Row className="mt-3">
          <div className="col">
            <Card className=" shadow">
              <CardHeader className=" border-0">
                <h3 className="mb-0">RGS</h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Attributes</th>
                    <th scope="col">Weightage</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Actual Ranking</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                <th>Identifying Probabale Risks</th>
                <td className="text-center">20%</td>
                <td className="text-center">5</td>
                <td className="text-center">{idnRisk}</td>
                </tr>
                <tr>
                <th>Identification of Imp & Likelihood</th>
                <td className="text-center">10%</td>
                <td className="text-center">5</td>
                <td className="text-center">{idnImpLike}</td>
                </tr>
                <tr>
                <th>Identification of KPI & KRI</th>
                <td className="text-center">30%</td>
                <td className="text-center">5</td>
                <td className="text-center">{idnKpiKri}</td>
                </tr>
                <tr>
                <th>Appropriate mitigations & timeline</th>
                <td className="text-center">40%</td>
                <td className="text-center">5</td>
                <td className="text-center">{mitigationTimeline}</td>
                </tr>
                <tr>
                <th style={{ color: 'darkblue' }}><h4>Risk Governance Score</h4></th>
                <td></td>
                <td></td>
                <td className="text-center" style={{ backgroundColor: getBackgroundColor(rgsValue) }}><h4>{rgsValue}</h4></td>
                </tr>
                      
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <Form >
        <Row >
                <Col md="12">
                <FormGroup>
                    <span className="text-nowrap">Remarks</span>
                    <Input
                    className="form-control-alternative"
                    id="longTextArea"
                    type="textarea"
                    rows={2}
                    placeholder={remarks}
                    disabled
                    />
                </FormGroup>
                </Col>
                </Row>
                </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default ReportsModal;
