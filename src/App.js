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


  const uniqueArray = [...new Set(activeSubmember)]

console.log(uniqueArray)

  // const handleClick = (id, submember = []) => {
  //   if (submember.some(item => activeSubmember.includes(item?.id))) {
  //     for (let i = activeSubmember.length - 1; i >= 0; i--) {
  //       if (submember.some(item => item.id === activeSubmember[i])) {
  //         activeSubmember.splice(i, 1);
  //       }
  //     }
  //   } else {
  //     const uniqSubId = submember.map((a) => a?.id);
  //     if (activeSubmember.length >4) {
  //       // Remove the oldest member
  //       activeSubmember.shift();
  //     }
  //     setActiveSubmember([...activeSubmember, ...uniqSubId]);
  //   }
  // };


  // const handleClick = (id, submember = []) => {
  //   const uniqSubId = submember.map((a) => a?.id);
  
  //   // Check if adding this submember would exceed the limit of 4
  //   if (activeSubmember.length  <= 4) {
  //     // Add the new submember
  //     setActiveSubmember([...activeSubmember, ...uniqSubId]);
  //   } else {
  //     // Calculate how many members need to be removed to make space for the new submember
  //     const removeCount = activeSubmember.length + uniqSubId.length - 4;
  
  //     // Remove the oldest members to make space for the new submember
  //     setActiveSubmember((prevActiveSubmember) =>
  //       prevActiveSubmember.slice(removeCount).concat(uniqSubId)
  //     );
  //   }
  // };
  
  
  const handleClick = (id, submember = []) => {
    const uniqSubId = submember.map((a) => a?.id);
  
    // Calculate how many members can be added without exceeding the limit
    const spaceLeft = 4 - activeSubmember.length;
  
    if (uniqSubId.length <= spaceLeft) {
      // Add all the new submembers because there's enough space
      setActiveSubmember([...activeSubmember, ...uniqSubId]);
    } else {
      // Add as many new submembers as there is space
      const newSubmembers = uniqSubId.slice(0, spaceLeft);
  
      // Calculate how many old submembers need to be removed
      const removeCount = uniqSubId.length - spaceLeft;
  
      // Remove the oldest submembers and add the new ones
      setActiveSubmember((prevActiveSubmember) =>
        prevActiveSubmember.slice(removeCount).concat(newSubmembers)
      );
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
          {uniqueArray.map((ele, index) => {

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
