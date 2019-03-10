import React from 'react'

interface ListProps {
  url: string
  title: string
  favIcon?: string | null
}

const Item = (prop: ListProps) => {
  const image = prop.favIcon ? <img src={prop.favIcon} /> : null

  return (
    <>
      {image}
      <a href={prop.url}>{prop.title}</a>
    </>
  )
}

export default Item
