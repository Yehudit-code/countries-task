import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteCountryDialog({
  open,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        Are you sure you want to delete this country?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
