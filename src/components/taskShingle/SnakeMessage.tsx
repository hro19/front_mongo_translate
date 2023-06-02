import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type SnakeMessageProps = {
  snakeDuration: number;
};

const SnakeMessage = ({ snakeDuration }: SnakeMessageProps) => {
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
