// src/components/NetworkVisualizer.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNodeForm from './AddNodeForm';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';
import { getNodes, getEdges, addNode } from '../services/nodeService';
import { Container, Modal, Box, AppBar, Toolbar, Button, Typography } from '@mui/material';

const NetworkVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nodesData = await getNodes(token);
        const edgesData = await getEdges(token);

        // Format nodes and edges as before
        const formattedNodes = nodesData.map((node, index) => ({
          ...node,
          id: node._id || `node-${index}`,
          data: { label: node.label },
          position: node.position || { x: Math.random() * 300, y: Math.random() * 300 },
        }));

        const formattedEdges = edgesData.map((edge, index) => ({
          ...edge,
          id: edge._id || `edge-${index}`,
          source: edge.sourceId,
          target: edge.targetId,
        }));

        setNodes(formattedNodes);
        setEdges(formattedEdges);
      } catch (error) {
        console.error('Error fetching nodes or edges:', error);
      }
    };

    if (token) fetchData(); // Only fetch if token is available
    else navigate('/login'); // Redirect if no token

  }, [token, navigate]);

  const handleAddNode = async (newNode) => {
    try {
      const addedNode = await addNode(token, newNode); // Save node in backend
      setNodes((prevNodes) => [
        ...prevNodes,
        {
          ...addedNode,
          id: addedNode._id,
          position: { x: prevNodes.length * 100 + 100, y: 100 },
          data: { label: addedNode.label },
          type: 'default',
          draggable: true,
        },
      ]);
      setIsModalOpen(false); // Close modal after adding node
    } catch (error) {
      console.error('Error adding new node:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/login'); // Redirect to login
  };

  return (
    <Container maxWidth="lg" sx={{ height: '80vh', mt: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Network Visualizer</Typography>
          <Button color="inherit" onClick={() => setIsModalOpen(true)}>Add Node</Button>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <AddNodeForm onAddNode={handleAddNode} />
        </Box>
      </Modal>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </Container>
  );
};

export default NetworkVisualizer;
