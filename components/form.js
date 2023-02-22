import React, { useState, useRef } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DiscreteSliderSteps } from './slider'
import { serverRequest, isAxiosError, isAxiosResponse } from "../utils/request"
export const MForm = () => {
    const [sliderValue, setSliderValue] = useState(1)
    const [script, setScript] = useState("")
    const [input_data, setInputData] = useState(null)

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    async function scrapData(payload) {
        const res = await serverRequest('post', 'market/', true, payload)
        if(isAxiosResponse(res) && res.data) {
            console.log(res.data)
        }
        if(isAxiosError(res) && res.data){
            alert("Some error occured")
        }
    }
    
    const handleScriptNameChange = (event) => {
        setScript(event.target.value);
    };

    const handleCsvFileChange = (event) => {
        setInputData(event.target.files[0]);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('script', script);
        formData.append('input_data', input_data);
        // let input_data = [];
        // let script = document.getElementById('script-name').value
        // for (let i = 0; i < sliderValue; i++) {
        //     let asin = document.getElementById(`asin-${i}`).value;
        //     let marketplace = document.getElementById(`marketplace-${i}`).value;
        //     let zipcode = document.getElementById(`zipcode-${i}`).value;
        //     let brand = document.getElementById(`brand-${i}`).value;
        //     input_data.push({asin, marketplace, zipcode, brand});
        // }
        // setData({ ...data, script:script, input_data: input_data });
        scrapData(formData)
    };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
        {/* first row */}
        <Box sx={{
            width: '80%',
            justifyContent: 'space-around',
            alignItems: 'center',
            display: 'flex',
            margin: '0 auto',
        }}>
            <TextField id="script-name" required label="Script Name" name='script' variant="filled" onChange={handleScriptNameChange} />
            <Button
                variant="contained"
                containerElement='uploader' // <-- Just add me!
                label='uploader'>
                <input type="file" onChange={handleCsvFileChange}/>
            </Button>
            {/* <Box>
                <span>Select number of inputs</span>
                <DiscreteSliderSteps handleChange={handleSliderChange} />
            </Box> */}
        </Box>
        {/* 2nd row */}
        {/* <Box sx={{
            width: '100%',
        }}>
            {[...Array(sliderValue)].map((e, i) => 
                <Box sx={{
                    margin: '20px 0 0 0',
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}>
                    <TextField id={`asin-${i}`} label="ASIN" name="ASIN" variant="outlined" />
                    <TextField id={`marketplace-${i}`} label="Market Place" name="Market Place"  defaultValue={'United States'} variant="outlined" />
                    <TextField id={`zipcode-${i}`} label="Zipcode" name="Zipcode" defaultValue={1001} variant="outlined" />
                    <TextField id={`brand-${i}`} label="Brand" name="Brand" variant="outlined"/>
                </Box>
            )}
        </Box> */}
        <Box sx={{ margin: '20px 0 0 0', display: 'flex', justifyContent: 'center'}}>
            <Button onClick={handleSubmit} variant="outlined">Submit</Button>
        </Box>
    </Box>
  );
}