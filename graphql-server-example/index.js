const { ApolloServer, gql } = require("apollo-server");
const { find, filter } = require("lodash");

const typeDefs = gql`
  type Machine {
    id: Int
    sensors: [Sensor]
    name: String
  }

  type Sensor {
    id: Int
    name: String
    machine: Machine
  }

  type SensorDataPoint {
    id: Int
    name: String
    machine: Machine
    sensor: Sensor
    # timestamp: DateTime
    value: Float
  }

  type Query {
    machines: [Machine]
    machine(id: Int!): Machine
    # sensorData(id: Int!, from: DateTime!, to: DateTime!): [SensorDataPoint]
  }
`;

const SensorData = [
  {
    sensorDataId: 1,
    sensorMachineId: 1,
    timestamp: "DateTime",
    value: "Float"
  },
  {
    sensorDataId: 2,
    sensorMachineId: 2,
    timestamp: "DateTime",
    value: "Float"
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
    name: "speed sensor"
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
    name: "Buldoser"
  },
  {
    id: 2,
    name: "Cran"
  },
  {
    id: 3,
    name: "Truck"
  }
];

const resolvers = {
  Query: {
    machines: () => machines,
    machine: (_, { id }) => find(machines, { id })
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
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
