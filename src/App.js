import { useState } from 'react';
import './App.css';
import { Button, Grid } from '@mui/material';

function App() {
  const [activeSubmember, setActiveSubmember] = useState([]);
  const [activeMemberId, setActiveMemberId] = useState(1); // Initialize active member to 1

  const member = [
    { id: 1, key: "A", submember: [{ id: 4, key: "4" }, { id: 5, key: "5" }] },
    { id: 2, key: "B", submember: [{ id: 5, key: "5" }, { id: 6, key: "6" }] },
    { id: 3, key: "C", submember: [{ id: 6, key: "6" }, { id: 7, key: "7" }] }
  ];


  const uniqueIds = new Set();

  const uniqueArray = activeSubmember.filter(obj => {
    if (!uniqueIds.has(obj.id)) {
      uniqueIds.add(obj.id);
      return true;
    }
    return false;
  });
  



  const handleClick = (id, submember = []) => {
    if (activeMemberId === id || activeMemberId === id - 1) {
      setActiveMemberId(id + 1); // Allow the user to click the next member
      setActiveSubmember([...activeSubmember, ...submember]);
    }
  };

  // Function to check if a specific submember key exists in activeSubmember
  const isSubmemberActive = (key) => {
    return activeSubmember.some((sub) => sub.key === key);
  };

  return (
    <div className='App'>
      <Grid container spacing={2}>
        {member.map((ele, index) => {
          const { id, key, submember } = ele;

          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Button
                onClick={() => handleClick(id, submember)}
                variant="contained"
                disabled={(id !== activeMemberId && !isSubmemberActive(key)) || (id === 1 && activeMemberId !== 1)}
              >
                {key}
              </Button>
            </Grid>
          );
        })}
      </Grid>
<div>
      <Grid container>
        {uniqueArray.map((ele, index) => {
          const { id, key, } = ele;

          return (
            <Grid item xs={2}  key={index}>
              <Button
                // onClick={() => handleClick(id, submember)}
                variant="contained"
                disabled={(id !== activeMemberId && !isSubmemberActive(key)) || (id === 1 && activeMemberId !== 1)}
              >
                {key}
              </Button>
            </Grid>
          );
        })}
      </Grid>
</div>

    </div>
  );
}

export default App;
