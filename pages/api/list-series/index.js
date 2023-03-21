import ErrorHandler from '@/src/handler/error.handler';
import axios from 'axios';
import nc from 'next-connect';

const handler = nc(ErrorHandler)

handler.post(async (req, res) => {
    const requestDTO = req.body;
    // if requestDTO is a number, then loop it to get all the series
    const total = []
    console.log(requestDTO)
    if (typeof requestDTO?.start === 'number' && typeof requestDTO?.amount === 'number') {
        for (let i = requestDTO.start; i <= requestDTO.amount+requestDTO.start; i++) {
            const newDTO = {
                "id" : i,
                "mode": "get-series-id"
            }
            const result = await axios.post(`https://www.wlnupdates.com/api`, newDTO)
            total.push(result.data)
        }
    } 

    return res.status(200).json(total)
})

export default handler
