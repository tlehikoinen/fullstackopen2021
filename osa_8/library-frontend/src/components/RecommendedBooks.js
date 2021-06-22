import React, { useState, useEffect } from 'react'

const Recommended = (props) => {

const favoriteBooks = []




  if (!props.show){
    return null
}


    return (
        <div>
        <h2>Recommended</h2>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {favoriteBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
    )
}


export default Recommended