import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { serverRequest, isAxiosError, isAxiosResponse } from "../utils/request"
import { BasicModal } from '../components/modal'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export const MTable = () => {
    const [scripts, setScripts] = React.useState([])
    async function getScripts() {
        const res = await serverRequest('get', 'scripts/', true, undefined)
        if(isAxiosResponse(res) && res.data) {
            console.log(res.data)
        }
        if(isAxiosError(res) && res.data){
            alert("Some error occured")
        }
    }
    React.useEffect(() => {
        const getScripts = async () => {
            const res = await serverRequest('GET', 'scripts/', true, undefined)
            if(isAxiosResponse(res) && res.data) {
                alert(res.data)
                setScripts(res.data.results)
            }
            if(isAxiosError(res) && res.data){
                alert("Some error occured")
            }
        };
        getScripts();
      }, []);
  return (
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Box sx={{width: "80%"}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align='center'><b>Scripts</b></TableCell>
                        <TableCell align="center"><b>Charts</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {scripts.map((script) => (
                        <TableRow
                        key={script.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center">{script.name}</TableCell>
                        <TableCell align="center"><BasicModal id={script.id}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Box>
  );
}