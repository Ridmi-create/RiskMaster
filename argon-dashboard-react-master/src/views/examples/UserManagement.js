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
import UserManagementHeader from "components/Headers/UserManagementHeader.js";
import EditUserModal from "components/Modals/EditUserModal.js";




const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [riskOwners, setRiskOwners] = useState([]);
  const [userType, setUserType] = useState([]);
  const [riskGovernance, setRiskGovernance] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedPwd, setSelectedPwd] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedMail, setSelectedMail] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);



  const toggleModal = (id, name, password,mail,phone,code,designation) => {
    setSelectedID(id);
    setSelectedName(name);
    setSelectedPwd(password);
    setSelectedMail(mail);
    setSelectedPhone(phone);
    setSelectedCode(code);
    setSelectedDesignation(designation);
    console.log(selectedID);
    //<EditUserModal isOpen={isModalOpen} toggle={toggleModal} selectedID={selectedID} />
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


      <UserManagementHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Users</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">UserID</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Type</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {riskOwners.map((riskOwner) => (
                    <tr key={riskOwner.riskOwnerID}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={riskOwner.riskOwnerPic}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">{riskOwner.riskOwnerName}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{riskOwner.riskOwnerID}</td>
                      <td>{riskOwner.riskOwnerMail}</td>
                      <td>Risk Owner</td>
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
                            <DropdownItem href="#pablo" onClick={() => toggleModal(
                              riskOwner.riskOwnerID,
                              riskOwner.riskOwnerName,
                              riskOwner.riskOwnerPwd,
                              riskOwner.riskOwnerMail,
                              riskOwner.riskOwnerPhone,
                              riskOwner.departmentCode,
                              riskOwner.riskOwnerDesignation)}>
                              Edit User 
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Delete User
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                  {/*Show Governance*/}
                  {riskGovernance.map((riskGovernance) => (
                    <tr key={riskGovernance.governanceID}>
                      <th scope="row">
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
                          <Media>
                            <span className="mb-0 text-sm">{riskGovernance.governanceName}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{riskGovernance.governanceID}</td>
                      <td>{riskGovernance.governanceMail}</td>
                      <td>Governance</td>
                      <td>{riskGovernance.governancePhone}</td>
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
                              Edit User
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                              Delete User
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}

                </tbody>
                {isModalOpen && (
                  <EditUserModal isOpen={isModalOpen} toggle={toggleModal} />
                )}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      {isModalOpen && (
        <EditUserModal
          isOpen={isModalOpen}
          toggle={toggleModal}
          selectedID={selectedID}
          selectedPwd={selectedPwd}
          selectedName={selectedName}
          selectedMail={selectedMail}
          selectedPhone={selectedPhone}
          selectedCode={selectedCode}
          selectedDesignation={selectedDesignation}
          toggleModal={toggleModal} 
        />
      )}
    </>
  );

};


export default UserManagement;