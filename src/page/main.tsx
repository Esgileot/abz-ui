import { Box, Button, Container } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CreateUserForm } from '../components/forms/createUserForm'
import { UserSection } from './userSection'

export const Main: React.FC = () => {
  const [users, setUsers] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [count] = useState(6)
  const [buttonName, setButtonName] = useState('Show more')
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/users?page=${page}&count=${count}`).then(res => {
      if (res && res.data) {
        setUsers(res.data.users)
        setMaxPage(res.data['total_pages'])
      }
      console.log(res.data.users)
    })
    return () => {
      setUsers([])
      setPage(1)
      setMaxPage(1)
    }
    // eslint-disable-next-line
  }, [])

  const handleClick = () => {
    if (maxPage <= page) {
      setButtonName('All pages displayed')
      return
    }

    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/users?page=${page + 1}&count=${count}`)
      .then(res => {
        if (res && res.data) {
          setPage(page + 1)
          setUsers(prev => {
            return [...prev, ...res.data.users]
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container maxWidth={'lg'}>
      <CreateUserForm />
      {users ? <UserSection users={users} /> : null}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onClick={handleClick}
          color='primary'
          type='submit'
          sx={{
            width: '200px',
            height: '50px',
            color: 'white',
            background: 'black',
            ':hover': { background: 'black' },
          }}
        >
          {buttonName}
        </Button>
      </Box>
    </Container>
  )
}
