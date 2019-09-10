
const typeDefs = `
  type WeatherData {
    temperature: Float!
    humidity: Float!
  }

  input WeatherDataInput {
    temperature: Float!
    humidity: Float!
  }

  type Mutation {
    postWeatherData(weatherData: WeatherDataInput): ID!
  }
`;

const myResolvers = {
  Mutation: {
    postWeatherData: (parent, args, context, info) => {
      console.log('parent', parent);
      console.log('context', context);
      console.log('info', info);
      console.log('args', args.weatherData);
      return 1;
    },
  },
};

module.exports = {
  resolvers: myResolvers,
  typeDefs,
};
