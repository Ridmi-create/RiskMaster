import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
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
} from 'reactstrap';
import RGSHeader from 'components/Headers/RGSHeader';
import EditRiskModal from 'components/Modals/EditRiskModal';

const RGSs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [risks, setRisks] = useState([]);
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const history = useHistory();
  const location = useLocation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchRisks = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Risk/getD/${departmentCode}`);
        const { data } = response;
        setRisks(data);
      } catch (error) {
        console.error('Error fetching risks', error);
      }
    };

    fetchRisks();
  }, [departmentCode]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const departmentCode = params.get('departmentCode');
    const departmentName = params.get('departmentName');
    setDepartmentCode(departmentCode);
    setDepartmentName(departmentName);
  }, [location.search]);

  const handleDepartmentChange = (e) => {
    const selectedDepartmentCode = e.target.value;
    /*const selectedDepartment = departmentName.find(
      (department) => department.departmentCode === selectedDepartmentCode
    );*/
    //const departmentName = selectedDepartment ? selectedDepartment.departmentName : '';
    setDepartmentCode(selectedDepartmentCode);
    //setDepartmentName(departmentName);
    history.push(`/governance/RGS?departmentCode=${selectedDepartmentCode}`);
  };

  return (
    <>
      <RGSHeader handleDepartmentChange={handleDepartmentChange} departmentCode={departmentCode} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Risks</h3>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Specific Risk</th>
                    <th scope="col">KPI/KRI</th>
                    <th scope="col">Risk Rating</th>
                    <th scope="col">Action Plan</th>
                    <th scope="col">Timeline</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {risks.map((risk) => (
                    <tr key={risk.specificRisk}>
                      <td>{risk.specificRisk}</td>
                      <td>{risk.KpiKri}</td>
                      <td>{risk.riskRating}</td>
                      <td>Plan Discussions</td>
                      <td>2023/07/09</td>
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
                {isModalOpen && <EditRiskModal isOpen={isModalOpen} toggle={toggleModal} />}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RGSs;
