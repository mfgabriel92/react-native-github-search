import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const Container = styled(LinearGradient).attrs({
  colors: ['#512DA8', '#E040FB'],
  start: { x: 0, y: 0},
  end: { x: 1, y: 1}
})`
  flex: 1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`

export const Title = styled.Text`
  font-size: 32px;
  color: #FFF;
  padding: 0 30px;
  font-weight: bold;
  border-radius: 4px;
  margin-bottom: 10px;
`

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 30px;
  border-radius: 4px;
`

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#333'
})`
  flex: 1;
  padding: 6px 15px;
  color: ${props => props.error ? '#FFF' : '#555'};
  background: ${props => props.error ? '#FCC4c4' : '#FFF'};
  border: 2px solid ${props => props.error ? '#FF5252' : '#FFF'};
  border-radius: 4px;
`

export const Submit = styled.TouchableOpacity`
  background: #E040FB;
  margin-left: 10px;
  justify-content: center;
  padding: 0 16px;
  border-radius: 4px;
`

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizonta: 20 },
  showsVerticalScrowIndicator: false
})`
  margin-top: 20px;
`