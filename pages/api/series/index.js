import ErrorHandler from '@/src/handler/error.handler';
import axios from 'axios';
import nc from 'next-connect';

const handler = nc(ErrorHandler)
handler.post(async (req, res) => {
    const requestBody = req.body;
    console.log(requestBody)
    const result = await axios.post(`https://www.wlnupdates.com/api`, requestBody)
    res.status(200).json(result.data)
})


    

export default handler