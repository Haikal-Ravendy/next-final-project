import Swal from "sweetalert2"
import Item from "@/src/component/item.component"
import axios from "axios"
import { useState, useEffect } from "react"


export default function Home(props) {
  const {data} = props
  
  return (
    <div className="container mx-auto">
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
  let [err, data] = await axios.post(
    'http://localhost:3000/api/list-series',
    {
        "start": 1,
        "amount": 5
    })
    .then((response)=> {
        console.log('response', response.data)
      return [ null, response.data.json()]
    })
    .catch((err)=>{
      return [ err, null ]
    })

    console.log("DATA",data)
    
    // let paths = []

    // paths = data?.map((item)=> {
    // console.log("ITEM", item)
    // return({
    //   params:{
    //     ssg: item.data.id
    //   }
    // })})

// console.log('pathss', paths)
    return {
      paths : {
        ssg: data
      } ,
      fallback: false
    }


}

export async function getStaticProps() {
  let data = {}
  const response = await axios.post(
    'http://localhost:3000/api/list-series',
    {
      "start": 1,
      "amount": 50
    }
  )
  data = response?.data ?? {}
    
  

  return {
    props: {
      data: data,
    },
  }
}
