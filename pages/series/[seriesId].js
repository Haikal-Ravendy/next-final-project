import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function Series(props) {
    const {seriesId} = props
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await axios.post(
                    'http://localhost:3000/api/series',
                    {
                        "id": seriesId,
                        "mode": "get-series-id"
                    }
                )
                setData(result.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleClicked = () => {
        router.back()
    }

    console.log(data)
    return (
        <div>
            <Link href="/"> Back </Link>
            {data?.title}
        </div>
    )
}

export async function getServerSideProps(context) {
    const { seriesId } = context.params
    console.log(seriesId)
  
    return {
      props: {
        seriesId,
      },
    }
}