import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Datepicker from "../../assets/Datepicker.js";

const ReportsHeader = () => {

  const [rgsDate, setRGSDate] = useState(null);

  const handleDateChange = (date) => {
    setRGSDate(date);
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
                        <Datepicker onDateChange={handleDateChange} />
                    </InputGroup>
                        </FormGroup>
                        </Col>
                    
                        <Col md="2">
                        <FormGroup className="d-flex align-items-center">
                            <Button color="primary" type="button">
                            Show RGS
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

    </>
  );
};

export default ReportsHeader;