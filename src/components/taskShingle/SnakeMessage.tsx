import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnakeMessage = ({}) => {
  const [open, setOpen] = useState(false);

  // メッセージの表示時間（ミリ秒）
  const duration = 5000;

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, duration);
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
    >
      <Alert severity="success" onClose={() => setOpen(false)}>
        メッセージが編集に成功しました！
      </Alert>
    </Snackbar>
  );
};

export default SnakeMessage;
