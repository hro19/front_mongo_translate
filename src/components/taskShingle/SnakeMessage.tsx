import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAtom } from "jotai";
import { snakeDurationAtom } from "../../jotai/atoms";

const SnakeMessage = () => {
  const [snakeDuration, setSnakeDuration] = useAtom(snakeDurationAtom);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, snakeDuration);
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={snakeDuration-300}
      onClose={() => setOpen(false)}
    >
      <Alert severity="success" onClose={() => setOpen(false)}>
        メッセージの編集に成功しました！
      </Alert>
    </Snackbar>
  );
};

export default SnakeMessage;
