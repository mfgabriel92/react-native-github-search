import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Repository from '../../components/Repository'
import { Container, Title, Form, Input, Submit, List } from './styles'
import api from '../../services/api'
import { getRealm } from '../../services/realm'

function Main() {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    loadRepositories()
  }, [])

  async function loadRepositories() {
    const realm = await getRealm()
    const data = realm.objects('Repository').sorted('stars', true)
    setList(data)
  }

  async function saveRepository(repository) {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count
    }

    const realm = await getRealm()
    realm.write(() => realm.create('Repository', data, 'modified'))

    return data
  }

  async function handleAddRepository() {
    try {
      const { data } = await api.get(`/repos/${input}`)
      await saveRepository(data)

      setInput('')
      setError(false)

      Keyboard.dismiss()
    } catch (e) {
      setError(true)
    }
  }

  async function handleRefreshRepository(repository) {
    const response = await api.get(`/repos/${repository.fullName}`)
    const data = await saveRepository(response.data)
    console.tron.log(data)
    setList(list.map(repo => repo.id === data.id ? data : repo))
  }

  return (
    <Container>
      <Title>Repositories</Title>
      <Form>
        <Input
          value={input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search repositories..."
          onChangeText={setInput}
          error={error}
        />

        <Submit onPress={handleAddRepository}>
          <Icon name="search" size={22} color="#FFFFFF" />
        </Submit>
      </Form>

      <List 
        keyboardShouldPersistTaps="handled" 
        data={list}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Repository data={item} onRefresh={() => handleRefreshRepository (item)} />}
      />
    </Container>
  )
}

export default Main