import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  SvgIcon,
  Typography,
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

export const CompaniesAdd = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <div>
      <Button
        startIcon={(
          <SvgIcon fontSize="small">
            <PlusIcon />
          </SvgIcon>
        )}
        variant="contained"
        onClick={handleOpen}
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
        >
          <Typography id="modal-modal-title"
            variant="h6" 
            component="h2"
          >
            新增店家
          </Typography>
          <Typography id="modal-modal-description"
            sx={{ mt: 2 }}>
            未來可以在這裡新增店家
          </Typography>
        </Box>
      </Modal>
    </div>
    </>

  );
};

export default CompaniesAdd;