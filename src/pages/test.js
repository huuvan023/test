import React, { useState, useEffect } from 'react'


export default function Test() {
  let [a,setA] = useState('')
  let [heck,seetCheck] = useState(false)
  const onSubmit = () => {
    var value = a.replace(/\r?\n/g,'<br/>')
    setA(value)
    seetCheck(true)
  }
  function createMarkup() {
    return {__html: a};
  }
  return (
    <div>
      <textarea rows={2} onChange={(e) => setA(e.target.value)}>
      </textarea>
      <button onClick={onSubmit}>asd</button>
      { heck ? 
      (
      <div dangerouslySetInnerHTML={createMarkup()} >
      </div>
      ) 
      : 
      (<div></div>) }
    </div>
  )
}
