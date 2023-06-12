import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import AddNewRiskModal from "components/Modals/AddNewRiskModal";


const MyRisksHeader = () => {
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
                      Add New Risk
                    </Button>
                    </div>
                    </div>
                    </Row>
            {/* Card stats*/} 
                <Card className="card-stats mb-4 mb-xl-0">
                <CardTitle className="mb-0" style={{ paddingTop: '1.5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                    Filter by :
                </CardTitle>
                  <CardBody>
                    <Form>
                    <Row>
                        <Col md="3">
                        <FormGroup className="d-flex align-items-center">
                        <span className="text-nowrap mr-2">Status :</span>
                        <Input className="form-control-alternative" type="select">
                            <option selected >All Risks</option>
                            <option value="riskOwner" >Completed Risks</option>
                            <option value="governance">WIP Risks</option>
                        </Input>
                        </FormGroup>
                        </Col>
                      
                        
                    </Row>
                    <Row className="justify-content-end">
                        <Col md="2">
          <FormGroup >
            <Button color="primary" type="button">
              Search by Filters
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
      <AddNewRiskModal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)} />
    </>
  );
};

export default MyRisksHeader;
