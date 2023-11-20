import { useState, useCallback } from 'react';
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
import { postStore } from '../../Backend/StoreProtocol'

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    松山區: false,
    大安區: false,
    中山區: false,
    大同區: false,
  });

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target; // 拿value的值
      setValues((prevState) => ({
        ...prevState,
        [name]: value, // 使用value的名稱更新values中對應的字串
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await postStore(values)
        console.log('Response from server:', response);
        if (response.status === 201) {
          window.location.reload();
        }
        handleClose();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [values]
  );

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
            <form
              noValidate
              onSubmit={handleSubmit}
            >
              <Stack spacing={2}
                sx={{ mt: 2 }}
              >
                <TextField
                  fullWidth
                  label="店家名稱"
                  variant="outlined"
                  onChange={handleChange}
                  required
                  name="name" // 设置name属性以匹配values中的字段
                  placeholder='name'
                />
                <TextField
                  fullWidth
                  label="商店描述"
                  variant="outlined"
                  onChange={handleChange}
                  required
                  name="description" // 设置name属性以匹配values中的字段
                  placeholder='description'
                />
                {/* 未來新增處 */}
                <Button
                  variant="contained"
                  type="submit"
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