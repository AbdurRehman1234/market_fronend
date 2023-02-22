import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MarketChart } from './market_chart';
import { serverRequest, isAxiosError, isAxiosResponse } from "../utils/request"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BasicModal = (props) => {

    const [open, setOpen] = React.useState(false);
    const [img, setimg] = React.useState('');
    // const [label, setLabel] = React.useState([])
    // const [legend, setLegend] = React.useState([])
    // const [data, setData] = React.useState([])
    const handleOpen = (id) => {
      setOpen(true)
      getData(id)
    }   
    const handleClose = () => setOpen(false);

    // async function getData(script) {
    //   const res = await serverRequest('get', 'marketdata/',true, undefined, {'script': script})
    //   if(isAxiosResponse(res) && res.data) {
    //       const labels = [];
    //       const data = [];
    //       const legenda = [];
    //       console.log(data)
    //       res.data.data.forEach(item => {
    //           labels.push(item.x);
    //           data.push(item.y);
    //           legenda.push(item.name)
    //       });
    //       setData(data)
    //       setLabel(labels[0])
    //       setLegend(legenda)
    //       console.log(legend)
    //   }
    //   if(isAxiosError(res) && res.data){
    //       alert("Some error occured")
    //   }
    // }
    async function getData(script) {
      const res = await serverRequest('get', 'marketdata/',true, undefined, {'script': script})
      if(isAxiosResponse(res) && res.data) {
          
          setimg(res.data[0].chart_img)
      }
      if(isAxiosError(res) && res.data){
          alert("Some error occured")
      }
    }

  return (
    <div>
      <Button variant='outlined' onClick={() => handleOpen(props.id)}>View Chart</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component='img'
        sx={style}
        src={img}>
            
        </Box>
      </Modal>
    </div>
  );
}