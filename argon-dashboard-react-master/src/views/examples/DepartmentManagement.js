import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import DepartmentManagementHeader from "components/Headers/DepartmentManagementHeader.js";




const DepartmentManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //Fetch Risk Ownwrs
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:8070/Department'); // Replace '/api/riskOwners' with your actual API endpoint to fetch risk owners
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching Departments:', error);
      }

    };

    fetchDepartments();
  }, []);


  return (
    <>
      <DepartmentManagementHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Departments</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Department Code</th>
                    <th scope="col">Department</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department) => (
                    <tr key={department.departmentCode}>
                      <th scope="row">                       
                            <span className="mb-0 text-sm">{department.departmentCode}</span>
                      </th>

                      <td>{department.departmentName}</td>
                      
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Delete Department
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                

                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );

};


export default DepartmentManagement;