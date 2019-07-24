import React from 'react';
import './App.css';
import DriverAdmin from './views/admin/drivers/DriverAdmin';
import Container from '@material-ui/core/Container';

function App() {
  return (
      <Container fixed>
        <DriverAdmin />
      </Container>
  );
}

export default App;
