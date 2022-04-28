import { get } from 'lodash';
import { createLogger, format, transports } from 'winston';
import { Axios, AxiosRequestConfig } from 'axios';

export class BaseResource {
  logger: any;
  http: Axios;

  constructor(LOTR_API_KEY?: string) {
    if (!LOTR_API_KEY && !process.env.LOTR_API_KEY) {
      throw new Error('LOTR_API_KEY Key cannot be null.');
    }

    const config: AxiosRequestConfig = {
      baseURL: 'https://the-one-api.dev/v2',
      headers: {
        Authorization: `Bearer ${LOTR_API_KEY || process.env.LOTR_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    this.http = new Axios(config);

    this.logger = createLogger({
      level: `${get(process.env, 'LOG_LEVEL', 'info').toLowerCase()}`,
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.align()
          ),
        }),
      ],
    });
  }
}
