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

const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2407-FTB-ET-WEB-PT/players`;

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerBreed, setPlayerBreed] = useState("");
  const [playerImageUrl, setPlayerImageUrl] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [open, setOpen] = useState(false);

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

  // Filter players based on search term
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove a player from page/API
  const removePlayer = async (playerToRemove) => {
    try {
      // API call to remove the player
      const response = await fetch(`${APIURL}/${playerToRemove.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove player from the server");
      }

      // Remove player from the state
      const updatedPlayers = players.filter(
        (player) => player.id !== playerToRemove.id
      );
      // Update state
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  // Add a new player to API
  const addPlayer = async (event) => {
    event.preventDefault();

    const newPlayer = {
      name: playerName,
      breed: playerBreed,
      imageUrl: playerImageUrl || "https://learndotresources.s3.amazonaws.com/workshop/60ad725bbe74cd0004a6cba0/puppybowl-default-dog.png",
    };

    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to add new player");
      }

      // After adding a player, re-fetch list of players
      const fetchedPlayers = await fetchAllPlayers();
      // Update players state
      setPlayers(fetchedPlayers);
      // Clear form inputs
      setPlayerName("");
      setPlayerBreed("");
      setPlayerImageUrl("");
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Puppy Bowl!!
      </Typography>
      {/* Form for Adding Players */}
      <form onSubmit={addPlayer}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <TextField
              label="Player Name"
              variant="outlined"
              fullWidth
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Player Breed"
              variant="outlined"
              fullWidth
              value={playerBreed}
              onChange={(e) => setPlayerBreed(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Player Image URL"
              variant="outlined"
              fullWidth
              value={playerImageUrl}
              onChange={(e) => setPlayerImageUrl(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" color="primary" type="submit" size="large">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Search Players */}
      <TextField
        label="Search Players"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ my: 2.5 }}
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
