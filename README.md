# GraphQL API
> **Nest.js GraphQL API**

## Tech
* **TypeScript**
* **Nest.js**
* **GraphQL**
* **JSON Web Token**

## Schema
```graphql
type Query {
  getUsers: [User!]!
  getUser(id: Float!): User!
  login(authenticateUserDTO: AuthenticateUserDTO!): String!
}

type Mutation {
  createUser(createUserDTO: CreateUserDTO!): User!
  updateUser(id: Float!, updateUserDTO: UpdateUserDTO!): String!
  deleteUser(id: Float!): String!
}

type User {
  id: ID!
  username: String!
  password: String!
}

input AuthenticateUserDTO {
  username: String!
  password: String!
}

input CreateUserDTO {
  username: String!
  password: String!
}

input UpdateUserDTO {
  username: String
  password: String
}

```
