import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardTitle, Container, Row, Col, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Datepicker from '../../assets/Datepicker.js';
import CreateRGSModal from 'components/Modals/CreateRGSModal';

const RGSHeader = ({ handleDepartmentChange, departmentCode,  }) => {
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

  const handleDateChange = (date) => {
    setRGSDate(date);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup className="d-flex align-items-center">
                        <span className="text-nowrap mr-2">Select Date:</span>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Datepicker onDateChange={handleDateChange} selectedDate={rgsDate} />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup className="d-flex align-items-center">
                        <span className="text-nowrap">Department:</span>
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
                  <Row>
                    <Col md="3">
                      <FormGroup className="d-flex align-items-center">
                        <Button color="primary" type="button" onClick={openModal}>
                          <i className="ni ni-fat-add mr-2"></i>
                          Create RGS
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
      <CreateRGSModal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)} />
    </>
  );
};

export default RGSHeader;
