import { useState } from 'react';
import './App.css';
import { Button, Grid } from '@mui/material';

function App() {
  const [selectedIds, setSelectedIds] = useState([]);

  console.log(selectedIds)

  const unisubMemberId = [...new Set(selectedIds)]
  console.log(unisubMemberId)
  const member = [
    { id: 1, key: "A", submember: [{ id: 4, key: "4" }, { id: 5, key: "5" }] },
    { id: 2, key: "B", submember: [{ id: 5, key: "5" }, { id: 6, key: "6" }] },
    { id: 3, key: "C", submember: [{ id: 6, key: "6" }, { id: 7, key: "7" }] }
  ];

  const handleClick = (id, submember) => {
    const submemberId = submember.map((a) => a?.id)
    const allIdsIncluded = submemberId.every((element) => selectedIds.includes(element));

    console.log(allIdsIncluded)
    if (allIdsIncluded) {
      const updatedSelectedIds = selectedIds.filter((selectedId) => !submemberId.includes(selectedId));
      setSelectedIds(updatedSelectedIds);
    } else {
      if (!selectedIds.includes(id) && !submemberId.every((subId) => selectedIds.includes(subId))) {
        setSelectedIds([...selectedIds, ...submemberId]);
      }
    }
  };

  return (
    <div className='App'>
      <Grid container spacing={2}>
        {member.map((ele, index) => {
          const { id, key, submember } = ele;
          const isButtonSelected = selectedIds.some((selectedId) => submember.some((sub) => sub.id === selectedId));

          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Button
                onClick={() => handleClick(id, submember)}
                variant="contained"
                style={{ backgroundColor: isButtonSelected ? 'green' : 'red' }}
              >
                {key}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {
        unisubMemberId.map((ele) => {
          return (
            <Button>{ele}</Button>
          )
        })


      }




    </div>
  );
}

export default App;
