import React, { useState,useEffect } from "react";
import axios from "axios";


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
} from "reactstrap";

const AddNewDepartmentModal = ({ isOpen, toggle }) => {
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  
  
  useEffect(() => {
    const response = axios.get("http://localhost:8070/Department/getId");
    response.then((result) => {
      // Access the value of the fulfilled Promise
      const x = result.data; // Assuming the fulfilled value is assigned to x
      console.log(x); // Do something with the value
      setDepartmentCode(x);
    }).catch((error) => {
      // Handle any errors that occurred during the Promise execution
      console.log(error);
    });
  }, []);


  const handleSubmit = (e) => {
    const newDepartment = {
      departmentCode,
      departmentName
    };

    const addRiskOwner = axios.post("http://localhost:8070/Department/add",newDepartment);
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
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted mt-2 mb-3">
              <bold>Add Department</bold>
            </div>

          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Department Code : </span>
                    <div className="d-flex flex-grow-1">
                    
                    <Input
                      className="form-control-alternative"
                      disabled
                      type="text"
                      placeholder={departmentCode}
                    />
                  </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <span className="text-nowrap">Department Name : </span>
                    <Input
                      className="form-control-alternative"
                      id="userPwd"
                      placeholder="IT"
                      type="text"
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                </Row>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Save Department
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default AddNewDepartmentModal;
