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
  getSomething() {
    return "Lol";
  }
};
