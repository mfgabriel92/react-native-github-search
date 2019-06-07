import Realm from 'realm'
import RepositorySchema from '../schemas/RepositorySchema'

function getRealm() {
  return Realm.open({
    schema: [RepositorySchema]
  })
}

module.exports = {
  getRealm
}