import React from 'react'
import Filters from './product/filters'

export default function menuPage({ title, icon, contents }) {
  return (
    <div className="container flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold">{(title + "s").toUpperCase()}</h1>
      <Filters filteredContent={contents}/>      
  </div>
  )
}