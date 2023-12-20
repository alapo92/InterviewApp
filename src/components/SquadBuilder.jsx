import { useState, useEffect } from 'react'

import CharacterList from './CharacterList'
import styled from 'styled-components'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  width: 80vw;
  justify-content: space-around;
`

const StyledList = styled.ul`
    list-style: none;
    text-align: left;
`

const ButtonRemove = styled.button`
    border-radius: 50%;
    background-color: red;
    color: white;
    margin-right: 15px;;
`

const SquadBuilder = () => {
  const [squad, setSquad] = useState(
    () => JSON.parse(localStorage.getItem('mySquad')) || []
  )

  const handleAdd = (char) => {
    if (squad.some((member) => member.id === char.id)) {
      alert('Member already in squad')
    } else if (
      squad.some((member) => member.species?.name === char.species?.name)
    ) {
      alert('Cannot add more of the same species')
    } else if (squad.length > 4) {
      alert('MAximum number of members reached')
    } else {
      setSquad((prevState) => {
        return [char, ...prevState]
      })
    }
  }

  const handleRemove = (id) => {
    const newSquad = squad.filter((char) => char.id !== id)
    setSquad(newSquad)
  }

  useEffect(() => {
    localStorage.setItem(`mySquad`, JSON.stringify(squad))
  }, [squad])

  const SquadMemberList = squad ? (
    <StyledList>
        <h2>My Squad</h2>
      {squad.map((member) => (
        <li key={member.id}><ButtonRemove onClick={() => handleRemove(member.id)}>-</ButtonRemove>{member.name}</li>
      ))}
    </StyledList>
  ) : (
    <p>No Squad info..</p>
  )

  return (
    <PageWrapper>
      <CharacterList onCharaterAdd={handleAdd} />
      {SquadMemberList}
    </PageWrapper>
  )
}

export default SquadBuilder
