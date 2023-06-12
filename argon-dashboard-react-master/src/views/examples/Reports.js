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
  const [RGSs, setRGSs] = useState([]);
  const [selectedID, setSelectedID] = useState("");

  const toggleModal = (id) => {
    setSelectedID(id);
    setIsModalOpen(!isModalOpen);
  };

  //Fetch RGSs
  useEffect(() => {
    const fetchRGSs = async () => {
      try {
        const response = await fetch('http://localhost:8070/RGS'); // Replace '/api/riskOwners' with your actual API endpoint to fetch risk owners
        const data = await response.json();
        setRGSs(data);
      } catch (error) {
        console.error('Error fetching risk owners:', error);
      }
      const rgsDate = RGSs.rgsDate;
      console.log(rgsDate); // Output: John Doe

    };

    fetchRGSs();
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
                {RGSs.map((RGS) => (
                    <tr key={RGS.rgsID}>
                      <td>{RGS.rgsDate}</td>
                      <td>{RGS.rgsValue}</td>
                      <td>{RGS.remarks}</td>
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
                            <DropdownItem href="#pablo" onClick={() =>toggleModal(RGS.rgsID)}>
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
      {isModalOpen && (
      <ReportsModal
          isOpen={isModalOpen}
          toggle={toggleModal}
          selectedID={selectedID}
          toggleModal={toggleModal} 
        />
        )}
    </>
  );

};


export default Reports;