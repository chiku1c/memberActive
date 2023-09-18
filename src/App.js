import { useState } from 'react';
import './App.css';
import { Button, Grid } from '@mui/material';

function App() {
  const [activeSubmember, setActiveSubmember] = useState([]);
  console.log(activeSubmember)
  const [activeMemberId, setActiveMemberId] = useState(1); // Initialize active member to 1

  const member = [
    { id: 1, key: "A", submember: [{ id: 4, key: "4" }, { id: 5, key: "5" }] },
    { id: 2, key: "B", submember: [{ id: 5, key: "5" }, { id: 6, key: "6" }] },
    { id: 3, key: "C", submember: [{ id: 6, key: "6" }, { id: 7, key: "7" }] }
  ];

console.log(activeSubmember)

  const uniqueArray = [...new Set(activeSubmember)]



  const handleClick = (id, submember = []) => {
    if (submember.some(item => activeSubmember.includes(item?.id))) {
      for (let i = activeSubmember.length - 1; i >= 0; i--) {
        if (submember.includes(activeSubmember[i])) {
          activeSubmember.splice(i, 1);
        }
      }
    } else {
      const uniqSubId = submember.map((a) => a?.id);
      // setActiveMemberId(id + 1); // Allow the user to click the next member
      setActiveSubmember([...activeSubmember, ...uniqSubId]);
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
              // disabled={id !== 1 && id === 2 || id === 3}
              >
                {key}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <div>
        <Grid container>
          {activeSubmember.map((ele, index) => {

            return (
              <Grid item xs={2} key={index}>
                <Button
                  // onClick={() => handleClick(id, submember)}
                  variant="contained"
                // disabled={(id !== activeMemberId && !isSubmemberActive(key)) || (id === 1 && activeMemberId !== 1)}
                >
                  {ele}
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
