import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'
import styled from 'styled-components'

const TableWrapper = styled.div`
  max-height: 50vh;
  overflow: auto;
  text-align: left;
`

const PageWrapper = styled.div`
  display: flex;
  gap: 40px;
`

const DetailsWrapper = styled.div`
  width: 400px;
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

  const handleClick = (char) => {
    props.onCharaterAdd(char)
  }

  const CharacterDetail = () => {
    if (displayDetails) {
      return (
        <DetailsWrapper>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Mass</th>
                <th>Height</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={character.image}
                    alt='n/a'
                  />
                </td>
                <td>{character.name}</td>
                <td>{character.mass ?? 'n/a'}</td>
                <td>{character.height ?? 'n/a'}</td>
              </tr>
            </tbody>
          </table>
        </DetailsWrapper>
      )
    } else
      return (
        <DetailsWrapper>
          <h2> hover over a character</h2>
        </DetailsWrapper>
      )
  }

  const handleHover = (char) => {
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
                    onMouseOver={() => handleHover(character)}
                    // onMouseOut={() => setDisplayDetails(false)}
                  >
                    <td>{character.name}</td>
                    <td>{character.species?.name ?? 'human'}</td>
                    <td>
                      <AddButton onClick={() => handleClick(character)}>
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
