import { useState, useEffect } from 'react';
import './App.css';
import { Button, Grid } from '@mui/material';

function App() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [submemberId, setSubmemberId] = useState([]);

  console.log(submemberId)
  const member = [
    { id: 1, key: "A", submember: [{ id: 4, key: "4" }, { id: 5, key: "5" }] },
    { id: 2, key: "B", submember: [{ id: 5, key: "5" }, { id: 6, key: "6" }] },
    { id: 3, key: "C", submember: [{ id: 6, key: "6" }, { id: 7, key: "7" }] }
  ];

  const handleClick = (id, submember) => {
    const isSelected = selectedIds.some((item) => item.id === id);

    if (isSelected) {
      if (submemberId.length !== 2) {
        setSelectedIds((prevSelectedIds) =>
          prevSelectedIds.filter((item) => item.id !== id)
        );
      }

    } else {
      setSelectedIds((prevSelectedIds) => [
        ...prevSelectedIds,
        { id, submember }
      ]);
    }
  };

  useEffect(() => {
    const updatedSubmemberId = [];
    selectedIds.forEach((ele) => {
      updatedSubmemberId.push(...ele.submember);
    });

    const uniqueSubmemberId = [];
    const uniqueIds = {};

    updatedSubmemberId.forEach((sub) => {
      if (!uniqueIds[sub.id]) {
        uniqueSubmemberId.push(sub);
        uniqueIds[sub.id] = true;
      }
    });

    setSubmemberId(uniqueSubmemberId);
  }, [selectedIds]);

  return (
    <div className="App">
      <Grid container spacing={2}>
        {member.map((ele, index) => {
          const { id, key, submember } = ele;
          const isSelected = selectedIds.some((item) => item.id === id);

          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Button
                onClick={() => handleClick(id, submember)}
                variant="contained"
                style={{
                  backgroundColor: isSelected ? 'green' : 'red',
                }}
              >
                {key}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      <div>
        {submemberId.map((sub, index) => (
          <Button key={index}>{sub.key}</Button>
        ))}
      </div>
    </div>
  );
}

export default App;
