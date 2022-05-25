import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box, Slider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MultiUsers from "../Game/MultiUsers";
import { useDispatch, useSelector } from "react-redux";
import { initGame, createGame, setTimer } from "../../features/game/gameSlice";

const GameOptions = () => {
  const { secondsPerQuestion } = useSelector((state) => state.game.gameOptions);
  const [multi, setMulti] = useState(false);
  const [value, setValue] = useState(secondsPerQuestion || 30);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    dispatch(setTimer(newValue));
  };

  useEffect(() => {
    console.log(secondsPerQuestion);
  }, [value]);
  return (
    <>
      {!multi ? (
        <>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",

              fontWeight: "bold",
              color: "##eeeeee",
            }}
          >
            Choose Game Options
          </Typography>

          <Box sx={{ maxWidth: "400px", m: "0 auto" }}>
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", mt: 3 }}
            >
              <Grid item xs={12}>
                <Box sx={{ width: 200 }}>
                  <Typography
                    color="primary"
                    id="discrete-slider-custom"
                    gutterBottom
                  >
                    {secondsPerQuestion} Seconds Per Question
                  </Typography>
                  <Slider
                    value={secondsPerQuestion}
                    aria-label="Timer"
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={10}
                    max={30}
                    color="secondary"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ mt: 8, mb: 3 }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{ borderRadius: 10 }}
                    onClick={() => {
                      dispatch(initGame());
                    }}
                  >
                    Go Back
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ borderRadius: 10 }}
                    onClick={() => {
                      // dispatch(fetchQuestions());
                      dispatch(createGame());
                      setMulti(true);
                    }}
                  >
                    Continue
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <MultiUsers />
      )}
    </>
  );
};

export default GameOptions;
