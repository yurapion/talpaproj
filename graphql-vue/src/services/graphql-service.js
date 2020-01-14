import graphqlClient from "../utils/graphql";
import gql from "graphql-tag";

export default {
  async getMachines() {
    return await graphqlClient.query({
      query: gql`
        query machines {
          machines {
            id
            name
            sensors {
              id
              name
            }
          }
        }
      `
    });
  },
  async getMachine(id) {
    return await graphqlClient.query({
      query: gql`
        query machine($id: Int!) {
          machine(id: $id) {
            id
            name
            lastKnownPosition
            sensors {
              id
              name
            }
          }
        }
      `,
      variables: {
        id: id
      }
    });
  }
};
