import '../App.css';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import BallotContractArtifact from '../artifacts/contracts/Ballot.sol/Ballot.json'

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
    const [proposals, setProposals] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [error] = useState(null);

    useEffect(() => {
        async function fetchContract() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(ContractAddress, BallotContractArtifact.abi, provider);
        
            try{
                const proposals = await contract.getAllProposals();
                setProposals(proposals);
                setIsDataFetched(true);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchContract();
    }, []);

    async function vote(proposal) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            console.log(signer);
            const contract = new ethers.Contract(ContractAddress, BallotContractArtifact.abi, signer);
            const res = await contract.vote(proposal);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    if (isDataFetched) {
        return (
            <div>
                { error && <Alert variant="danger">{error}</Alert> }
                <Stack gap={4}>
                    {
                        proposals.map((proposal, index) =>
                            <Card key={index} onClick={() => { vote(index) }}>
                                <Card.Body>
                                    <Card.Title>{proposal['name']}</Card.Title>
                                    <Card.Text>{Number(proposal['voteCount'])} votes</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                </Stack>
            </div>
        )
    }

    return (
        <div>
            Loading...
        </div>
    )
}

export default App;