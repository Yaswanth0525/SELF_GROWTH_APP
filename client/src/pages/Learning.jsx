import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

// Import Views
import AptitudeView from '../components/learning/AptitudeView';
import DSAView from '../components/learning/DSAView';
import OOPSView from '../components/learning/OOPSView';
import OSView from '../components/learning/OSView';
import DBMSView from '../components/learning/DBMSView';
import CommunicationView from '../components/learning/CommunicationView';

const Learning = () => {
    const { subject } = useParams();

    // Route to specific completely tailored views based on URL
    switch (subject) {
        case 'aptitude':
            return <AptitudeView />;
        case 'dsa':
            return <DSAView />;
        case 'oops':
            return <OOPSView />;
        case 'os':
            return <OSView />;
        case 'dbms':
            return <DBMSView />;
        case 'communication':
            return <CommunicationView />;
        default:
            return <Navigate to="/" />; // Redirect if subject invalid
    }
};

export default Learning;
