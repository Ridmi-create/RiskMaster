import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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

const CreateRGSModal = ({ handleDepartmentChange, departmentCode, isOpen, toggle }) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [rgsDate, setRGSDate] = useState(currentDate);

  const [departmentNames, setDepartmentNames] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Department/names');
        const { data } = response;
        setDepartmentNames(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDateChange = (date) => {
    
    const parts = String(date).split('/'); // Split the date string by '/'
    const reversedDate = parts.reverse().join('/');
    setRGSDate(reversedDate);
    console.log(rgsDate);

  };

  {/*Calculate RGS values */}
  const [iprValue, setIprValue] = useState('');
  const [iprResult, setIprResult] = useState('');

  const handleIprInputChange = (e) => {
    setIprValue(e.target.value);
  };

  const [iilValue, setIilValue] = useState('');
  const [iilResult, setIilResult] = useState('');

  const handleIilInputChange = (e) => {
    setIilValue(e.target.value);
  };

  const [ikkValue, setIkkValue] = useState('');
  const [ikkResult, setIkkResult] = useState('');

  const handleIkkInputChange = (e) => {
    setIkkValue(e.target.value);
  };

  const [amtValue, setAmtValue] = useState('');
  const [amtResult, setAmtResult] = useState('');

  const handleAmtInputChange = (e) => {
    setAmtValue(e.target.value);
  };

  const [rgsValue, setRgsValue] = useState('');

  const handleCalculate = () => {
    const iprMultipliedValue = parseInt(iprValue) * 20/100;
    const iilMultipliedValue = parseInt(iilValue) * 10/100;
    const ikkMultipliedValue = parseInt(ikkValue) * 30/100;
    const amtMultipliedValue = parseInt(amtValue) * 40/100;

    const rgsValue = iprMultipliedValue + iilMultipliedValue + ikkMultipliedValue + amtMultipliedValue;

    setIprResult(iprMultipliedValue);
    setIilResult(iilMultipliedValue);
    setIkkResult(ikkMultipliedValue);
    setAmtResult(amtMultipliedValue);

    setRgsValue(rgsValue);
    
  };

  

  

  function getBackgroundColor(value) {
    if (value >= 4.25) {
      return 'green';
    } else if (value >= 3 && value < 4.25) {
      return 'yellow';
    } else {
      return 'red';
    }
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
        <CardHeader className="bg-transparent pb-5">
            <div className="text-muted mt-2 mb-3">
            <bold>RGS</bold>
            </div>
            <div>
            <Card className="card-stats mb-3 mb-lg-0">
            <CardBody>
              <Form style={{ marginTop: '10px' }}> 
                <Row>
                    <Col md="12">
                      <FormGroup className="d-flex align-items-center">
                        <span className="text-nowrap" style={{ marginRight: '10px' }}>Date :</span>
                        <Input
                          className="form-control-alternative"
                          id="userPwd"
                          placeholder="2023/05/31"
                          type="text"
                          
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup className="d-flex align-items-center">
                        <span className="text-nowrap" style={{ marginRight: '10px' }}>Department :</span>
                        <Input
                          className="form-control-alternative"
                          type="select"
                          value={departmentCode}
                          onChange={handleDepartmentChange}
                        >
                          <option value="">Select Department</option>
                          {departmentNames.map((department) => (
                            <option key={department.departmentCode} value={department.departmentCode}>
                              {department.departmentName}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
              
                </Form>
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
                    <th scope="col">Weightage(%)</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Actual Ranking</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                <th>Identifying Probabale Risks</th>
                <td className="text-center">20</td>
                <td className="text-center"><input type="text" className="text-center" style={{ width: '50px' }} value={iprValue} onChange={handleIprInputChange}/></td>
                <td className="text-center">{iprResult}</td>
                </tr>
                
                <tr>
                <th>Identification of Imp & Likelihood</th>
                <td className="text-center">10</td>
                <td className="text-center"><input type="text" className="text-center" style={{ width: '50px' }} value={iilValue} onChange={handleIilInputChange} /></td>
                <td className="text-center">{iilResult}</td>
                </tr>
                <tr>
                <th>Identification of KPI & KRI</th>
                <td className="text-center">30</td>
                <td className="text-center"><input type="text" className="text-center" style={{ width: '50px' }} value={ikkValue} onChange={handleIkkInputChange}/></td>
                <td className="text-center">{ikkResult}</td>
                </tr>
                <tr>
                <th>Appropriate mitigations & timeline</th>
                <td className="text-center">40</td>
                <td className="text-center"><input type="text" className="text-center" style={{ width: '50px' }} value={amtValue} onChange={handleAmtInputChange}/></td>
                <td className="text-center">{amtResult}</td>
                </tr>
                <tr>
                <th style={{ color: 'darkblue' }}><h4>Risk Governance Score</h4></th>
                <td></td>
                <td></td>
                <td className="text-center" style={{ backgroundColor: getBackgroundColor(rgsValue) }}><h4>{rgsValue}</h4></td>
                </tr>
                <tr>
        <td colSpan="4" className="text-center">
          <button onClick={handleCalculate}>Calculate</button>
        </td>
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
                    placeholder="Ex : Timeline Exceeded"
                    />
                </FormGroup>
                </Col>
                </Row>
                </Form>
                <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Save RGS
                </Button>
              </div>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default CreateRGSModal;
