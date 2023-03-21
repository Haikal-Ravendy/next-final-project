import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { first } from 'lodash'
import Rating from '@/src/component/rating.component';
import BackIcon from '@/src/icon/back.icon';


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
                let data = result.data
                while(data.error) {
                    const result2 = await axios.post(
                        'http://localhost:3000/api/series',
                        {
                            "id": seriesId,
                            "mode": "get-series-id"
                        }
                    )
                    data = result2.data
                }
                setData(data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()
    }, [])
    console.log("ERROR",error)
    if (error !== null) {
        return <div class="flex flex-col items-center justify-center h-screen">
        <button onClick={router.back} class="absolute top-0 left-0 inline-flex items-center rounded px-2 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700">
            <span class="mr-1"><BackIcon /></span> Back to list
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-red-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-4a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-9a1 1 0 110-2 1 1 0 010 2z" clip-rule="evenodd" />
        </svg>
        <p class="text-xl text-red-600 font-bold mt-4">No series with the id of '{seriesId}'</p>
      </div>
      
    }

    console.log("DATA",data)
    let content = ""
    if (data?.error){
        content = <div>{data.message}, Please wait for a moment... </div>
    } else {
        content = <div class="bg-white rounded-lg shadow-md p-4">
        <div><Rating rate={Math.round(data?.data?.rating?.avg)}/></div>
        <h2 class="text-xl font-semibold">Title</h2>
        <p class="mt-2">{data?.data?.title}</p>
        <h2 className='text-xl font-semibold'>Author</h2>
        <p class="mt-2">{
            Array.isArray(data?.data?.authors) && data?.data?.authors.length > 0 ? data?.data?.authors.map((item) => {
                return (
                    <p
                        data-te-chip-init
                        data-te-ripple-init
                        class="[word-wrap: break-word] my-[5px] mr-4 inline-block h-[32px] cursor-pointer rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
                        data-te-close="true">
                    {item.author}
                    </p>
                    
                )
            }) : null
        }</p>
        <h2 className='text-xl font-semibold'>Genre</h2>
        <p class="mt-2">{
            Array.isArray(data?.data?.genres) && data?.data?.genres.length > 0 ? data?.data?.genres.map((item) => {
                return (
                    <p
                        data-te-chip-init
                        data-te-ripple-init
                        class="[word-wrap: break-word] my-[5px] mr-4 inline-block h-[32px] cursor-pointer rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
                        data-te-close="true">
                    {item.genre.replace("-", " ")}
                </p>

                )
            }) : null
        }</p>
        <h2 className='text-xl font-semibold'>Description</h2>
        <div class="mt-2"><div dangerouslySetInnerHTML={{ __html: data?.data?.description }} /></div>
        </div>
    }


    return (
        !loading ? 
            <div class="flex justify-center items-center h-screen">
            <div class="flex flex-wrap items-center">
                <div class="w-full md:w-1/3 p-4">
                <img src={first(data?.data?.covers)?.url ?? "https://cdn.novelupdates.com/imgmid/noimagemid.jpg"} alt="Image" />
                </div>
                <div class="w-full md:w-2/3 p-4">
                <button onClick={router.back} class="absolute top-0 left-0 inline-flex items-center rounded px-2 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700">
                    <span class="mr-1"><BackIcon /></span> Back to list
                </button>
                {content}
                </div>
            </div>
        </div> :
        <div class="flex flex-col items-center justify-center h-screen">
            <button onClick={router.back} class="absolute top-0 left-0 inline-flex items-center rounded px-2 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700">
                <span class="mr-1"><BackIcon /></span> Back to list
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-gray-600 animate-spin" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-4a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-9a1 1 0 110-2 1 1 0 010 2z" clip-rule="evenodd" />
            </svg>
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