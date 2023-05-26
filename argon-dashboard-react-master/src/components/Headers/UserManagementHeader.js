import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import AddNewUserModal from "components/Modals/AddNewUserModal.js";
import AddNewGovernanceModal from "components/Modals/AddNewGovernanceModal.js";


const UserManagementHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGovernanceModalOpen, setIsGovernanceModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };
    const openGovernanceModal = () => {
      setIsGovernanceModalOpen(true);
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
                      Add New Risk Owner
                    </Button>
                    <Button className="my-4" color="primary" type="submit" onClick={openGovernanceModal}><i className="fas fa-user-plus" style={{ marginRight: "0.5rem" }} />
                      Add New Governance
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
                        <Input className="form-control-alternative" type="select">
                            <option selected >Select User Type</option>
                            <option value="riskOwner" >Risk Owner</option>
                            <option value="governance">Governance</option>
                        </Input>
                        </FormGroup>
                        </Col>
                        <Col md="2">
                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-4">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="form-control-alternative"
                                placeholder="User ID"
                                type="text"
                            />
                            </InputGroup>
                        </FormGroup>
                        </Col>
                        <Col md="4">
                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-4">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="form-control-alternative"
                                placeholder="User Name"
                                type="text"
                            />
                            </InputGroup>
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
      <AddNewUserModal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)} />
      <AddNewGovernanceModal isOpen={isGovernanceModalOpen} toggle={() => setIsGovernanceModalOpen(false)}/>
    </>
  );
};

export default UserManagementHeader;
