import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Media,
  Row,
  Col,
  CardTitle,
  Modal,
} from "reactstrap";

const EditUserModal = ({ isOpen, toggle, selectedID, selectedName, selectedPwd, selectedMail, selectedPhone, selectedCode, selectedDesignation,toggleModal }) => {
  const [riskOwnerID, setRiskOwnerID] = useState("");
  const [riskOwnerName, setRiskOwnerName] = useState("");
  const [riskOwnerPwd, setRiskOwnerPwd] = useState("");
  const [riskOwnerDesignation, setRiskOwnerDesignation] = useState("");
  const [riskOwnerMail, setRiskOwnerMail] = useState("");
  const [riskOwnerPhone, setRiskOwnerPhone] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();

    const updateRiskOwner = {
      riskOwnerID: selectedID,
      riskOwnerName,
      riskOwnerPwd: selectedPwd,
      riskOwnerDesignation,
      riskOwnerMail,
      riskOwnerPhone,
      departmentCode: selectedCode
    };

    axios.put(`http://localhost:8070/RiskOwner/update/${selectedID}`, updateRiskOwner)
      .then((response) => {
        console.log(response.data);
        // Handle the successful update here
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
      });
    toggleModal(); // Close the modal
    toggle();
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
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted mt-2 mb-3">
              <bold>Edit User</bold>
            </div>
            <div>
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle className="text-muted mb-0">
                        User ID:{selectedID}
                      </CardTitle>
                      <span className="h3 font-weight-bold mb-0">{selectedName}</span>
                    </div>
                    <Col className="col-auto">
                      <div>
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/bootstrap.jpg")}
                            />
                          </a>
                        </Media>
                      </div>
                    </Col>
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
                    <span className="text-nowrap">Name : </span>
                    <Input
                      className="form-control-alternative"
                      id="exampleFormControlInput1"
                      placeholder={selectedName}
                      type="text"
                      value={riskOwnerName}
                      onChange={(e) => setRiskOwnerName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">E-mail : </span>
                    <Input
                      className="form-control-alternative"
                      id="exampleFormControlInput2"
                      placeholder={selectedMail}
                      type="email"
                      value={riskOwnerMail}
                      onChange={(e) => setRiskOwnerMail(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Phone : </span>
                    <Input
                      className="form-control-alternative"
                      id="exampleFormControlInput2"
                      placeholder={selectedPhone}
                      type="text"
                      value={riskOwnerPhone}
                      onChange={(e) => setRiskOwnerPhone(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Designation : </span>
                    <Input
                      className="form-control-alternative"
                      id="exampleFormControlInput2"
                      placeholder={selectedDesignation}
                      type="text"
                      value={riskOwnerDesignation}
                      onChange={(e) => setRiskOwnerDesignation(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default EditUserModal;
