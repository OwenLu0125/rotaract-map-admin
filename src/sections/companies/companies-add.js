import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  SvgIcon,
  Typography,
  TextField,
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 380,
    sm: 500,
  },
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
              填寫店家資訊
            </Typography>
            <form >
              <Stack spacing={2}
                sx={{ mt: 2 }}
              >
                <TextField id="outlined-basic"
                  label="店家名稱"
                  variant="outlined"
                  sx={{
                    width: '100%'
                  }}
                />
                <TextField id="outlined-basic"
                  label="商店描述"
                  variant="outlined"
                  sx={{
                    width: '100%'
                  }}
                />
                <Button
                  variant="contained"
                >
                  新增
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </div>
    </>

  );
};

export default CompaniesAdd;