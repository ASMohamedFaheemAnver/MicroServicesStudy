export const EnvKeys = {
  MONGODB_URI: 'MONGODB_URI',
  PORT: 'PORT',
  RABBIT_MQ_URI: 'RABBIT_MQ_URI',
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRATION: 'JWT_EXPIRATION',
  RABBIT_MQ_D_NAME_QUEUE: (name: string) => `RABBIT_MQ_${name}_QUEUE`,
};

export enum QueueNames {
  BILLING = 'BILLING',
  AUTH = 'AUTH',
}

export enum QueueEvents {
  ORDER_CREATED = 'ORDER_CREATED',
  VALIDATE_USER = 'VALIDATE_USER',
}
