import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GameStopResolver {
  @Query(() => String)
  public gamestopGreeting(): string {
    return 'Welcome to the gamestop resolver';
  }
}
