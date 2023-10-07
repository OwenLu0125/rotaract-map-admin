import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography, CardActionArea, Modal, Popover, TextField, Button } from '@mui/material';


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

export const CompanyCard = (props) => {
  const { company } = props;
  const [cardOpen, setCardOpen] = useState(false);
  const handleCardOpen = () => setCardOpen(true);
  const handleCardClose = () => setCardOpen(false);

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

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Modal
        open={cardOpen}
        onClose={handleCardClose}
      >
        <Box sx={style}>
          <Stack spacing={2}
            sx={{ mt: 2 }}
          >
            <Typography id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              編輯店家資訊
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pb: 3,
              }}
            >
              <Avatar
                src={company.logoImageUrl}
                variant="square"
              />
            </Box>
            <TextField
              fullWidth
              label="店家名稱"
              variant="outlined"
              onChange={handleChange}
              required
              name="name" // 設定name属性以對應values中的字串
              placeholder='name'
              value={company.name}
            />
            <TextField
              fullWidth
              label="商店描述"
              multiline
              maxRows={4}
              variant="outlined"
              onChange={handleChange}
              required
              name="description"
              placeholder='description'
              value={company.description}
            />
            {/* 未來新增處 */}
            <Button
              variant="contained"
              type="submit"
            >
              新增
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#F79009',
              }}
            >
              刪除
            </Button>
          </Stack>
        </Box>
      </Modal>
      <CardActionArea
        onClick={handleCardOpen}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
            }}
          >
            <Avatar
              src={company.logoImageUrl}
              variant="square"
            />
          </Box>
          <Typography
            align="center"
            gutterBottom
            variant="h5"
          >
            {company.name}
          </Typography>
          {/* <Typography
            align="center"
            variant="body1"
          >
            {company.description}
          </Typography> */}
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        {/* 這裡要註解 */}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <ClockIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <ArrowDownOnSquareIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
            >
              {company.downloads} Downloads
            </Typography>
          </Stack>
        </Stack>
        {/* ------- */}
      </CardActionArea>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
