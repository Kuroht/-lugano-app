import React from 'react'
import Filters from './product/filters'

export default function menuPage({ title, contents, message }) {

  return (
    <div className="container flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold">{title}</h1>
      <Filters filteredContent={contents} message={message} />      
    </div>
  )
}