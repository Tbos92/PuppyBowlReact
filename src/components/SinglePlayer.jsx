import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const SinglePlayer = ({ open, handleClose, player }) => {
  if (!player) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{player.name}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={player.imageUrl}
            alt={player.name}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Breed: {player.breed}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Status: {player.status}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Team ID: {player.teamId || "Free Agent"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SinglePlayer;
