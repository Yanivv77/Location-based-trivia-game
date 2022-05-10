import React, { useEffect, useState, useContext } from "react";
import { Grid, Button, Typography, Box, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { WebSocketContext } from "../components/Websocket/WebSocket";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const WaitingRoomScreen = () => {
  const params = useParams();
  //   const { t } = useTranslation(["Waitingroom"]);
  console.log(params);

  const [users, setUsers] = useState([
    { id: 22, name: "John" },
    { id: 23, name: "David" },

    { id: 24, name: "Miri" },
  ]);
  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState("");

  const invitedPlayers = useSelector((state) => state.quiz.quizPlayers);
  const ws = useContext(WebSocketContext);

  const navigate = useNavigate();

  const delay = (timer, callback) => {
    setTimeout(() => callback(), timer);
  };
  const handleClick = (name) => setName(name);

  //   const handleExitGame = () => {
  //     dispatch(resetState());
  //     navigate("/profile");
  //   };

  const handleJoin = () => {
    const config = { room: params.id, name: name };
    ws.joinGame(config);
  };

  useEffect(() => {
    console.log(ws.socket.current);
    if (ws.socket.current) {
      console.log(ws.socket.current.connected);
      ws.socket.current?.on("gameStarted", () => {
        setGameStarted(true);
      });
    }
  }, [ws]);
  useEffect(() => {
    if (gameStarted) {
      navigate(`/loadinggame/${params.id}`);
    }
  }, [gameStarted]);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {users.map((user) => (
          <Grid key={user.id} item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ borderRadius: 10, mt: 5 }}
              onClick={() => handleClick(user.name)}
            >
              {user.name}
            </Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ borderRadius: 10, mt: 5 }}
            onClick={handleJoin}
            disabled={name.length > 0 ? false : true}
          >
            Join Game
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ width: "60%", m: "30px auto" }}>
        <Stack spacing={2}>
          {invitedPlayers.map((player) => (
            <Item key={player.id}>{player.name} is online</Item>
          ))}
        </Stack>
      </Box>
    </>
  );
};
export default WaitingRoomScreen;
