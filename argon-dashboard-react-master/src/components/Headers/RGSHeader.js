import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Datepicker from "../../assets/Datepicker.js";
import CreateRGSModal from "components/Modals/CreateRGSModal";

const RGSHeader = () => {
    const currentDate = new Date().toISOString().slice(0, 10);

  const [rgsDate, setRGSDate] = useState(currentDate);

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
            {/* Card stats*/} 
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Form>
                    <Row>
                        <Col md="4">
                        <FormGroup className="d-flex align-items-center">
                        <span className="text-nowrap mr-2">Select Date :</span>
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
                        <FormGroup  className="d-flex align-items-center">
                            <span className="text-nowrap">Department : </span>
                            <Input className="form-control-alternative" type="select">
                            <option value="">Select Department</option>
                            <option value="department1">Department 1</option>
                            <option value="department2">Department 2</option>
                            <option value="department3">Department 3</option>
                            </Input>
                        </FormGroup>
                        </Col>
                    
                        <Col md="2">
                        <FormGroup className="d-flex align-items-center">
                            <Button color="primary" type="button">
                            Show Risks
                            </Button>
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