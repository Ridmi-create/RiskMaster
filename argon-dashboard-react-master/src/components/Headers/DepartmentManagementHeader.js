import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import AddNewDepartmentModal from "components/Modals/AddNewDepartmentModal.js";


const DepartmentManagementHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
       <Container fluid>
          <div className="header-body">
          <Row>
                      <div className="col">
                      <div>
                    <Button className="my-4" color="primary" type="submit" onClick={openModal}><i className="fas fa-user-plus" style={{ marginRight: "0.5rem" }} />
                      Add New Department
                    </Button>
                    </div>
                    </div>
                    </Row>
            {/* Card stats*/} 
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Form>
                    <Row>
                        <Col md="4">
                        <FormGroup className="d-flex align-items-center">
                        <span className="text-nowrap mr-2">Search by : </span>
                        <Input
                                className="form-control-alternative"
                                placeholder="Department ID"
                                type="text"
                            />
                        </FormGroup>
                        </Col>
                      
                        <Col md="4">
                        <FormGroup>                           
                            <Input
                                className="form-control-alternative"
                                placeholder="Department Name"
                                type="text"
                            />
                        </FormGroup>
                        </Col>
                        <Col md="2">
                        <FormGroup className="d-flex align-items-center">
                            <Button color="primary" type="button">
                            Search
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
      <AddNewDepartmentModal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)} />
    </>
  );
};

export default DepartmentManagementHeader;
