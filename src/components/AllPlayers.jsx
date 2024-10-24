import React, { useState, useEffect } from "react";
import fetchAllPlayers from "../API/index.js";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import SinglePlayer from "./SinglePlayer";

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [open, setOpen] = useState(false);
  const [removed, setRemoved] = useState(false);

  // Fetch players from the API when the component loads
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPlayers = await fetchAllPlayers();
      setPlayers(fetchedPlayers);
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = (player) => {
    setSelectedPlayer(player);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedPlayer(null);
  };

  const removePlayer = (player) => {
    setSelectedPlayer(player);
    setRemoved(true);
  };

  // Filter players based on search term
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Puppy Bowl!!
      </Typography>
      {/* Form for Adding Players */}
      <Box mb={4}>
        <TextField label="Player Name" variant="outlined" sx={{ mr: 2 }} />
        <TextField label="Player Breed" variant="outlined" sx={{ mr: 2 }} />
        <TextField label="Player Image URL" variant="outlined" sx={{ mr: 2 }} />
        <Button variant="contained" color="info">Submit</Button>
      </Box>
      <TextField
        label="Search Players"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 4 }}
      />

      {/* Players Grid */}
      <Grid container spacing={3}>
        {filteredPlayers.map((player) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{player.name}</Typography>
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  style={{ width: "100%", height: "auto" }}
                />
                <Typography variant="subtitle1">{player.breed}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removePlayer(player)}
                >
                  Remove Player
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleOpenModal(player)}
                >
                  View Player Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Single Player Modal */}
      {selectedPlayer && (
        <SinglePlayer
          open={open}
          handleClose={handleCloseModal}
          player={selectedPlayer}
        />
      )}
    </Container>
  );
};

export default AllPlayers;
