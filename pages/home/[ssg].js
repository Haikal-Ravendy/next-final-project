import Swal from "sweetalert2"
import Item from "@/src/component/item.component"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"


export default function Home(props) {
  const {data, ssg} = props
  const router = useRouter()

  const onClickNext = () => {
    router.push(`/home/${Number(ssg)+1}`)
  }

  const onClickPrev = () => {
    router.push(`/home/${Number(ssg)-1}`)
  }
  
  return (
    <div className="container mx-auto">
      <div className="fixed bottom-5 right-5">
        <div className="mb-2 font-bold text-center">
          <p>Change</p>
          <p>Page</p>
        </div>
        <button onClick={onClickNext} disabled={ssg>=5} className="bg-gray-800 text-white rounded-full w-16 h-16 flex justify-center items-center ">
          <svg viewBox="0 0 20 20" fill="currentColor" className="chevron-icon w-6 h-6">
            <path fill-rule="evenodd" d="M6.293 4.293a1 1 0 0 1 1.414 0L12 8.586l-4.293 4.293a1 1 0 1 1-1.414-1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 1 0-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <button onClick={onClickPrev} disabled={ssg<=1} className="bg-gray-800 text-white rounded-full w-16 h-16 flex justify-center items-center mt-2">
          <svg viewBox="0 0 20 20" fill="currentColor" className="chevron-icon w-6 h-6">
            <path fill-rule="evenodd" d="M13.707 15.707a1 1 0 0 1-1.414 0l-6.586-6.586a1 1 0 0 1 0-1.414l6.586-6.586a1 1 0 1 1 1.414 1.414L8.414 9.293l5.293 5.293a1 1 0 0 1 0 1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
        

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          Array.isArray(data) && data.length > 0 ? data.map((item) => {
            console.log(item.data)
            if (item.data !== null) {
              return (
                <div class="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 mr-4">
                  <Item data={item.data ?? null} />
                </div>
              )
            }
          }) : null
        }
      </div>

    </div>

    
  )
}

export async function getStaticPaths(){
    let path = []
    // looping 5 times
    for (let i = 1; i <= 5; i++) {
      path.push({
        params: { ssg: i.toString() },
      })
    }

    return {
      paths: path,
      fallback: false
    }


}



export async function getStaticProps(ctx) {
  const { ssg } = ctx.params
  const result = []
  for (let i = (ssg-1)*10+1 ; i <= ssg*10; i++) {
    console.log(i)
    const response = await axios.post(
      `https://www.wlnupdates.com/api`, {
      "id":i,
      "mode": "get-series-id"
    })
    let data = response.data
    while (data.error){
      const result2 = await axios.post(`https://www.wlnupdates.com/api`, {
        "id":i,
        "mode": "get-series-id"
      }) 
      data = result2.data
    }
    result.push(data)
  } 
  return {
    props: {
      data: result,
      ssg: ssg
    },
  }
}
