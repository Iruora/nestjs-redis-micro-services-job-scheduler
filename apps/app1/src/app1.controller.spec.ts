/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';
import { App1Controller } from './app1.controller';

describe('App1Controller', () => {
  let app1Controller: App1Controller;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [], // Add
    }).compile();

    app1Controller = moduleRef.get<App1Controller>(App1Controller);
  });

  it('should be defined', () => {
    expect(app1Controller).toBeDefined();
  });
});
