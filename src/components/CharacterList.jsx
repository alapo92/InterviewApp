import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'
import styled from 'styled-components'

const TableWrapper = styled.div`
  max-height: 30vh;
  overflow: auto;
  text-align: left;
  border: 1px solid white;
  border-radius: 5px;
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const DetailsWrapper = styled.div`
  width: 80vw;
  padding-top: 0.5rem;
  display: flex;
  @media (min-width: 768px) {
    width: 22rem;
  }
`

const DetailsList = styled.ul`
  list-style: none;
  text-align: left;
  padding-left: 10px;
`

const ScrollableHead = styled.thead`
  background: #232323;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  z-index: 10;
`

const SearchBar = styled.input`
  width: 100%;
  border: 1px solid white;
  border-radius: 5px;
`

const AddButton = styled.button`
  border-radius: 30px;
  background-color: green;
  position: relative;
  z-index: 0;
`

const GET_ALLPEOPLE = gql`
  query AllPeople {
    allPeople {
      id
      name
      birthYear
      birthYear
      eyeColor
      gender
      hairColor
      height
      mass
      skinColor
      species {
        name
      }
      image
    }
  }
`

const CharacterList = (props) => {
  const [filter, setFilter] = useState('')
  const [displayDetails, setDisplayDetails] = useState(false)
  const [character, setCharacter] = useState('')

  const { loading, error, data } = useQuery(GET_ALLPEOPLE)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  let characters = data.allPeople

  const handleAddtoSquad = (char) => {
    props.onCharaterAdd(char)
  }

  const CharacterDetail = () => {
    if (displayDetails) {
      return (
        <DetailsWrapper>
          <img
            src={character.image}
            alt='n/a'
          />
          <DetailsList>
            <li>Name: {character.name}</li>
            <li>Eye Color: {character.eyeColor ?? 'n/a'}</li>
            <li>Height: {character.height ?? 'n/a'}</li>
            <li>Mass: {character.mass ?? 'n/a'}</li>
            <li>Species: {character.species?.name ?? 'human'}</li>
          </DetailsList>
        </DetailsWrapper>
      )
    } else
      return (
        <DetailsWrapper>
          <h2> Click on character's name to display details</h2>
        </DetailsWrapper>
      )
  }

  const handleDetailsClick = (char) => {
    setDisplayDetails(true)
    setCharacter(char)
  }

  return (
    <PageWrapper>
      <div>
        <span
          style={{ display: 'block', overflow: 'hidden', paddingRight: '10px' }}
        >
          <SearchBar
            id='filter'
            name='filter'
            type='text'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder='Filter by name'
          />
        </span>
        <TableWrapper>
          <table>
            <ScrollableHead>
              <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Add</th>
              </tr>
            </ScrollableHead>
            <tbody>
              {characters
                ?.filter(
                  (character) =>
                    character.name
                      .toLowerCase()
                      .includes(filter.toLowerCase().trim()) || filter === ''
                )
                .map((character) => (
                  <tr
                    key={character.id}
                    // onMouseOver={() => handleDetailsClick(character)}
                    onClick={() => handleDetailsClick(character)}
                  >
                    <td>{character.name}</td>
                    <td>{character.species?.name ?? 'human'}</td>
                    <td>
                      <AddButton onClick={() => handleAddtoSquad(character)}>
                        {' '}
                        +{' '}
                      </AddButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableWrapper>
      </div>
      <CharacterDetail />
    </PageWrapper>
  )
}

export default CharacterList
