import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BallotContractArtifact from '../artifacts/contracts/Ballot.sol/Ballot.json'
import { Dropdown } from 'react-bootstrap';


const ContractAddress = process.env.ADDRESS_CONTRZCT_BALLOT;
console.log(process.env.ADDRESS_CONTRZCT_BALLOT);

function App() {
    const [voterList, setVoterList] = useState([]);
    const [selectedVoter, setSelectedVoter] = useState('');
    useEffect(() => {
        async function fetchData() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contractInstance = new ethers.Contract(ContractAddress, BallotContractArtifact.abi, provider);
            const result = await contractInstance.getAllVoters();
            setVoterList(result);
        }

        fetchData();
    }, []);

    function handleSelect(eventKey) {
        setSelectedVoter(eventKey);
    }

    return (
        <div>
            <h2>Liste des votants</h2>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {selectedVoter !== '' ? selectedVoter : 'Liste des votants'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {voterList.map((voter, index) => (
                        <Dropdown.Item key={index} eventKey={voter}>
                            {voter}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default App;
