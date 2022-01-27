import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Options from './Options'

const URL =
  'https://5000-devinternbatch2-rockysco-n877l5kb9b6.ws-us28.gitpod.io'
const ID = '61eeb7761e4a06197ac0cf89'

const Renderer = (props) => {
  const [state, setState] = useState({
    title: '',
    description: '',
    objects: [],
  })

  useEffect(() => {
    try {
      axios.get(`${URL}/get/${ID}`).then((res) => {
        setState(res.data.data)
        console.log(res.data.data)
      })
    } catch (err) {
      console.log('Error', err)
    }
  }, [])

  return (
    <>
      <h1>In the renderer</h1>
      <h1>{state.title}</h1>
      <h2>{state.description}</h2>
      {state.objects.map((obj) => {
        return (
          <Options
            id={obj.id}
            type={obj.type}
            label={obj.label}
            value={obj.value}
          />
        )
      })}
    </>
  )
}

export default Renderer
