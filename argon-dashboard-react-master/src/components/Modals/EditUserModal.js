import React, { useState } from "react";
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
} from "reactstrap";

const EditUserModal = ({ isOpen, toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for submitting the form
    console.log("Email:", email);
    console.log("Password:", password);
    // Reset the form fields
    setEmail("");
    setPassword("");
    // Close the modal
    toggle();
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
            <bold>Edit User</bold>
            </div>
            <div>
            <Card className="card-stats mb-4 mb-lg-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle className="text-muted mb-0">
                    UserID :
                  </CardTitle>
                  <span className="h3 font-weight-bold mb-0">Deshan Karunarathne</span>
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
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-nowrap">User Type : </span>
              </p>
            </CardBody>
            </Card>
            </div>
        </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
          <Form>
          <Row>
            <Col md="6">
              <FormGroup>
              <span className="text-nowrap">E-mail : </span>
                <Input
                  className="form-control-alternative"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
              <span className="text-nowrap">Phone : </span>
                <Input
                  className="form-control-alternative"
                  id="exampleFormControlInput2"
                  placeholder="+94778388021"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
              <span className="text-nowrap">Department : </span>
              <Input className="form-control-alternative" type="select">
                <option value="">Select Department</option>
                <option value="department1">Department 1</option>
                <option value="department2">Department 2</option>
                <option value="department3">Department 3</option>
              </Input>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
              <span className="text-nowrap">Designation : </span>
                <Input
                  className="form-control-alternative"
                  id="exampleFormControlInput2"
                  placeholder="+94778388021"
                  type="text"
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
