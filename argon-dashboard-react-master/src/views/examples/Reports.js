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
import ReportsHeader from "components/Headers/ReportsHeader.js";
import ReportsModal from "components/Modals/ReportsModal.js";



const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [riskOwners, setRiskOwners] = useState([]);
  const [userType, setUserType]=useState([]);
  const [riskGovernance, setRiskGovernance] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //Fetch Risk Ownwrs
  useEffect(() => {
    const fetchRiskOwners = async () => {
      try {
        const response = await fetch('http://localhost:8070/RiskOwner'); // Replace '/api/riskOwners' with your actual API endpoint to fetch risk owners
        const data = await response.json();
        setRiskOwners(data);
      } catch (error) {
        console.error('Error fetching risk owners:', error);
      }
      const riskOwnerName = riskOwners.riskOwnerName;
      console.log(riskOwnerName); // Output: John Doe

    };

    fetchRiskOwners();
  }, []);

  //Fetch Risk Governance
  useEffect(() => {
    const fetchRiskGovernance = async () => {
      try {
        const response = await fetch('http://localhost:8070/Governance'); // Replace '/api/riskOwners' with your actual API endpoint to fetch risk owners
        const data = await response.json();
        setRiskGovernance(data);
      } catch (error) {
        console.error('Error fetching risk owners:', error);
      }
    };

    fetchRiskGovernance();
  }, []); 


  return (
    <>
      <ReportsHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">RGS List</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RGS Date</th>
                    <th scope="col">RGS Score</th>
                    <th scope="col">Remarks</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {riskOwners.map((riskOwner) => (
                    <tr key={riskOwner.riskOwnerID}>
                      <td>{riskOwner.riskOwnerID}</td>
                      <td>{riskOwner.riskOwnerMail}</td>
                      <td>{riskOwner.riskOwnerPhone}</td>
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
                            <DropdownItem href="#pablo" onClick={toggleModal}>
                              Show Details
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}

                </tbody>
                {isModalOpen && (
                  <ReportsModal isOpen={isModalOpen} toggle={toggleModal} />
                )}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );

};


export default Reports;