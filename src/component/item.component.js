import { first } from 'lodash'
import { useState } from 'react'
import Link from 'next/link'

function Item(props){
    const [expanded, setExpanded] = useState(false)
    const {data} = props
    console.log("props: ",props)
    // check if data is empty
    if (!data) {
        return null
    }

    return (
        
        <div className="flex flex-col h-screen max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/series/`+data?.id} class="flex-grow">
                <img className="w-full rounded-t-lg" src={first(data?.covers)?.url ?? "https://cdn.novelupdates.com/imgmid/noimagemid.jpg"} alt={first(data?.covers)?.srcfname} />
            </Link>
            <div className="p-3">
                <a href="#">
                    <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
                </a>
                <div className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-5">
                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                </div>
            </div>
        </div>

    )
}

export default Item