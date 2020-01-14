const { ApolloServer, gql } = require("apollo-server");
const { find, filter } = require("lodash");
const GraphQLDateTime = require("graphql-type-datetime");
const { GraphQLScalarType } = require("graphql");

const typeDefs = gql`
  scalar DateTime
  scalar Coordinates
  type Machine {
    id: Int
    sensors: [Sensor]
    name: String
    lastKnownPosition: Coordinates
  }

  type Sensor {
    id: Int
    name: String
    machine: Machine
  }

  type SensorDataPoint {
    # sensorMachineId: Int
    id: Int
    name: String
    timestamp: DateTime
    value: Float
  }

  type Query {
    machines: [Machine]
    machine(id: Int!): Machine
    sensorData(
      id: Int!
      sensorId: Int!
      from: DateTime!
      to: DateTime!
    ): [SensorDataPoint]
  }
`;

const SensorData = [
  {
    id: 1,
    sensorMachineId: 1,
    timestamp: new Date(2019, 02, 15),
    value: "1.344"
  },
  {
    id: 2,
    sensorMachineId: 1,
    timestamp: new Date(2019, 12, 10),
    value: "6.244"
  },
  {
    id: 3,
    sensorMachineId: 1,
    timestamp: new Date(2019, 11, 25),
    value: "1.344"
  },
  {
    id: 4,
    sensorMachineId: 2,
    timestamp: new Date(2019, 01, 24),
    value: "5.16"
  },
  {
    id: 5,
    sensorMachineId: 1,
    timestamp: new Date(2019, 11, 24),
    value: "0.344"
  },
  {
    id: 6,
    sensorMachineId: 2,
    timestamp: new Date(2019, 03, 17),
    value: "9.16"
  }
];

const SensorMachine = [
  {
    sensorMachineId: 1,
    sensorId: 1,
    machineId: 1
  },
  {
    sensorMachineId: 2,
    sensorId: 2,
    machineId: 1
  },
  {
    sensorMachineId: 3,
    sensorId: 1,
    machineId: 2
  },
  {
    sensorMachineId: 4,
    sensorId: 2,
    machineId: 2
  },
  {
    sensorMachineId: 5,
    sensorId: 1,
    machineId: 3
  },
  {
    sensorMachineId: 6,
    sensorId: 3,
    machineId: 1
  }
];
const sensors = [
  {
    id: 1,
    name: "Speed sensor"
  },
  {
    id: 2,
    name: "DistanceSensor"
  },
  {
    id: 3,
    name: "WeightsSensor"
  }
];
const machines = [
  {
    id: 1,
    name: "Buldoser",
    latitude: 40.1,
    longitude: -76.5
  },
  {
    id: 2,
    name: "Cran",
    latitude: 40.1,
    longitude: -76.5
  },
  {
    id: 3,
    name: "Truck",
    latitude: 40.1,
    longitude: -76.5
  }
];
// const machineLastKnowPosition = [
//   {
//     id: 1,
//     machineId: 1,
//     latitude: 40.1,
//     longitude: -76.5
//   }
// ];

const resolvers = {
  Coordinates: new GraphQLScalarType({
    name: "GPSPosition",
    description: "A set of coordinates. x, y",
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      return ast.value;
    }
  }),
  Query: {
    machines: () => machines,
    machine: (_, { id }) => find(machines, { id }),
    sensorData: (_, { id, sensorId, from, to }) => {
      let dataArr = [];

      const sensormachine = find(SensorMachine, {
        machineId: id,
        sensorId: sensorId
      });

      const data = filter(SensorData, {
        sensorMachineId: sensormachine.sensorMachineId
      });
      for (let index = 0; index < data.length; index++) {
        if (
          new Date(from) <= data[index].timestamp &&
          new Date(to) >= data[index].timestamp
        )
          dataArr.push(data[index]);
      }
      return dataArr;
    }
  },
  Machine: {
    sensors: machine => {
      const sensorsIdArr = filter(SensorMachine, { machineId: machine.id });
      let sensors1 = [];
      for (let index = 0; index < sensorsIdArr.length; index++) {
        let sensor1 = find(sensors, { id: sensorsIdArr[index].sensorId });
        sensors1.push(sensor1);
      }
      return sensors1;
    },
    lastKnownPosition(item) {
      return [item.longitude, item.latitude];
    }
  },
  DateTime: GraphQLDateTime
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
