import React, { useState, useEffect,useContext } from "react";

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
import MyRisksHeader from "components/Headers/MyRisksHeader.js";
import EditRiskModal from "components/Modals/EditRiskModal.js";
import { LoginDataContext } from "./LoginDataContext";




const MyRisks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [risks, setRisks] = useState([]);
  const { loginData } = useContext(LoginDataContext);
  const [riskOwnerID, setRiskOwnerID] = useState(loginData.userID);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  /*useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Decode the token to extract the riskOwnerID
    if (token) {
      const decodedToken = jwt.decode(token);
      const decodedRiskOwnerID = decodedToken?.riskOwnerID;

      // Set the riskOwnerID in the state
      setRiskOwnerID(decodedRiskOwnerID);
    }
  }, []);*/

  //Fetch Risk 
  useEffect(() => {
    console.log("came");
    console.log(riskOwnerID);
    const fetchRisks = async () => {
      try {
        const response = await fetch(`http://localhost:8070/Risk/getR/${riskOwnerID}`);

        const data = await response.json();
        setRisks(data);
      } catch (error) {
        console.error('Error fetching risk owners:', error);
      }
      

    };

    fetchRisks();
  }, []);

  return (
    <>
      <MyRisksHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">My Risks</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Risk Code</th>
                    <th scope="col">Project/Function</th>
                    <th scope="col">Specific Risk</th>
                    <th scope="col">Risk Rating</th>
                    <th scope="col">Timeline</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {risks.map((risk) => (
                    <tr key={risk.riskCode}>
                      <td>{risk.riskCode}</td>
                      <td>{risk.project}</td>
                      <td>{risk.specificRisk}</td>
                      <td>{risk.riskRating}</td>
                      <td>{risk.estimatedEndDate}</td>
                      <td>{risk.status}</td>
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
                              Show More / Update
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Delete Risk
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}

                </tbody>
                {isModalOpen && (
                  <EditRiskModal isOpen={isModalOpen} toggle={toggleModal} />
                )}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );

};


export default MyRisks;