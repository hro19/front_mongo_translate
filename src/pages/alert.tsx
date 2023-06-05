import React, { useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function DeleteButton() {
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteClick = () => {
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    // データの削除ロジックをここに追加する
    setShowAlert(false);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleDeleteClick} className="bg-red-700 text-white">
        デリート
      </Button>

      {showAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="warning">
            <AlertTitle>警告</AlertTitle>
            ほんとうに削除しますか？
          </Alert>
          <Button variant="outlined" onClick={handleConfirmDelete}>
            削除
          </Button>
          <Button variant="outlined" onClick={handleCancelDelete}>
            キャンセル
          </Button>
        </Stack>
      )}
    </div>
  );
}
